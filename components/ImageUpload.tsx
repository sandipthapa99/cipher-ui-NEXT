import { useGetProfile } from "hooks/profile/useGetProfile";
import type { Dispatch, SetStateAction } from "react";
import { forwardRef } from "react";
import type { AvatarProps } from "types/avatarProps";

import PhotoEdit from "./Profile/PhotoEdit";

interface ImageUploadProps {
    name: string;
    // ref: React.RefObject<HTMLInputElement>;
    photo: any;
    setShowEditForm: Dispatch<SetStateAction<boolean>>;

    setIsEditButtonClicked: Dispatch<SetStateAction<boolean>>;
    showEditForm: boolean;
    handleClose: () => void;
    onChange: (e: any) => void;
    isEditButtonClicked?: boolean;
    display: boolean;
    onPhotoEdit: (url: RequestInfo | URL, file: File) => void;
    onAvatarEdit: (avatar: AvatarProps[0]) => void;
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
            onAvatarEdit,
            isEditButtonClicked,

            onPhotoEdit,
        } = props;
        const profile = useGetProfile();
        const profileImage = profile.data?.profile_image;

        return (
            <>
                <span
                    hidden
                    ref={ref}
                    onChange={onChange}
                    onClick={() => setShowEditForm(true)}
                />
                <PhotoEdit
                    setIsEditButtonClicked={setIsEditButtonClicked}
                    show={showEditForm}
                    setShowEditForm={setShowEditForm}
                    handleClose={handleClose}
                    isEditButtonClicked={isEditButtonClicked}
                    onPhotoEdit={onPhotoEdit}
                    onAvatarEdit={onAvatarEdit}
                    haveImage={profileImage ? true : false}
                    photo={profileImage ? profileImage : photo}
                />
            </>
        );
    }
);
