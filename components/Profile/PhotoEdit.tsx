import { getCroppedImg } from "@components/AppliedTask/Crop";
import { Slider } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import React, { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop/types";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

interface editProfileProps {
    show?: boolean;
    handleClose?: () => void;
    setShowEditForm: Dispatch<SetStateAction<boolean>>;
    setIsEditButtonClicked: Dispatch<SetStateAction<boolean>>;

    photo?: any;
    handleSubmit?: () => void;
    haveImage: boolean;
    isEditButtonClicked?: boolean;
    onPhotoEdit: (url: RequestInfo | URL, file: File) => void;
}

const PhotoEdit = ({
    show,
    handleClose,
    setIsEditButtonClicked,
    setShowEditForm,
    photo,
    isEditButtonClicked,
    onPhotoEdit,
    haveImage,
}: editProfileProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(5);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<
        Area | undefined
    >();
    const [croppedImage, setCroppedImage] = useState<Blob | null>(null);

    // const [toEditImage, setToEditImage] = useState<Blob | null | string>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [clickedUpload, setClickedUpload] = useState(false);

    const { classes } = useStyles();
    let previewImage: any;

    const reactImage = useMemo(() => {
        try {
            photo ? (previewImage = URL.createObjectURL(photo)) : "";
        } catch {
            ("");
        }
        return previewImage;
    }, [photo]);

    const profile = useGetProfile();
    const profileImage = profile.data?.profile_image;

    const onCropComplete = useCallback(
        (croppedArea: any, croppedAreaPixels: any) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );
    const uploadPreview = useMemo(() => {
        uploadedFile ? (previewImage = URL.createObjectURL(uploadedFile)) : "";
        return previewImage;
    }, [uploadedFile]);

    const toBeCroppedImage = clickedUpload
        ? uploadPreview
        : reactImage
        ? reactImage
        : "";

    const showCroppedImage = useCallback(
        async (blobToBeCropped: string) => {
            try {
                const croppedImage = (await getCroppedImg(
                    toBeCroppedImage ? toBeCroppedImage : blobToBeCropped,
                    croppedAreaPixels,
                    rotation
                )) as Blob;

                setCroppedImage(croppedImage);
                return croppedImage;
            } catch (e) {
                console.error(e);
            }
        },
        [croppedAreaPixels, rotation, toBeCroppedImage]
    );

    const queryClient = useQueryClient();
    const editProfile = useMutation((data: FormData) =>
        axiosClient.patch("/tasker/profile/", data)
    );
    const profileName = profileImage
        ? profileImage.substring(profileImage.indexOf("profile/") + 8)
        : "";

    const fileName = clickedUpload
        ? uploadedFile?.name
        : profileImage && profileImage
        ? profileName
        : "";

    const onEditProfile = async (imageBlob: string) => {
        const data = (await showCroppedImage(imageBlob)) as unknown as
            | RequestInfo
            | URL;
        if (!data) return;

        const response = await fetch(data);

        const blob = await response.blob();

        const file = new File([blob], "profile.jpeg", {
            type: "image/jpeg",
        });

        if (!profile) {
            onPhotoEdit(data, file);
            setShowEditForm(false);
            return;
        }
        const formData: FormData = new FormData();

        formData.append("profile_image", file);
        isEditButtonClicked
            ? editProfile.mutate(formData, {
                  onSuccess: (data: any) => {
                      queryClient.invalidateQueries(["profile"]);
                      setShowEditForm(false);
                      setCroppedImage(null);
                      setIsEditButtonClicked(false);
                  },
                  onError: (error: any) => {
                      toast.error(error?.message);
                  },
              })
            : null;
    };

    const onImageEdit = async () => {
        const response = await fetch(`/api/image?image=${profileImage}`);

        const blob = await response.blob();

        const file = new File([blob], fileName, {
            type: blob.type,
        });
        const secondBlob = URL.createObjectURL(file);
        return secondBlob;
    };
    const submit = async () => {
        const blob = profileImage ? await onImageEdit() : null;
        onEditProfile(blob ? blob : toBeCroppedImage);
    };

    // useEffect(() => {
    //     console.log({ croppedImage });
    // }, [croppedImage]);
    // const uploadPreview = uploadedFile ? URL.createObjectURL(uploadedFile) : "";

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal image-crop">
                    <h3>Edit Photo</h3>

                    <input
                        type="file"
                        onChange={(e) => {
                            setClickedUpload(true);
                            const files = e.target.files;
                            setUploadedFile(files && files[0]);
                        }}
                        className={classes.input}
                        // onClick={}
                    />
                    <br />

                    <Modal.Body className="crop-container">
                        <Cropper
                            zoomWithScroll
                            image={
                                reactImage
                                    ? reactImage
                                    : clickedUpload
                                    ? uploadPreview
                                    : profile.data?.profile_image
                                    ? profileImage
                                    : photo
                                    ? toBeCroppedImage
                                    : ""
                            }
                            // objectFit="horizontal-cover"
                            rotation={rotation}
                            crop={crop}
                            zoom={zoom}
                            cropShape="round"
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                        />
                    </Modal.Body>
                    <div className="controls">
                        <h4>Zoom</h4>
                        <Slider
                            // type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={setZoom}
                            className="zoom-range"
                        />
                        <br />
                        <h4>Rotate</h4>

                        <Slider
                            // type="range"
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="Rotation"
                            onChange={setRotation}
                            className="zoom-range"
                        />
                    </div>

                    <Modal.Footer>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            className="btn close-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                isEditButtonClicked || haveImage
                                    ? submit()
                                    : submit();
                            }}
                        >
                            Apply
                        </Button>
                        {/* <FormButton
                            type="submit"
                            variant="primary"
                            name="Apply"
                            className="submit-btn"
                            onCli
                        /> */}
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};
const useStyles = createStyles(() => ({
    input: {
        marginBottom: "1rem",
    },
}));
export default PhotoEdit;
