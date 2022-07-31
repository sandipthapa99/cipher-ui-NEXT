const Tags = ({ title }: { title: string }) => {
    return (
        <div className="tags-wrapper">
            <div className="chips-content d-flex">
                <div className="triangle"></div>
                <div className="circle"></div>
                <h6>{title}</h6>
            </div>
        </div>
    );
};
export default Tags;
