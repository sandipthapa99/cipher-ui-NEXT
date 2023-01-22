import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const useRecaptcha = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [token, setToken] = useState("");

    const clearToken = () => setToken("");

    const generateRecaptcha = useCallback(async () => {
        clearToken();
        const newToken = await executeRecaptcha?.();
        if (newToken) {
            setToken(newToken);
        }
    }, [executeRecaptcha]);
    useEffect(() => {
        clearToken();
        generateRecaptcha();
    }, [generateRecaptcha]);
    return { token, generateRecaptcha };
};
