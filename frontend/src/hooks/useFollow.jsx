import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BaseUrl } from "../utils/constant";


function useFollow() {
    const queryclient = useQueryClient();

    const {mutate: follow, isPending}= useMutation({
        mutationFn: async (userId) => {
            try {
				const res = await fetch(`${BaseUrl}/api/user/follow_unfollow/${userId}`, {
					method: "POST",
                    credentials: "include",
				});

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
        },
        onSuccess:(data)=>{
            toast.success(data.message  || "follow or unfollow")
            Promise.all([
                queryclient.invalidateQueries({queryKey:["suggestedUsers"]}),
                queryclient.invalidateQueries({queryKey:["authUser"]})
            ])
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })


  return {follow, isPending}
}

export default useFollow