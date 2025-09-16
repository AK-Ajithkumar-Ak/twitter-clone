import { Navigate, Route, Routes } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { BaseUrl } from "./utils/constant"

import HomePage from "./pages/home/HomePage"
import Loginpage from "./pages/auth/Loginpage"
import Signuppage from "./pages/auth/Signuppage"
import Notificationpage from "./pages/notification/Notificationpage"
import Profilepage from "./pages/profile/Profilepage"
import Loadingspinner from "./components/common/Loadingspinner"

import Sidebar from "./components/common/Sidebar"
import Rightpanel from "./components/common/Rightpanel"

function App() {
  const {data: authUser, isLoading, isError, error}= useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey:["authUser"],
    queryFn: async () => {
      try {
        const res =await fetch(`${BaseUrl}/api/auth/me`,{
          method:"get",
          credentials:"include",
        })
        const data= await res.json()

        // if (res.error) return null
        if (data.error) {
          return null
        }
        if (!res.ok) {
          throw new Error(res.error || "Something went wrong");
        }
        // console.log("authUser is here: ", data);
        return data
      } catch (error) {
        throw error
      }
    },
    retry: false,
  })

  
if (isLoading) {
  return (
    <div className='h-screen flex justify-center items-center'>
				<Loadingspinner size='lg' />
			</div>
  )
}
if (isError) {
  console.log("main app error:", error);
}
  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* <h1 className="text-red-400 font-bold">ok</h1> */}
			{/* Common component, it's not wrapped with Routes */}
      {/* <h1 className="text-4xl font-bold text-blue-600 text-center mt-10">Hello, Tailwind!</h1> */}
      {authUser && <Sidebar />}
      <Routes>
        <Route path="/" element={authUser? <HomePage />: <Navigate to={"/login"}/>}/>
        <Route path="/login" element={!authUser? <Loginpage />: <Navigate to={"/"}/>}/>
        <Route path="/signup" element={!authUser? <Signuppage />: <Navigate to={"/"}/>}/>
        <Route path="/notifications" element={authUser? <Notificationpage />: <Navigate to={"/login"}/>}/>
        <Route path="/profile/:username" element={authUser? <Profilepage />: <Navigate to={"/login"}/>}/>
      </Routes>
      {authUser && <Rightpanel />}
      <Toaster />
    </div>
  )
}

export default App
