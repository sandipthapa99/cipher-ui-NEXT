import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
    useHideLoginPrompt,
    useShowLoginPrompt,
} from "store/use-login-prompt-store";

/**
 * @description Displays a login prompt on unauthenticated actions
 */
export const LoginPrompt = () => {
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
        <Modal show={showLoginPrompt} onHide={hideLoginPrompt}>
            <Modal.Header closeButton />
            <Modal.Body>
                <p>Not logged in ?</p>
                <Link
                    href={{
                        pathname: "/login",
                        query: { next: router.asPath },
                    }}
                >
                    <a>Login</a>
                </Link>
            </Modal.Body>
        </Modal>
    );
};
