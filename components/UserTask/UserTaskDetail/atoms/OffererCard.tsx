import Image from "next/image";

interface OffererCardProps {
    profileImage: string;
    name: string;
    category: string;
    price: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}
export const OffererCard = ({
    profileImage,
    name,
    category,
    price,
}: OffererCardProps) => {
    return (
        <div className="offerer-card">
            <div className="offerer-card__profile">
                <Image
                    src={profileImage}
                    width="48px"
                    height="48px"
                    alt={`${name} profile image`}
                    className="rounded-circle"
                />
                <div className="offerer-card__profile--info">
                    <h4>{name}</h4>
                    <p>{category}</p>
                </div>
            </div>
            <p className="offerer-card__charge">
                <span className="offerer-card__charge--label">Price</span>
                <span className="offerer-card__charge--value">Rs {price}</span>
            </p>
            <div className="offerer-card__footer">
                <button className="offerer-card__footer--btn confirm">
                    Confirm
                </button>
                <button className="offerer-card__footer--btn cancel">
                    Cancel
                </button>
            </div>
        </div>
    );
};
