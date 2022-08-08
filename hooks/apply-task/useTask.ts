import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

// export const useTask = () => {
//     return useQuery<string | undefined>(["apply-task"], async () => {
//         const { access } = nookies.get(undefined, "access");
//         if (access === undefined) return undefined;
//         return Promise.resolve(access);
//     });
// };

const fetchTask = () => {
 return   axiosClient.get("/task/")
    
}



export const useApplyTask = () => {
  return  useQuery(["all-task"], fetchTask);
    
}

