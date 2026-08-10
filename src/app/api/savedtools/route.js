import getLoggedUser from "@/data/Auth";
import { AllTools } from '../../AllTools'
import { SavedTools } from "@/models/savedToolsModel";


export async function GET() {
    const user = await getLoggedUser()

    if (user instanceof Response) {
        return user
    }

    const savedToolsData = await SavedTools.find({ userId: user.id })

    if (!savedToolsData) {
        return Response.json({ message: 'No Tools found' }, { status: 404 })
    }

    return Response.json(savedToolsData, { status: 201 })

}
