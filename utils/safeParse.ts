interface SafeParse<T> {
    rawString: string;
    initialData: T;
}
export const safeParse = <T>({ rawString, initialData }: SafeParse<T>) => {
    try {
        return JSON.parse(rawString) as T;
    } catch (error) {
        return initialData;
    }
};
