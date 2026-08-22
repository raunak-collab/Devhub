import getLoggedUser from "@/data/Auth";
import { FavouritesTools } from "@/models/favouritesToolsModel";


export async function GET() {
    const user = await getLoggedUser()

    if (user instanceof Response) {
        return user
    }

    const favouritesToolsData = await FavouritesTools.find({ userId: user.id })
   

    if (!favouritesToolsData.length) {
        return Response.json({ error: 'No Tools found' }, { status: 404 })
    }

    return Response.json(favouritesToolsData, { status: 201 })

}
