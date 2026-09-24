'use server'

import connectDb from "../lib/connectDb"
import { loginSchema, registerSchema } from "../lib/schema/userSchema"
import { User } from "../models/userModels"
import z from "zod"
import bcrypt from "bcrypt"
import { Session } from "../models/sessionModel"
import { cookies } from "next/headers"
import getLoggedUser, { signedCookie } from "../data/Auth"
import { SavedTools } from "../models/savedToolsModel"
import { FavouritesTools } from "../models/favouritesToolsModel"
import Collection from "../models/collectionModel"
import oAuthUser from "./authAction"
import { signOut } from "../auth"


export default async function registerAction(_, formData) {

    const { success, data, error } = registerSchema.safeParse(formData)

    if (!success) {
        return { errors: z.flattenError(error).fieldErrors }
    }

    const userData = data

    await connectDb()

    try {
        const { name, email, password } = userData
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            email,
            password: hashedPassword
        })

        return { success: true, message: "Registered Successfully ✅" }
    }
    catch (err) {
        console.log(err)
        if (err.code === 11000) {
            return {
                error: 'Email already exists'
            }
        }
        else {
            return {
                error: 'Something went wrong!'
            }
        }
    }

}


export async function loginAction(_, formData) {
    const cookieStore = await cookies()
    const { success, data, error } = loginSchema.safeParse(formData)

    if (!success) {
        return { errors: z.flattenError(error).fieldErrors }
    }

    await connectDb()

    const userData = data

    try {
        const { email, password } = userData;
        const user = await User.findOne({ email })

        if (!user) {
            return {
                errors: {
                    email: 'Email does not exists.'
                }
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return {
                errors: {
                    password: 'Password is incorrect!'
                }
            }
        }

        const session = await Session.create({ userId: user.id })

        const userId = signedCookie(session.id)
        cookieStore.set('userId', userId, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        })


        return { success: true, message: 'Login Successfully ✅', user: user.name }

    }
    catch (err) {
        console.log(err)
        return {
            error: 'Something went wrong!'
        }
    }

}


export async function logoutAction() {
    await connectDb()

    const cookieStore = await cookies()
    const cookie = cookieStore.get('userId')

    const response = { success: true, message: 'Logout Successfully!' }

    if (!cookie) {
        return response
    }

    const sessionId = cookie.value?.split('.')[0]

    await Session.findByIdAndDelete(sessionId)

    cookieStore.delete('userId')

    return response
}


export async function toggleSavedToolsAction(title) {
    const user = await getLoggedUser()

    if (user instanceof Response) {
        console.log(user)
        return { status: user.status }
    }

    await connectDb()

    try {

        const findTools = await SavedTools.findOne({ userId: user.id, title })

        if (findTools) {
            await SavedTools.deleteOne(findTools)
            return { success: true, message: 'UnSaved Tools Successfully ✅' }
        }

        await SavedTools.create({
            title,
            userId: user.id
        })

        return { success: true, message: 'Saved Tools Successfully ✅' }
    }
    catch (err) {
        console.log(err)
        return { success: false }
    }
}


export async function toggleFavouriteToolsAction(title) {
    const user = await getLoggedUser()

    if (user instanceof Response) {
        console.log(user)
        return { status: user.status }
    }

    await connectDb()

    try {

        const findTools = await FavouritesTools.findOne({ userId: user.id, title })

        if (findTools) {
            await FavouritesTools.deleteOne(findTools)
            return { success: true, message: 'UnSaved Tools Successfully ✅' }
        }

        await FavouritesTools.create({
            title,
            userId: user.id
        })

        return { success: true, message: 'Saved Tools Successfully ✅' }
    }
    catch (err) {
        console.log(err)
        return { success: false }
    }
}


export async function createCollectionAction(name, desc, selectedicon, selectedTools) {

    const user = await getLoggedUser()

    if (user instanceof Response) {
        console.log(user)
        return { status: user.status }
    }

    await connectDb();

    try {
        await Collection.create({
            userId: user.id,
            name,
            desc,
            icon: {
                name: selectedicon.name,
                color: selectedicon.color,
            },
            tools: selectedTools
        })

        return { success: true, message: 'Collection Created Successfully ✅' }

    }
    catch (err) {
        console.log(err)
        return { success: false, error: 'Something went Wrong!' }
    }
}