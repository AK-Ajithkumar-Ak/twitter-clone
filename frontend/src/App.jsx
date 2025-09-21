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
import { Technical_skill } from "./pages/Technical_skill"
import { useState } from "react"

function App() {
  let [viewskill, setviewskill] = useState(false)
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
  console.log("main app error:", error.message);
}

  return (
    <div>
    <div className='flex max-w-6xl mx-auto'>
			{/* Common component, it's not wrapped with Routes */}
      {authUser && !viewskill && <Sidebar setviewskill={setviewskill} />}
      <Routes>
        <Route path="/" element={authUser? <HomePage setviewskill={setviewskill} />: <Navigate to={"/login"}/>}/>
        <Route path="/login" element={!authUser? <Loginpage />: <Navigate to={"/"}/>}/>
        <Route path="/signup" element={!authUser? <Signuppage />: <Navigate to={"/"}/>}/>
        <Route path="/notifications" element={authUser? <Notificationpage setviewskill={setviewskill} />: <Navigate to={"/login"}/>}/>
        <Route path="/profile/:username" element={authUser? <Profilepage setviewskill={setviewskill}/>: <Navigate to={"/login"}/>}/>
        <Route path="/ajith-kumar/technical-skill" element={<Technical_skill setviewskill={setviewskill}/>}/>
      </Routes>
      {authUser &&  !viewskill && <Rightpanel />}
      <Toaster />
    </div>
      {/* <Routes>
        <Route path="/ajith-kumar/technical-skill" element={<Technical_skill setviewskill={setviewskill}/>}/>
      </Routes> */}
    </div>
  )
}

export default App
