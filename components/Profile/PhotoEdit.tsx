import FormButton from "@components/common/FormButton";
import { Dispatch, SetStateAction } from "react";
import React, { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";

interface editProfileProps {
    show?: boolean;
    handleClose?: () => void;
    setShowEditForm: Dispatch<SetStateAction<boolean>>;
    photo: any;
    handleSubmit?: () => void;
}

const PhotoEdit = ({
    show,
    handleClose,
    handleSubmit,
    photo,
}: editProfileProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    //  const [previewImage, setPreviewImage] = useState("");
    let previewImage: any;
    const reactImage = useMemo(() => {
        photo ? (previewImage = URL.createObjectURL(photo)) : "";
        return previewImage;
    }, [photo]);

    console.log("preview image=", previewImage);

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
                            cropShape="round"
                            aspect={1}
                            onCropChange={setCrop}
                            // onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
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
                    <Modal.Footer>
                        <Button className="btn close-btn" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            className="btn close-btn"
                            onClick={handleSubmit}
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
