import SearchResultsDetail from "@components/SearchTask/SearchResultsDetails";
import ServiceLayout from "@components/services/ServiceLayout";
import urls from "constants/urls";
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
                    budget_from={service?.budget_from}
                    budget_to={service?.budget_to}
                    budget_type={service?.budget_type}
                    serviceProvider={service?.created_by?.full_name ?? ""}
                    serviceProviderLocation={service?.location ?? ""}
                    serviceDescription={service?.description ?? ""}
                    serviceRating={"service?.success_rate ?? 0"}
                    serviceTitle={service?.title ?? ""}
                    haveDiscount={true}
                    discountOn={""}
                    discount={
                        service?.discount_value ? service?.discount_value : 0
                    }
                    highlights={service?.highlights}
                    servicePackage={servicePackage?.result}
                    serviceCreated={service?.created_at}
                    serviceViews={service?.views_count}
                    serviceId={service?.id}
                    currency={service?.currency?.code}
                    ProfileImage={service?.created_by?.profile_image}
                    service={service}
                />
            </ServiceLayout>
        </>
    );
};
export default ServicesDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: serviceData } = await axiosClient.get(urls.task.service);
        const paths = serviceData?.result?.map(
            ({ id }: ServicesValueProps["result"][0]) => ({
                params: { id: String(id) },
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
            `/task/entity/service/${params?.id}/`
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
        return {
            props: {
                service: {},
                servicePackage: {},
            },
            revalidate: 10,
        };
    }
};
