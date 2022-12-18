import Image from "next/image";
import Link from "next/link";
import React from "react";

export const EmptyOffers = () => {
    return (
        <div className="text-center">
            <Image
                src={"/offerEmpty.svg"}
                alt={"sd"}
                width={400}
                height={400}
            />
            <p className="mb-1">You don’t have any offers yet.</p>
            <p>
                <Link href={"/service"}>
                    <a>Click here </a>
                </Link>
                to explore service
            </p>
        </div>
    );
};
