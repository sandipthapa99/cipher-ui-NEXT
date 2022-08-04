import FormButton from "@components/common/FormButton";
import type { Dispatch, SetStateAction } from "react";
import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";

interface ExperienceProps {
    show?: boolean;
    handleClose?: () => void;
    setShowExpForm: Dispatch<SetStateAction<boolean>>;
    photo: string;
}

const PhotoEdit = ({ show, handleClose, photo }: ExperienceProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(3);

    const onCropComplete = useCallback(
        (croppedArea: any, croppedAreaPixels: any) => {
            console.log(croppedArea, croppedAreaPixels);
        },
        []
    );
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Task Details</h3>
                    {/* <AvatarEditor
                        image="http://example.com/initialimage.jpg"
                        width={250}
                        height={250}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={1.2}
                        rotate={0}
                    /> */}
                    <Modal.Body>
                        <Cropper
                            image={photo}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="btn close-btn w-25"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>

                        <FormButton
                            type="submit"
                            variant="primary"
                            name="Apply"
                            className="submit-btn w-25"
                        />
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};
export default PhotoEdit;
