import { Button, Group, Stack, Text } from "@mantine/core";
import { cleanNotifications } from "@mantine/notifications";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useRouter } from "next/router";

export const KYCIncompleteToast = () => {
    const router = useRouter();

    const { data: kycData } = useGetKYC();

    return (
        <Stack>
            {!kycData ? (
                <Text>Please complete your KYC before proceeding.</Text>
            ) : (
                <Text>Your KYC is pending for verification.</Text>
            )}

            <Group>
                {!kycData ? (
                    <>
                        <Button
                            variant="white"
                            color="gray"
                            onClick={() => cleanNotifications()}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="yellow"
                            onClick={() => {
                                cleanNotifications();
                                router.push(
                                    "/settings/account/individual#kycform"
                                );
                            }}
                        >
                            Fill KYC Details
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="filled"
                        color="gray"
                        onClick={() => cleanNotifications()}
                    >
                        Close
                    </Button>
                )}
            </Group>
        </Stack>
    );
};
