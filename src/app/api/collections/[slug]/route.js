import getLoggedUser from "../../../../data/Auth";
import connectDb from "../../../../lib/connectDb";
import Collection from "../../../../models/collectionModel";

export async function GET(request, { params }) {
    const user = await getLoggedUser()

    if (user instanceof Response) {
        return user;
    }

    const { slug } = await params;

    try {
        await connectDb()

        const collection = await Collection.findOne({ name: slug.replace("-"," "), userId: user.id }).select('-userId -_id -__v')
        console.log(collection)

        if (!collection) {
            return Response.json({ error: 'No collection found' }, { status: 404 })
        }

        return Response.json(collection, { status: 200 })
    }
    catch (err) {
        return Response.json({ error: 'Something went wrong' }, { status: 400 })
    }
}