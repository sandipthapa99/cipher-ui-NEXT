import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Container, Row } from "react-bootstrap";

const Offers = () => {
    const router = useRouter();

    return (
        <Layout title="Cipher -offers">
            <section className="recommend offers">
                <Container fluid="xl" className="px-5">
                    <BreadCrumb currentPage={"Offers"} />
                    <div className="offer-wrapper d-flex gap-5">
                        <figure className="offer-img">
                            <Image
                                src={"/discountcard1.png"}
                                height={400}
                                width={648}
                                alt={"voucher"}
                                objectFit="contain"
                            />
                        </figure>
                        <figure className="offer-img">
                            <Image
                                src={"/discountcard2.png"}
                                height={400}
                                width={648}
                                alt={"voucher"}
                            />
                        </figure>
                    </div>
                    <h2>Recommend</h2>
                </Container>
            </section>
        </Layout>
    );
};

export default Offers;
