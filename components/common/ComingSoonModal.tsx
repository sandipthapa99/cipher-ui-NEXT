import { Modal } from "@mantine/core";
import Image from "next/image";

import CardBtn from "./CardBtn";

// import Modal from "react-bootstrap/Modal";
interface CommingSoonModalProps {
    show: boolean;
    handleClose: () => void;
}

const CommingSoonModal = ({ handleClose, show }: CommingSoonModalProps) => {
    return (
        <>
            <Modal
                opened={show}
                onClose={handleClose}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
                // overlayColor="909296"
                overlayOpacity={0.55}
                overlayBlur={3}
                size="md"
                className="comming-soon-modal"
            >
                <div className="information">
                    <figure>
                        <Image
                            alt="image"
                            src="/web-maintenance.svg"
                            height={128}
                            width={256}
                        />
                    </figure>
                    <h1>Coming Soon!</h1>
                    <p>Please be with us!</p>
                    <CardBtn
                        backgroundColor="#29BB89"
                        btnTitle="I will Wait."
                        handleClick={handleClose}
                    />
                </div>
            </Modal>
        </>
    );
};
export default CommingSoonModal;
