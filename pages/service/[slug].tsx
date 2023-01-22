import SearchResultsDetail from "@components/SearchTask/SearchResultsDetails";
import ServiceLayout from "@components/services/ServiceLayout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { useServiceDetail } from "hooks/task/use-service-detail";
import type { GetServerSideProps } from "next";
import type {
    ServicesPackageProps,
    ServicesValueProps,
} from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";
import extractContent from "utils/extractString";

const ServicesDetail = ({
    service,
    servicePackage,
}: {
    service: ServicesValueProps["result"][0];
    servicePackage: ServicesPackageProps;
}) => {
    const { data: serviceDetail } = useServiceDetail(
        (service.id as string) ?? ""
    );

    return (
        <>
            <ServiceLayout
                title={serviceDetail?.title}
                description={extractContent(serviceDetail?.description)}
                ogImage={serviceDetail?.images[0]?.media}
                ogUrl={serviceDetail?.slug}
                serviceId={service.id}
            >
                <SearchResultsDetail
                    image={serviceDetail?.images}
                    budget_from={serviceDetail?.budget_from}
                    budget_to={serviceDetail?.budget_to}
                    budget_type={serviceDetail?.budget_type}
                    serviceProvider={
                        `${serviceDetail?.created_by?.first_name} ${serviceDetail?.created_by?.last_name}` ??
                        ""
                    }
                    serviceProviderId={serviceDetail?.created_by?.id ?? ""}
                    serviceProviderLocation={serviceDetail?.location ?? ""}
                    serviceDescription={serviceDetail?.description ?? ""}
                    serviceRating={"serviceDetail?.success_rate ?? 0"}
                    serviceTitle={serviceDetail?.title ?? ""}
                    haveDiscount={true}
                    discountOn={""}
                    discount={
                        serviceDetail?.discount_value
                            ? serviceDetail?.discount_value
                            : 0
                    }
                    highlights={serviceDetail?.highlights}
                    servicePackage={servicePackage?.result}
                    serviceCreated={serviceDetail?.created_at}
                    serviceViews={serviceDetail?.views_count}
                    serviceId={serviceDetail?.id}
                    currency={serviceDetail?.currency?.symbol}
                    ProfileImage={serviceDetail?.created_by?.profile_image}
                    service={service}
                    ratedTo={serviceDetail?.created_by?.id}
                    offers={serviceDetail?.offers}
                />
            </ServiceLayout>
        </>
    );
};
export default ServicesDetail;

// export const getStaticPaths: GetStaticPaths = async () => {
//     try {
//         const { data: serviceData } = await axiosClient.get(urls.task.service);
//         const paths = serviceData?.result?.map(
//             ({ slug }: ServicesValueProps["result"][0]) => ({
//                 params: { slug: slug },
//             })
//         );
//         return { paths, fallback: true };
//     } catch (error: any) {
//         return {
//             paths: [],
//             fallback: true,
//         };
//     }
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    //    const { id } = params as { id: string };
    try {
        const { data } = await axiosClient.get<ServicesValueProps["result"][0]>(
            `${urls.task.list}${params?.slug}/`
        );
        const queryClient = new QueryClient();

        // const { data: servicePackage } = await axiosClient.get<
        //     ServicesPackageProps["result"][0]
        // >(`/task/service-package/`);

        return {
            props: {
                service: data,
                // servicePackage: servicePackage,
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (error: any) {
        return {
            props: {
                service: {},
                // servicePackage: {},
            },
        };
    }
};
