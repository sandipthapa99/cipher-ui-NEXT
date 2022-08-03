import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import { MapboxMap } from "@components/common/MapboxMap";
const AppliedTask = () => {
    // 27.687713889865993, 85.32806957052709
    return (
        <>
            <AppliedLayout>
                <MapboxMap
                    latitude={27.687713889865993}
                    longitude={85.32806957052709}
                />
            </AppliedLayout>
        </>
    );
};
export default AppliedTask;
