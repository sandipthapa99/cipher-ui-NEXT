import getCroppedImg from "@components/AppliedTask/Crop";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
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
    //  setDisplay: Dispatch<SetStateAction<boolean>>;
    photo?: any;
    //  display: boolean;
    handleSubmit?: () => void;
    isEditButtonClicked?: boolean;
}

const PhotoEdit = ({
    show,
    handleClose,
    handleSubmit,
    setShowEditForm,
    //  setDisplay,
    photo,
    //   display,
    isEditButtonClicked,
}: editProfileProps) => {
    //console.log("🚀 ~ file: PhotoEdit.tsx ~ line 34 ~ display", display);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
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
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation, reactImage]);
    console.log(
        "🚀 ~ file: PhotoEdit.tsx ~ line 64 ~ showCroppedImage ~ croppedImage",
        croppedImage
    );

    const editProfile = useMutation((data: FormData) =>
        axiosClient.patch("/tasker/profile/", data)
    );
    const queryClient = useQueryClient();

    const onEditProfile = (data: any) => {
        console.log(
            "🚀 ~ file: PhotoEdit.tsx ~ line 74 ~ onEditProfile ~ data",
            data
        );

        const file = new File([data], photo.name, {
            type: photo.type,
            lastModified: Date.now(),
        });
        console.log(
            "🚀 ~ file: PhotoEdit.tsx ~ line 79 ~ onEditProfile ~ photo.name",
            photo.name
        );

        console.log(
            "🚀 ~ file: PhotoEdit.tsx ~ line 78 ~ onEditProfile ~ file",
            file
        );

        const formData: FormData = new FormData();

        formData.append("profile_image", file);

        console.log(
            "🚀 ~ file: PhotoEdit.tsx ~ line 88 ~ onEditProfile ~ data",
            data
        );

        editProfile.mutate(formData, {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["profile"]);
                setShowEditForm(false);
                //setDisplay(false);
            },
            onError: (error: any) => {
                // setDisplay(false);
                toast.error(data?.data?.message);
                // setShowEditForm(false);
            },
        });
    };
    const submit = () => {
        showCroppedImage();
        onEditProfile(croppedImage);
    };
    // console.log(
    //     "🚀 ~ file: PhotoEdit.tsx ~ line 94 ~ submit ~ croppedImage",
    //     reactImage,
    //     croppedAreaPixels,
    //     rotation,
    //     "dsfasdf",
    //     croppedImage,
    //     photo
    // );

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
                                isEditButtonClicked
                                    ? submit()
                                    : setShowEditForm(false);
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
