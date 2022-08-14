import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Modal } from "react-bootstrap";
import {
    useHideLoginPrompt,
    useShowLoginPrompt,
} from "store/use-login-prompt-store";

export const LoginPrompt = () => {
    const showLoginPrompt = useShowLoginPrompt();
    const hideLoginPrompt = useHideLoginPrompt();

    const router = useRouter();
    const pathname = router.pathname;
    return (
        <Modal show={showLoginPrompt} onHide={hideLoginPrompt}>
            <Modal.Header closeButton />
            <Modal.Body>
                <p>Not logged in ?</p>
                <Link href={`/login?next=${pathname}`}>
                    <a>Login</a>
                </Link>
            </Modal.Body>
        </Modal>
    );
};
