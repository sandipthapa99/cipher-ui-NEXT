import getCroppedImg from "@components/AppliedTask/Crop";
import { isEmpty } from "@firebase/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "hooks/profile/profile";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import React, { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import { axiosClient } from "utils/axiosClient";
interface editProfileProps {
    show?: boolean;
    handleClose?: () => void;
    setShowEditForm: Dispatch<SetStateAction<boolean>>;
    photo?: any;
    handleSubmit?: () => void;
    haveImage: boolean;
    isEditButtonClicked?: boolean;
    onPhotoEdit: (url: RequestInfo | URL, file: File) => void;
}

const PhotoEdit = ({
    show,
    handleClose,
    setShowEditForm,
    photo,
    isEditButtonClicked,
    onPhotoEdit,
    haveImage,
}: editProfileProps) => {
    const ORIENTATION_TO_ANGLE = {
        "3": 180,
        "6": 90,
        "8": -90,
    };
    //console.log("🚀 ~ file: PhotoEdit.tsx ~ line 34 ~ display", display);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(5);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
    const [toEditImage, setToEditImage] = useState<Blob | null | string>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [clickedUpload, setClickedUpload] = useState(false);

    let previewImage: any;

    const reactImage = useMemo(() => {
        try {
            photo ? (previewImage = URL.createObjectURL(photo)) : "";
        } catch {
            ("");
        }
        return previewImage;
    }, [photo]);

    console.log("photo=", photo);
    const queryClient = useQueryClient();
    const profile = useGetProfile();
    const profileImage = profile.data?.profile_image;

    console.log("profile image", profileImage);

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

    console.log(
        "🚀 ~ file: PhotoEdit.tsx ~ line 181 ~ uploadedFile",
        uploadedFile,
        uploadPreview
    );
    console.log("cli", clickedUpload);
    const toBeCroppedImage = clickedUpload
        ? uploadPreview
        : profileImage
        ? toEditImage
        : reactImage
        ? reactImage
        : "";
    console.log(
        "🚀 ~ file: PhotoEdit.tsx ~ line 79 ~ toBeCroppedImage",
        toBeCroppedImage
    );

    const showCroppedImage = useCallback(async () => {
        try {
            console.log("hsdfasdf");
            const croppedImage = (await getCroppedImg(
                toBeCroppedImage,
                croppedAreaPixels,
                rotation
            )) as Blob;
            console.log("donee", { croppedImage });
            setCroppedImage(croppedImage);
            return croppedImage;
        } catch (e) {
            console.error(e);
            console.log("done");
        }
    }, [toBeCroppedImage, croppedAreaPixels, rotation]);

    console.log(
        "🚀 ~ file: PhotoEdit.tsx ~ line 139 ~ showCroppedImage ~ croppedImage",
        croppedImage,
        uploadPreview
    );

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

    const onEditProfile = async () => {
        console.log("hii");
        const data = (await showCroppedImage()) as unknown as RequestInfo | URL;

        if (!data) return;

        const response = await fetch(data);

        const blob = await response.blob();

        const file = new File([blob], "profile.jpeg", {
            type: "image/jpeg",
        });

        if (!profileImage) {
            console.log("heyyy");
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

        setToEditImage(URL.createObjectURL(file));
        //  return file;
    };
    const submit = async () => {
        if (profileImage) {
            onImageEdit();
        }

        onEditProfile();
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
                <div className="applied-modal">
                    <h3>Edit Photo</h3>
                    {/* <AvatarEditor
                        image="http://example.com/initialimage.jpg"
                        width={250}
                        height={250}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={1.2}
                        rotate={0}
                    /> */}
                    <input
                        type="file"
                        onChange={(e) => {
                            setClickedUpload(true);
                            const files = e.target.files;
                            setUploadedFile(files && files[0]);
                        }}
                        // onClick={}
                    />
                    <Modal.Body className="crop-container">
                        <Cropper
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
                            crop={crop}
                            zoom={zoom}
                            zoomWithScroll={true}
                            cropShape="round"
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                        />
                    </Modal.Body>
                    <div className="controls">
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => {
                                setZoom(parseFloat(e.currentTarget.value));
                            }}
                            className="zoom-range"
                        />

                        <h2>Rotate</h2>
                        <input
                            type="range"
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="Rotation"
                            onChange={(e) => {
                                console.log("value of rao", e.target.value);
                                setRotation(parseInt(e.target.value));
                            }}
                            className="rotation-range"
                        />
                    </div>
                    {/* <div className="cropped-image-container">
                        {croppedImage && (
                            <Image
                                className="cropped-image"
                                src={croppedImage}
                                alt="cropped"
                                layout="fill"
                            />
                        )}
                        {croppedImage && (
                            <button onClick={onClose}>close</button>
                        )}
                    </div> */}
                    <Modal.Footer>
                        <Button
                            //    className="btn close-btn"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
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
export default PhotoEdit;
