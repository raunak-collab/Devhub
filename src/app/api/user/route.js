import getLoggedUser from "../../../data/Auth";


export async function GET() {

    const user = await getLoggedUser()

    if (user instanceof Response) {
        return user
    }

    return Response.json(user)
}
