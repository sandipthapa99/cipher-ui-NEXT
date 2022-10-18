import { Button, Group, Stack, Text } from "@mantine/core";
import { cleanNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";

export const KYCIncompleteToast = () => {
    const router = useRouter();
    return (
        <Stack>
            <Text>Please complete your KYC before proceeding.</Text>
            <Group>
                <Button
                    variant="white"
                    color="gray"
                    onClick={() => cleanNotifications()}
                >
                    Cancel
                </Button>
                <Button
                    color="yellow"
                    onClick={() =>
                        router.push("/settings/account/individual#kycform")
                    }
                >
                    Fill KYC Details
                </Button>
            </Group>
        </Stack>
    );
};
