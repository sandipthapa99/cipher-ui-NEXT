import type { Dispatch, LegacyRef, SetStateAction } from "react";
import { useRef } from "react";
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
        } = props;
        console.log("🚀 ~ file: ImageUpload.tsx ~ line 28 ~ photo", photo);
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
                    handleSubmit={handleSubmit}
                    isEditButtonClicked={isEditButtonClicked}
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
