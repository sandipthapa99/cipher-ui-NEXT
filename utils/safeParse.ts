interface SafeParse<T> {
    rawString: string;
    initialData: T;
}
export const safeParse = <T>({ rawString, initialData }: SafeParse<T>) => {
    try {
        const data = JSON.parse(rawString) as T;
        return data;
    } catch (error) {
        return initialData;
    }
};
