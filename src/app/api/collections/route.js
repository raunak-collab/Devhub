import getLoggedUser from "@/data/Auth";
import Collection from "@/models/collectionModel";

export async function GET() {
    const user = await getLoggedUser()

    if (user instanceof Response) {
        return user;
    }

    try {
        const collectionData = await Collection.find({ userId: user.id })

        if (!collectionData.length) {
            return Response.json({ error: 'No collection found' }, { status: 404 })
        }

        return Response.json(collectionData, { status: 200 })
    }
    catch (err) {
        return Response.json({ error: 'Something went wrong' }, { status: 400 })
    }
}

