import connectDb from '@/lib/connectDb'
import { Session } from '@/models/sessionModel'
import { User } from '@/models/userModels'
import { createHmac } from 'crypto'
import { cookies } from 'next/headers'


export default async function getLoggedUser() {
    const cookieStore = await cookies()
    const [sessionId, signatureFromCookies] = cookieStore.get('userId')?.value.split('.') || []

    const errorResponse = Response.json(
        { error: 'Please Login' },
        { status: 401 }
    )

    if (!sessionId) {
        return errorResponse
    }

    const ver = verifyCookie(sessionId, signatureFromCookies);

    if (!ver) {
        return errorResponse
    }

    await connectDb()

    const session = await Session.findById(sessionId)

    if (session) {
        const AllSession = await Session.find({ userId: sessionId })

        if (AllSession.length === 3) {
            const id = AllSession[0].id
            await Session.findByIdAndDelete(id)
        }
    }

    if (!session) {
        return errorResponse
    }

    const user = await User.findById(session.userId).select('-password')

    if (!user) {
        return errorResponse
    }

    return user

}



export const signedCookie = (sessionId) => {
    const signature = createHmac('sha256', process.env.COOKIE_SECRET).update(sessionId).digest('hex')

    return `${sessionId}.${signature}`
}

export const verifyCookie = (sessionId, signatureFromCookies) => {
    const [id, signature] = signedCookie(sessionId).split('.');

    if (signature !== signatureFromCookies) {
        return false
    }

    return true
}
