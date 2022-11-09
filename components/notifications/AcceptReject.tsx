import BigButton from "@components/common/Button";

export const AcceptReject = ({
    slug,
    accepted,
    type,
}: {
    slug?: string;
    accepted?: boolean | undefined;
    type?: string;
}) => {
    return (
        <div className="d-flex accept-reject-component">
            {!accepted && (
                <div className="accept">
                    <BigButton
                        btnTitle={"Accept"}
                        backgroundColor={"#211D4F"}
                        textColor={"white"}
                    />
                </div>
            )}
        </div>
    );
};
