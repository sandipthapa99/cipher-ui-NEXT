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
        <Modal
            centered
            show={showLoginPrompt}
            onHide={hideLoginPrompt}
            className="not-login-prompt"
        >
            <Modal.Header closeButton />
            <Modal.Body className="d-flex align-items-center justify-content-center">
                <p>
                    Please
                    <span>
                        <Link
                            href={{
                                pathname: "/login",
                                query: { next: router.asPath },
                            }}
                        >
                            <a> Login </a>
                        </Link>
                    </span>
                    to continue.
                </p>
            </Modal.Body>
        </Modal>
    );
};
