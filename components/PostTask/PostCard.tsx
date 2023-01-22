import CardBtn from "@components/common/CardBtn";
import { Modal } from "@mantine/core";
import { CheckCircle } from "@mui/icons-material";
import {
    useShowSuccessModal,
    useShowSuccessModalMessage,
    useToggleSuccessModal,
} from "store/use-success-modal";

interface Props {
    text: string;
    buttonName: string;
    type: string;
}
export const PostCard = ({ buttonName, type }: Props) => {
    const showSuccessModal = useShowSuccessModal();
    const toggleSuccessModal = useToggleSuccessModal();
    const toggleSuccessModalMessage = useShowSuccessModalMessage();

    return (
        <Modal
            opened={showSuccessModal}
            onClose={() => toggleSuccessModal()}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
            overlayOpacity={0.55}
            overlayBlur={3}
            size="md"
            className="success-modal"
        >
            <div className="success-content ">
                <CheckCircle className="svg-icon" />
                <div className="success-text">
                    <h3 className="mt-5">{type}</h3>
                    <p>{toggleSuccessModalMessage}</p>
                </div>

                {/* <div className="btn-continue"> */}
                <CardBtn
                    backgroundColor="#211d4f"
                    btnTitle={buttonName}
                    handleClick={() => toggleSuccessModal()}
                />
            </div>
        </Modal>
    );
};
