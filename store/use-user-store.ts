import type { User } from "types/user";
import create from "zustand";

let user: User;

// if (typeof window !== "undefined") {
//     const userJson = localStorage.getItem("user");
//     if (userJson) {
//         const res = JSON?.parse(userJson);
//         user = res.data;
//     }
// }

type UseUserStoreProps = {
    user: User | undefined;
    setUser: (detail: User | any) => void;
    removeUser: () => void;
};

const useUserStore = create<UseUserStoreProps>((set) => ({
    user: user ? user : undefined,
    setUser: (detail: User) => set(() => ({ user: detail })),
    removeUser: () => set(() => ({ user: undefined })),
}));

export default useUserStore;
