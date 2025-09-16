import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BaseUrl } from "../utils/constant";

function useUpdateuserProfile() {
  const queryclient = useQueryClient();

  const {mutateAsync: updateProfile, isPending: isUpdatingProfile}= useMutation({
    mutationFn: async (formData) => {
      try {
				const res = await fetch(`${BaseUrl}/api/user/profile_info`, {
					method: "POST",
          credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
    },
    onSuccess: ()=>{
      toast.success("Profile updated successfully")
      Promise.all([
        queryclient.invalidateQueries({queryKey:["authUser"]}),
        queryclient.invalidateQueries({queryKey:["userProfile"]})
      ])
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })

  return {updateProfile, isUpdatingProfile}
}

export default useUpdateuserProfile