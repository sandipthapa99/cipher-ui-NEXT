import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AppliedTaskDetail from "@components/AppliedTask/AppliedTaskDetail";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useUser } from "hooks/auth/useUser";
import { useRouter } from "next/router";

const TaskDetail = () => {
    const router = useRouter();
    const { data: user, isLoading } = useUser();

    const { slug } = router.query;

    return (
        <>
            <AppliedLayout>
                {!isLoading && user ? (
                    <AppliedTaskDetail />
                ) : (
                    <Alert
                        color="red"
                        title="Not logged in!"
                        icon={<FontAwesomeIcon icon={faWarning} />}
                    >
                        <Text mb="xs">You need to login to see this page.</Text>
                        {typeof window !== "undefined" && (
                            <NextLink
                                href={{
                                    pathname: "/login",
                                    query: {
                                        next: `/task/${slug}`,
                                    },
                                }}
                            >
                                Login now
                            </NextLink>
                        )}
                    </Alert>
                )}
            </AppliedLayout>
        </>
    );
};
export default TaskDetail;
