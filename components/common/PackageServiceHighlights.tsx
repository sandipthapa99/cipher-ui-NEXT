const PackageServiceHighlights = ({
    title,
    isChecked,
}: {
    title: string;
    isChecked?: boolean;
}) => {
    return (
        <div className="py-2 checkbox">
            <div className="checked-content ">
                <div className="check"></div>
                <label className="label" style={{ marginLeft: "1.5rem" }}>
                    {title}
                </label>
            </div>
            {/* {isChecked ? (
                <div className="checked-content ">
                    <div className="check"></div>
                    <label className="label" style={{ marginLeft: "1.5rem" }}>
                        {title}
                    </label>
                </div>
            ) : (
                <div className="unchecked-content">
                    <div className="check"></div>

                    <label className="label" style={{ marginLeft: "1.5rem" }}>
                        <del>{title}</del>
                    </label>
                </div>
            )} */}
        </div>
    );
};
export default PackageServiceHighlights;
