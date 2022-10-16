import getCroppedImg from "@components/AppliedTask/Crop";
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
}: editProfileProps) => {
    //console.log("🚀 ~ file: PhotoEdit.tsx ~ line 34 ~ display", display);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(5);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
    let previewImage: any;

    const reactImage = useMemo(() => {
        photo ? (previewImage = URL.createObjectURL(photo)) : "";
        return previewImage;
    }, [photo]);

    const onCropComplete = useCallback(
        (croppedArea: any, croppedAreaPixels: any) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = (await getCroppedImg(
                reactImage,
                croppedAreaPixels,
                rotation
            )) as Blob;
            console.log("donee", { croppedImage });
            setCroppedImage(croppedImage);
            return croppedImage;
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation, reactImage]);

    const editProfile = useMutation((data: FormData) =>
        axiosClient.patch("/tasker/profile/", data)
    );
    const queryClient = useQueryClient();
    const profile = useGetProfile();
    console.log("🚀 ~ file: PhotoEdit.tsx ~ line 74 ~ profile", profile);
    const profileImage = profile.data?.profile_image;
    console.log(
        "🚀 ~ file: PhotoEdit.tsx ~ line 83 ~ onEditProfile ~ profileImage",
        profileImage
    );

    const onEditProfile = async () => {
        const data = (await showCroppedImage()) as unknown as RequestInfo | URL;

        if (!data) return;

        console.log("data", data);
        const response = await fetch(data);

        const blob = await response.blob();

        const file = new File([blob], photo.name, {
            type: blob.type,
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

    const submit = async () => {
        console.log("cropped image", croppedImage);
        onEditProfile();
    };

    useEffect(() => {
        console.log({ croppedImage });
    }, [croppedImage]);

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
                    <Modal.Body className="crop-container">
                        <Cropper
                            image={reactImage}
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
                            onClick={() => {
                                isEditButtonClicked ? submit() : submit();
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
