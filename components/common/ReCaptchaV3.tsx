import React, { useCallback, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

const ReCaptchaV3 = ({
    render,
    refresher,
}: {
    render: (token: string) => void;
    refresher: any;
}) => {
    const [token, setToken] = useState<string>("");

    const onVerify = useCallback((token: string) => {
        setToken(token);
    }, []);
    return (
        <>
            <GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refresher} />
            {render(token)}
        </>
    );
};

export default ReCaptchaV3;
