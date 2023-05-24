import { prisma } from "../../../server/db/client"


export default async function handler(req, res) {
    const {method} = req

    switch(method){
        case 'POST':
            const newID = await prisma.user.count + 1
            const {userID, login, firstName, lastName, email, password} = req.body
            const post = await prisma.user.create({
                data: {
                    userID,
                    login,
                    firstName,
                    lastName,
                    email,
                    password
                }
            })
            console.log(newID)
            res.status(201).json(post)
            break
        default:
            res.setHeader("Allow", ['POST'])
            res.status(405).end(`Method ${method} Now Allowed`)
    }
}