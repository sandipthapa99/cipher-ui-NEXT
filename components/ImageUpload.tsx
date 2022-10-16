import type { Dispatch, SetStateAction } from "react";
import { forwardRef } from "react";

import PhotoEdit from "./Profile/PhotoEdit";

interface ImageUploadProps {
    name: string;
    // ref: React.RefObject<HTMLInputElement>;
    photo: any;
    setShowEditForm: Dispatch<SetStateAction<boolean>>;
    showEditForm: boolean;
    handleClose: () => void;
    handleSubmit?: () => void;
    onChange: (e: any) => void;
    isEditButtonClicked?: boolean;
    display: boolean;
    onPhotoEdit: (url: RequestInfo | URL, file: File) => void;
}

// eslint-disable-next-line react/display-name
export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
    (props, ref) => {
        // const inputRef = useRef<HTMLInputElement>(null);
        // display ? inputRef?.current?.click() : null;
        const {
            name,
            onChange,
            photo,
            setShowEditForm,
            showEditForm,
            handleClose,
            handleSubmit,
            isEditButtonClicked,
            display,
            onPhotoEdit,
        } = props;
        return (
            <>
                <input
                    hidden
                    type="file"
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    // onClick={}
                />
                <PhotoEdit
                    photo={photo}
                    show={showEditForm}
                    setShowEditForm={setShowEditForm}
                    handleClose={handleClose}
                    isEditButtonClicked={isEditButtonClicked}
                    onPhotoEdit={onPhotoEdit}
                />
            </>
        );
    }
);

// {
//     name,
//     ref,
//     onChange,
//     photo,
//     setShowEditForm,
//     showEditForm,
//     handleClose,
//     handleSubmit,
//     isEditButtonClicked,
//     display,
// }: // display,
// ImageUploadProps
