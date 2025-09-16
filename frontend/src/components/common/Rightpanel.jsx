import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import Loadingspinner from "./Loadingspinner";
import useFollow from "../../hooks/useFollow";
import { BaseUrl } from "../../utils/constant";

function Rightpanel() {
    const {data: suggestedUsers, isLoading}= useQuery({
        queryKey:['suggestedUsers'],  // queryKey to give a unique name to our query and refer to it later
        queryFn: async () => {
            try {
                const res = await fetch(`${BaseUrl}/api/user/suggested`,{
					method:"get",
					credentials: "include",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return data;
            } catch (error) {
                throw error
            }
        }
    })
    const { follow, isPending } = useFollow();

    if (suggestedUsers?.length===0) return <div className='md:w-64 w-0'></div>;
  return (
    <div className='hidden lg:block my-4 mx-2'>
		<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
			<p className='font-bold'>Who to follow</p>
			<div className='flex flex-col gap-4'>
				{/* item */}
				{isLoading && (
					<>
						<RightPanelSkeleton />
						<RightPanelSkeleton />
						<RightPanelSkeleton />
						<RightPanelSkeleton />
					</>
				)}
				{!isLoading &&
					suggestedUsers?.map((user) => (
						<Link
							to={`/profile/${user.username}`}
							className='flex items-center justify-between gap-4'
							key={user._id}
						>
							<div className='flex gap-2 items-center'>
								<div className='avatar'>
									<div className='w-8 rounded-full'>
										<img src={user.profileimg || "/avatar-placeholder.png"} />
									</div>
								</div>
								<div className='flex flex-col'>
									<span className='font-semibold tracking-tight truncate w-28'>
										{user.fullName}
									</span>
									<span className='text-sm text-slate-500'>@{user.username}</span>
								</div>
							</div>
							<div>
								<button
									className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
									onClick={(e) => {
										e.preventDefault();
										follow(user._id);
									}}
								>
									{isPending ? <Loadingspinner size='sm' /> : "Follow"}
								</button>
							</div>
						</Link>
					))}
			</div>
		</div>
	</div>
  )
}

export default Rightpanel