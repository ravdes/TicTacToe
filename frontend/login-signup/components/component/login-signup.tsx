"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios, { AxiosError } from 'axios';
import {useRouter} from "next/navigation";
import {Toaster, toast} from "sonner";

interface ErrorResponse {
  message?: string;
}
export function LoginSignup() {

  const router = useRouter();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mail, setMail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSignUpButton = async (event : React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080/registration', {
        "username": username,
        "email": mail,
        "password": password
      })
      if (response.status == 200) {
        toast.success(response.data)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {

        // @ts-ignore
        toast.error(axiosError.response.data);
      }
    }

  }

  const handleLoginButton = async (event : React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post("http://localhost:8080/login", {
        "email": mail,
        "password": password
      });
      if (response.status == 200) {
        toast.success(response.data)
        router.push('/account');
      }

    } catch(error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {

        // @ts-ignore
        toast.error(axiosError.response.data);
      }






    }
  }



  return (
    <div className="flex min-h-screen items-center justify-center bg-[#8c7ae6]">
      <Toaster richColors/>
      <div className="w-full max-w-md space-y-8">
        {isSignUp ? (
          <div className="rounded-lg border bg-[#f1f1f1] p-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Sign Up</h2>
              <p className="text-muted-foreground">Enter your details to create an account</p>
            </div>
            <form className="mt-6 space-y-4">
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="username" type="text" placeholder="Username" className="pl-10" value={username} onChange={(e) => setUsername(e.target.value)}
                    />
              </div>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Email" className="pl-10" value={mail} onChange={(e) => setMail(e.target.value)
                }/>
              </div>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="Password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <Button type="submit" className="bg-black text-white w-full" onClick={handleSignUpButton}>
                Sign Up
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={() => setIsSignUp(false)}
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border bg-[#f1f1f1] p-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Login</h2>
              <p className="text-muted-foreground">Enter your email and password to login</p>
            </div>
            <form className="mt-6 space-y-4">
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Email" className="pl-10" value={mail} onChange={(e) => setMail(e.target.value)}/>
              </div>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="Password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <Button type="submit" className="bg-black text-white w-full" onClick={handleLoginButton}>
                Login
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}


function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
