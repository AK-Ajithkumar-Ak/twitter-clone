import {Link} from 'react-router-dom';
import { useState } from "react";

import XSvg from '../../components/svgs/X';

import {MdOutlineMail} from 'react-icons/md';
import {FaUser} from 'react-icons/fa';
import {MdPassword} from 'react-icons/md';
import {MdDriveFileRenameOutline} from 'react-icons/md';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BaseUrl } from '../../utils/constant';


function Signuppage() {
    const [formData, setFormData]= useState({
        username:"",
        fullname:"",
        email:"",
        password:"",
    })

    const queryclient= useQueryClient()

    const {mutate: SignUP, isPending, isError, error}= useMutation({
        mutationFn: async ({email, username, fullname, password}) => {   // destructuring
            try {
                const res= await fetch(`${BaseUrl}/api/auth/signup`,{
                    method:"POST",
                    credentials: "include",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({email, username, fullname, password})
                })

                const data= await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Failed to create account");
                }
                console.log(data);
                return data
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        onSuccess: ()=>{
            toast.success("Account created successfully")
            queryclient.invalidateQueries({queryKey: ["authUser"]}) // After success message invalidate query and again fetch the query in querykey
        }
    })


    const handleSubmit= (e)=>{
        e.preventDefault()
        SignUP(formData)
    }
    const handleInputChange= (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

  return (
    <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<Link to={"/ajith-kumar/technical-skill"} className="btn btn-success absolute top-5 rounded-full ">Ajith kumar Technical skill</Link>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow '
								placeholder='Username'
								name='username'
								onChange={handleInputChange}
								value={formData.username}
							/>
						</label>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullname'
								onChange={handleInputChange}
								value={formData.fullname}
							/>
						</label>
					</div>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>
						{isPending ? "Loading..." : "Sign up"}
					</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-white text-lg '>Already have an account?</p>
					<Link to='/login'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>login in</button>
					</Link>
				</div>
			</div>
		</div>
  )
}

export default Signuppage