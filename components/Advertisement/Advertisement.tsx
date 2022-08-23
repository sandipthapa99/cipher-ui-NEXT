import { useData } from "hooks/use-data";
import { axiosClient } from "utils/axiosClient";

const Advertisement = () => {
    const { data: Advertisement, isLoading } = useData(
        ["Advertisement"],
        "marketing/advertisement/"
    );
    console.log(Advertisement?.data);

    return (
        <>
            <h1>Helo</h1>
        </>
    );
};
export default Advertisement;
