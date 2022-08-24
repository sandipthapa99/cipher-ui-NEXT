import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckoutEmpty = () => {
    return (
        <div className="checkout-empty p-5">
            <figure className="mx-auto">
                <Image src={"/brokenGear.png"} alt={"sdsd"} layout="fill" />
            </figure>
            <p className="d-flex flex-column text-center mb-2">
                No any service selected yet.
                <span>
                    <Link href="/task">
                        <a>click here </a>
                    </Link>
                    to add tasks/services.
                </span>
            </p>
        </div>
    );
};
export default CheckoutEmpty;
