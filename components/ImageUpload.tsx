import { faLoveseat } from "@fortawesome/pro-regular-svg-icons";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { Dispatch, SetStateAction } from "react";
import { forwardRef } from "react";

import PhotoEdit from "./Profile/PhotoEdit";

interface ImageUploadProps {
    name: string;
    // ref: React.RefObject<HTMLInputElement>;
    photo: any;
    setShowEditForm: Dispatch<SetStateAction<boolean>>;

    setIsEditButtonClicked: Dispatch<SetStateAction<boolean>>;
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
            setIsEditButtonClicked,
            photo,
            setShowEditForm,
            showEditForm,
            handleClose,
            handleSubmit,
            isEditButtonClicked,

            onPhotoEdit,
        } = props;
        const profile = useGetProfile();
        const profileImage = profile.data?.profile_image;

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
                    setIsEditButtonClicked={setIsEditButtonClicked}
                    show={showEditForm}
                    setShowEditForm={setShowEditForm}
                    handleClose={handleClose}
                    isEditButtonClicked={isEditButtonClicked}
                    onPhotoEdit={onPhotoEdit}
                    haveImage={profileImage ? true : false}
                    photo={profileImage ? profileImage : photo}
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
