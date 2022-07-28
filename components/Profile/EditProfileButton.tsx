interface addNew {
    text: string;
    showModal: boolean;
    handleOnClick: (show: any) => void;
}

const EditProfileButton = ({ text, showModal, handleOnClick }: addNew) => {
    return (
        <>
            <a
                onClick={() => handleOnClick(showModal)}
                style={{ cursor: "pointer" }}
                className="link"
            >
                {text}
            </a>
        </>
    );
};
export default EditProfileButton;
