import SearchResultsDetail from "@components/SearchTask/SearchResultsDetails";
import ServiceLayout from "@components/services/ServiceLayout";
import type { GetStaticPaths, GetStaticProps } from "next";
import type {
    ServicesPackageProps,
    ServicesValueProps,
} from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

const ServicesDetail = ({
    service,
    servicePackage,
}: {
    service: ServicesValueProps["result"][0];
    servicePackage: ServicesPackageProps;
}) => {
    return (
        <>
            <ServiceLayout>
                <SearchResultsDetail
                    image={service?.images}
                    servicePrice={service?.budget_from ?? ""}
                    serviceProvider={service?.created_by?.full_name ?? ""}
                    serviceProviderLocation={service?.location ?? ""}
                    serviceDescription={service?.description ?? ""}
                    serviceRating={service?.success_rate ?? 0}
                    serviceTitle={service?.title ?? ""}
                    haveDiscount={true}
                    discountOn={""}
                    discount={
                        service?.discount_value ? service?.discount_value : 0
                    }
                    highlights={
                        service?.highlights
                            ? JSON.parse(service?.highlights)
                            : []
                    }
                    slug={service?.slug}
                    servicePackage={servicePackage?.result}
                    serviceCreated={service?.created_at}
                    serviceViews={service?.views_count}
                />
            </ServiceLayout>
        </>
    );
};
export default ServicesDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: serviceData } = await axiosClient.get("/task/service/");
        const paths = serviceData?.result?.map(
            ({ slug }: ServicesValueProps["result"][0]) => ({
                params: { slug },
            })
        );
        return { paths, fallback: true };
    } catch (error: any) {
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const { data } = await axiosClient.get<ServicesValueProps["result"][0]>(
            `/task/service/${params?.slug}/`
        );
        const { data: servicePackage } = await axiosClient.get<
            ServicesPackageProps["result"][0]
        >(`/task/service-package/`);

        return {
            props: {
                service: data,
                servicePackage: servicePackage,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        console.log(error);
        return {
            props: {
                service: {},
                servicePackage: {},
            },
            revalidate: 10,
        };
    }
};
