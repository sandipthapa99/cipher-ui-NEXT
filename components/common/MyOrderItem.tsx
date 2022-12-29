import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import type { MyOrderProps } from "types/myOrderProps";

export const MyOrderItem = ({
    orderItem,
}: {
    orderItem: MyOrderProps["result"][0]["order_item"];
}) => {
    return (
        <>
            {orderItem?.map((item, key) => {
                console.log(item);
                return (
                    <div className="my-task-order text-black-50" key={key}>
                        <div className="order-detail-section border-bottom-0 bg-white">
                            <Row>
                                <Col lg={2} md={6} sm={6} xs={12}>
                                    {/* <Link href={`/task/${item?.task?.id}`}>
                                        <a> */}
                                    <figure className="d-flex align-items-center justify-content-start h-100 w-100 order-detail-section__image">
                                        {item?.task?.entity_service_images
                                            .length > 0 ? (
                                            <Image
                                                src={
                                                    item?.task
                                                        ?.entity_service_images[0]
                                                        .media
                                                }
                                                alt="order-detail-image"
                                                height={160}
                                                width={180}
                                            />
                                        ) : (
                                            <Image
                                                src={
                                                    "/placeholder/taskPlaceholder.png"
                                                }
                                                alt="order-detail-image"
                                                objectFit="contain"
                                                height={160}
                                                width={140}
                                            />
                                        )}
                                    </figure>
                                    {/* </a>
                                    </Link> */}
                                </Col>
                                <Col md={6} sm={12}>
                                    {/* <Link href={`/task/${item?.task?.id}`}>
                                        <a> */}
                                    <div className="title-and-description text-black-50">
                                        <h4>{item?.task?.title}</h4>
                                        <h4>
                                            By {item?.task?.assignee.first_name}{" "}
                                            {item?.task?.assignee.middle_name ??
                                                ""}{" "}
                                            {item?.task?.assignee.last_name}
                                        </h4>
                                        <div className="price-section">
                                            <span className="price">
                                                Price :{" "}
                                            </span>
                                            <span className="value">
                                                {item?.task?.currency}{" "}
                                                {item?.amount}
                                                {item?.task?.budget_type ===
                                                "Hourly"
                                                    ? "/hr"
                                                    : item?.task
                                                          ?.budget_type ===
                                                      "Monthly"
                                                    ? "/mn"
                                                    : item?.task
                                                          ?.budget_type ===
                                                      "Daily"
                                                    ? "/daily"
                                                    : "/project"}
                                            </span>
                                        </div>
                                        <span className="item-id p-3 rounded">
                                            Item ID: #{item?.id.slice(0, 8)}
                                        </span>
                                    </div>
                                    {/* </a>
                                    </Link> */}
                                </Col>

                                {/* <Col md={12} lg={4}>
                                    <div className="badge-and-status w-100 d-flex">
                                        <Link
                                            href={{
                                                pathname: "/checkout/",
                                                query: {
                                                    id: item?.item
                                                        ?.entity_service?.id,
                                                },
                                            }}
                                        >
                                            <a className="ms-auto mb-3">
                                                <Button variant="light">
                                                    Pay Now
                                                </Button>
                                            </a>
                                        </Link>
                                    </div>
                                </Col> */}
                            </Row>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
