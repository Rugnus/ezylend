import { prisma } from "../../../server/db/client"

export default async function handler(req, res) {
    const {method} = req

    switch(method){
        case 'POST':
            const {userName, email} = req.body
            const post = await prisma.userlist.create({
                data: {
                    userName,
                    email,
                }
            })
            res.status(201).json(userlist)
            break
        default:
            res.setHeader("Allow", ['POST'])
            res.status(405).end(`Method ${method} Now Allowed`)
    }

}