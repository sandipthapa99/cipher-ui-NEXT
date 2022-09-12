import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@components/GoogleMap"), {
    ssr: false,
});
const AppliedTask = () => {
    return (
        <>
            <AppliedLayout>
                <GoogleMap />
            </AppliedLayout>
        </>
    );
};
export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        await queryClient.prefetchQuery(["all-tasks"]);
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default AppliedTask;
