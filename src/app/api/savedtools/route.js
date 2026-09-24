import getLoggedUser from "../../../data/Auth";
import { SavedTools } from "../../../models/savedToolsModel";


export async function GET() {
    const user = await getLoggedUser()

    if (user instanceof Response) {
        return user
    }

    const savedToolsData = await SavedTools.find({ userId: user.id })

    if (!savedToolsData.length) {
        return Response.json({ error: 'No Tools found' }, { status: 404 })
    }

    return Response.json(savedToolsData, { status: 201 })
}
