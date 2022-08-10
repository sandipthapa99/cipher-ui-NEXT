import jwtDecode from "jwt-decode";
import type { User } from "types/user";
import { axiosClient } from "utils/axiosClient";

export class UserService {
    static async fetchUser(token: string) {
        const { user_id: userId } = jwtDecode<{ user_id: string }>(token);
        const { data } = await axiosClient.get<User>(`/user/${userId}`);
        return data;
    }
}
