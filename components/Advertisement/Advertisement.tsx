import { useData } from "hooks/use-data";
import Image from "next/image";

const Advertisement = () => {
    const { data: Advertisement } = useData<{
        result: Array<{
            id: number;
            category: string;
            mode: string;
            image: string;
            is_active: boolean;
            video_url: string;
        }>;
    }>(["Advertisement"], "marketing/advertisement/");
    // console.log(Advertisement?.data?.result);
    const landscapedImages = Advertisement?.data?.result.filter(
        (ad: any) => ad.mode === "Landscape"
    );

    const boxImages = Advertisement?.data?.result.filter(
        (ad: any) => ad.mode === "Box"
    );

    const landscape = landscapedImages?.map((ad: any) => {
        return (
            <div key={ad.id} className="image-div">
                <figure className="advertisement-image">
                    <Image
                        src={ad.image}
                        alt={ad.mode}
                        width={1200}
                        height={300}
                    />
                </figure>
            </div>
        );
    });
    const box = boxImages?.map((ad: any) => {
        return (
            <div key={ad.id}>
                <Image src={ad.image} alt={ad.mode} width={400} height={400} />
            </div>
        );
    });

    return (
        <>
            <div> {landscape}</div>
            {/* <div> {box}</div> */}
        </>
    );
};
export default Advertisement;
