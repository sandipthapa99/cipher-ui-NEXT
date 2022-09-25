import { faKey, faUser } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, PasswordInput, Stack, TextInput } from "@mantine/core";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useLogin";
import localforage from "localforage";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
    useHideLoginPrompt,
    useShowLoginPrompt,
} from "store/use-login-prompt-store";

/**
 * @description Displays a login prompt on unauthenticated actions
 */
export const LoginPrompt = () => {
    const { mutate: loginMutation, isLoading } = useLogin();
    const showLoginPrompt = useShowLoginPrompt();
    const hideLoginPrompt = useHideLoginPrompt();

    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", hideLoginPrompt);
        router.events.on("routeChangeError", hideLoginPrompt);
        return () => {
            router.events.off("routeChangeStart", hideLoginPrompt);
            router.events.off("routeChangeError", hideLoginPrompt);
        };
    }, [hideLoginPrompt, router.events]);
    return (
        <Modal
            centered
            opened={showLoginPrompt}
            onClose={hideLoginPrompt}
            title="Login to continue"
        >
            <Formik
                onSubmit={async (values) => {
                    const fcmToken = await localforage.getItem<string>(
                        "fcm_token"
                    );
                    if (!fcmToken) return;
                    loginMutation(
                        { ...values, fcm_token: fcmToken },
                        {
                            onSuccess: () => {
                                hideLoginPrompt();
                            },
                        }
                    );
                }}
                initialValues={{ username: "", password: "" }}
            >
                {({ getFieldProps }) => (
                    <Form>
                        <Stack>
                            <TextInput
                                {...getFieldProps("username")}
                                icon={<FontAwesomeIcon icon={faUser} />}
                                placeholder="Username or phone number"
                            />
                            <PasswordInput
                                {...getFieldProps("password")}
                                icon={<FontAwesomeIcon icon={faKey} />}
                                placeholder="Password"
                            />
                            <Button loading={isLoading} type="submit">
                                Login
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
