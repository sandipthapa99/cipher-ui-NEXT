import Image from "next/image";
import Link from "next/link";

interface MarketPlaceCardProps {
    icon: string;
    title: string;
    description: string;
    redirectionTo: string;
    iconBackground: string;
}

const MarketPlaceCard = ({
    icon,
    title,
    description,
    redirectionTo,
    iconBackground,
}: MarketPlaceCardProps) => {
    return (
        <div className="marketplace-card-wrapper d-flex flex-column align-items-center justify-content-center">
            <div
                className="icon-wrapper"
                style={{ background: `${iconBackground}` }}
            >
                <div className="img-wrapper">
                    <figure className="icon-img">
                        <Image src={icon} alt="icon" height={85} width={85} />
                    </figure>
                </div>
            </div>
            <div className="content text-center">
                <h2>{title}</h2>
                <p>{description}</p>
                <Link href={redirectionTo}>
                    <a>Learn more</a>
                </Link>
            </div>
        </div>
    );
};
export default MarketPlaceCard;
