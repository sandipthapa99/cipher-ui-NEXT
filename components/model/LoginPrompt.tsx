import { async } from "@firebase/util";
import { faKey, faUser } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useLogin";
import localforage from "localforage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
    useClearPausedFunction,
    useHideLoginPrompt,
    usePausedFunction,
    useShowLoginPrompt,
} from "store/use-login-prompt-store";

/**
 * @description Displays a login prompt on unauthenticated actions
 */
export const LoginPrompt = () => {
    const queryClient = useQueryClient();
    const { mutate: loginMutation, isLoading } = useLogin();
    const showLoginPrompt = useShowLoginPrompt();
    const hideLoginPrompt = useHideLoginPrompt();
    // const pausedFunction = usePausedFunction();
    // const clearPausedFunction = useClearPausedFunction();
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    // const theme = useMantineTheme();

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
            opened={showLoginPrompt}
            onClose={hideLoginPrompt}
            centered
            overlayColor="#DEE2E6"
            overlayOpacity={0.1}
            overlayBlur={3}
            title="Login to continue"
        >
            <Formik
                onSubmit={async (values) => {
                    const fcmToken = await localforage.getItem<string>(
                        "fcm_token"
                    );
                    loginMutation(
                        { ...values, fcm_token: fcmToken },
                        {
                            onSuccess: async () => {
                                hideLoginPrompt();
                                // if (pausedFunction) {
                                //     pausedFunction();
                                //     clearPausedFunction();
                                // }
                                await queryClient.invalidateQueries(["user"]);
                            },
                            onError: (error: any) => {
                                const {
                                    data: { username, password },
                                } = error.response;

                                setUsernameErrorMsg(username);
                                setPasswordErrorMsg(password);
                            },
                        }
                    );
                }}
                initialValues={{ username: "", password: "" }}
            >
                {({ getFieldProps }) => (
                    <Form>
                        <Stack style={{ boxShadow: "none" }}>
                            <TextInput
                                {...getFieldProps("username")}
                                icon={<FontAwesomeIcon icon={faUser} />}
                                placeholder="Username or phone number"
                                error={usernameErrorMsg && usernameErrorMsg}
                            />
                            <PasswordInput
                                {...getFieldProps("password")}
                                icon={<FontAwesomeIcon icon={faKey} />}
                                placeholder="Password"
                                error={passwordErrorMsg && passwordErrorMsg}
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
