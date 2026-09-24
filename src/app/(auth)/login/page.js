"use client"
import Input from "../../../components/ui/Input";
import { useActionState, useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { loginAction } from "../../../action/userAction";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { googleLogin, githubLogin } from "../../../action/authAction";

export default function SignIn() {
    const [hide, setHide] = useState(true)
    const [error, seterror] = useState()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const router = useRouter()
    const { login } = useAuth()
    const [state, formAction, isPending] = useActionState(loginAction, { success: false })

    useEffect(() => {
        if (state?.success) {
            login(state.user)
            return router.push('/dashboard')
        } else {
            return seterror(state?.errors)
        }
    }, [state])

    const handleActionState = (formData) => {

        const userData = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        formAction(userData)
    }


    return (

        <div className="flex justify-center items-center h-[calc(100vh-4.1rem)]">
            <div className="bg-[#0B1220] border rounded-md border-[#1F2937] px-7 py-6 w-full max-w-md">
                <h1 className="text-xl text-center text-white mb-1 font-semibold">Sign in to DevHub</h1>
                <p className="text-center text-sm text-gray-400">
                    Access your developer tools and resources.
                </p>
                <form action={handleActionState} className="flex flex-col gap-3 mt-5">
                    <Input
                        name='email'
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="Enter your email address"
                        label="Email"
                        error={state?.errors ? error?.email : ''}
                    />
                    <div className="relative">
                        <Input
                            name='password'
                            id="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            type={hide ? 'password' : 'text'}
                            placeholder="Enter your password"
                            label="Password"
                            error={state?.errors ? error?.password : ''}
                        />
                        <button type="button"
                            onClick={() => setHide(!hide)}
                            className="absolute top-9 text-slate-400 right-3">
                            {
                                hide ? <IoMdEyeOff size={18} /> : < IoMdEye size={18} />
                            }
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-10 w-full rounded-md border
                      border-[#1F2937] text-[16px]
                       text-white bg-violet-600
                        hover:bg-violet-500 transition-colors
                         duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                {/* Success and error*/}
                {state?.success ? <p className="text-green-300 text-center pt-3">{state?.message}</p> :
                    <p className="text-red-500 text-center pt-2">{state?.error}</p>}
                <div className="mt-3">
                    <div className="flex items-center my-5">
                        <div className="flex-1 h-px bg-[#1F2937]" />
                        <span className="px-4 text-sm text-slate-500">
                            Or continue with
                        </span>
                        <div className="flex-1 h-px bg-[#1F2937]" />
                    </div>
                    <div className="flex gap-1.5">
                        {/* Github login */}
                        <form
                            className="h-10 flex justify-center items-center text-sm text-white transition-all duration-500 w-full rounded-md border border-[#1F2937] bg-[#0B1220] hover:bg-[#111827]"
                            action={githubLogin}
                        >
                            <button type="submit" className="flex gap-3">
                                <ImGithub size={19} />
                                Github
                            </button>
                            {/* Google login */}
                        </form>
                        <form
                            className="h-10 flex justify-center items-center text-sm text-white transition-all duration-500 w-full rounded-md border border-[#1F2937] hover:bg-[#111827] bg-[#0B1220]"
                            action={googleLogin}
                        >
                            <button type="submit" className="flex gap-3">
                                <FcGoogle size={21} />
                                Google
                            </button>
                        </form>

                    </div>
                    <div className="flex justify-center text-slate-500 gap-1 mt-2.5 text-sm">
                        <span>Don&apos;t have an account?</span>
                        <Link className="text-violet-600" href="/signup">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
