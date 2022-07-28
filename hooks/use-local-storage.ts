import { Dispatch, SetStateAction, useState } from "react";

export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    const updateValue = (value: T | ((valueFunc: T) => T)) => {
        if (typeof window !== "undefined") {
            const newValue =
                value instanceof Function ? value(storedValue) : value;
            localStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue);
        }
    };
    return [storedValue, updateValue];
};
