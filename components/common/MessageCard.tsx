import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { MessageCardProps } from "types/messageCard";
const MessageCard = ({
    clientImage,
    clientMessages,
    merchantImage,
    merchantMessages,
}: MessageCardProps) => {
    return (
        <div className="message-card">
            <Row>
                <Col md={7}>
                    <div className="client-message">
                        {clientMessages.map((info: any) => (
                            <div className="content" key={info.id}>
                                <div className="d-flex">
                                    <figure className="thumbnail-img">
                                        <Image
                                            src={clientImage}
                                            layout="fill"
                                            objectFit="cover"
                                            alt="user-image"
                                        />
                                    </figure>
                                    <div className="d-flex flex-column">
                                        <div className="message">
                                            <p>{info.message}</p>
                                        </div>
                                        <div className="time">
                                            {info.hour}:{info.minute}
                                            {info.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col md={5}>
                    <div className="merchant-message">
                        {merchantMessages.map((info: any) => (
                            <div className="content" key={info.id}>
                                <div className="d-flex">
                                    <figure className="thumbnail-img">
                                        <Image
                                            src={merchantImage}
                                            layout="fill"
                                            objectFit="cover"
                                            alt="user-image"
                                        />
                                    </figure>

                                    <div className="d-flex flex-column">
                                        <div className="message">
                                            <p>{info.message}</p>
                                        </div>
                                        <div className="time">
                                            {info.hour}:{info.minute}
                                            {info.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default MessageCard;
