'use client'
import Input from "@/components/ui/Input";
import { useActionState, useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import userAction from "@/action/userAction";
import { useRouter } from "next/navigation";



export default function SignUp() {
    const [hide, setHide] = useState(true)
    const [error, setError] = useState()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const router = useRouter()
    const [ state, formAction, isPending ] = useActionState(userAction, { success: false })


    useEffect(() => {
        if (state?.success) {
            return router.push('/login')
        } else {
            return setError(state?.errors)
        }
    }, [state])


    const handleActionState = (formData) => {

        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }

        formAction(userData)
    }


    return (
        <div className="flex justify-center mt-10 items-center h-[calc(100vh-4.1rem)]">
            <div className="bg-[#0B1220] border rounded-md border-[#1F2937]  px-7 py-6 w-full max-w-md">
                <h1 className="text-xl text-center text-white mb-1 font-semibold">Create Your DevHub Account</h1>
                <p className="text-center text-sm text-gray-400">
                    Join DevHub and boost your productivity.
                </p>
                <form action={handleActionState} className="flex flex-col gap-3 mt-5">

                    <Input error={state?.errors ? error?.name : ''}
                        value={name}
                        name="name"
                        id={"name"}
                        type={"text"}
                        placeholder={"Your name"}
                        onChange={(e) => setname(e.target.value)}
                        label={"Full Name"} />

                    <Input error={state?.errors ? error?.email : ''}
                        value={email}
                        name="email"
                        id={"email"}
                        type={"email"}
                        placeholder={"you@example.com"}
                        onChange={(e) => setemail(e.target.value)}
                        label={"Email address"} />

                    <div className="relative">
                        <Input error={state?.errors ? error?.password : ''}
                            value={password}
                            name="password"
                            id={"password"}
                            type={hide ? 'password' : 'text'}
                            placeholder={"Create a strong password"}
                            onChange={(e) => setpassword(e.target.value)}
                            label={"Password"} />
                        <button type="button" onClick={() => setHide(!hide)} className="absolute top-9 text-slate-400 right-3">{
                            hide ? <IoMdEyeOff size={18} /> : < IoMdEye size={18} />
                        }
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-10 w-full cursor-pointer rounded-md border
                      border-[#1F2937] text-[16px] text-white bg-violet-600 hover:bg-violet-500 transition-colors duration-200">
                        Sign Up
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
                        <button className="flex justify-center items-center gap-3 h-10 w-full rounded-md border border-[#1F2937] bg-[#0B1220] hover:bg-[#111827] text-sm text-white transition-all duration-500"><ImGithub size={18} /> Github</button>
                        <button className="flex justify-center items-center gap-3 h-10 w-full rounded-md border border-[#1F2937] hover:bg-[#111827] bg-[#0B1220] text-sm text-white transition-all duration-500"><FcGoogle size={20} /> Google</button>
                    </div>
                    <div className="flex justify-center text-slate-500 gap-1 mt-2.5 text-sm">
                        <span>Already have an account?</span>
                        <Link className="text-violet-600" href="/login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
