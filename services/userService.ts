import jwtDecode from "jwt-decode";
import type { GetServerSidePropsContext, PreviewData } from "next";
import nookies from "nookies";
import type { ParsedUrlQuery } from "querystring";
import type { User } from "types/user";
import { createAxiosClient } from "utils/axiosClient";

type FetchUser =
    | { type: "client"; token: string }
    | {
          type: "server";
          context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
      };
export class UserService {
    static async fetchUser(fetchUserData: FetchUser) {
        const token =
            fetchUserData.type === "client"
                ? fetchUserData.token
                : nookies.get(fetchUserData.context, "access").access;
        if (!token) return null;
        console.log(token);
        const { user_id: userId } = jwtDecode<{ user_id: string }>(token);
        const { data } = await createAxiosClient(
            fetchUserData.type === "server" ? fetchUserData.context : undefined
        ).get<User>(`/user/${userId}`);
        return data;
    }
}
