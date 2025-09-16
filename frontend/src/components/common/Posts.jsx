import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import PostSkeleton from "../skeletons/PostSkeleton"
import Post from "./Post"
import { BaseUrl } from "../../utils/constant"

const Posts = ({feedType, username, userId, postlikelength= ()=>{}}) => { 
  // ()=>{} default beacuse not throwing typeerror This is not a function, why error > This component call two different parent component 
  // one parent component passing one props and another parent component parsing 4 props then throw postlikelength is not function Because one component does not define & pass this function
  
  const getPostEndpoint= ()=>{
    switch (feedType) {
      case "forYou":
        return "/api/post/all";
      case "following":
        return "/api/post/following";
      case "posts":
        return `/api/post/user/${username}`;
      case "likes":
        return `/api/post/likes/${userId}`
      default:
        return "/api/post/all"
    }
  }
    const POST_ENDPOINT= getPostEndpoint()

    const {data: posts, isLoading, refetch, isRefetching,}= useQuery({
      queryKey:['posts'],     // posts key first time create
      queryFn: async () => {
        try {
          const res= await fetch(`${BaseUrl}${POST_ENDPOINT}`,{
            method:"get",
            credentials: "include",
          })
          const data= await res.json()
          if (!res.ok) {
	  				throw new Error(data.error || "Something went wrong");
	  			}
          
          if ( typeof postlikelength ==="function" && feedType== "posts"|| "likes" ) {
                postlikelength(data.length)
          }
          return data
        } catch (error) {
          console.log(error);
          throw error
        }
      },
    })

    useEffect(()=>{
      refetch()
/*       Array.length
      console.log(posts.length);
      if (!isLoading && !isRefetching && feedType== "posts"|| "likes") {
          console.log("postslen:", posts.length);
          postlikelength(posts?.length)
      } */
      
    }, [feedType, refetch, username])

  return (
    <>
    {(isLoading || isRefetching) && (
      <div className='flex flex-col justify-center'>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    )}
    {!isLoading && !isRefetching && posts?.length === 0 && (
      <p className='text-center my-4'>No posts in this tab. Switch 👻</p>
    )}
    {!isLoading && !isRefetching && posts && (
      <div>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    )}
  </>
  )
}

export default Posts