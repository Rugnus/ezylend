import { prisma } from "../../../server/db/client"


export default async function handler(req, res) {
    const {method} = req
    const {userID, login, firstName, lastName, email, password} = req.body

    switch(method){
        case 'POST':
            const newID = await prisma.user.count + 1
            const {userID, login, firstName, lastName, email, password} = req.body
            console.log(login)
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
        case 'PUT':
            console.log(req.body.userID)
            // console.log(getUserID + walletAdress)
            const result = await prisma.user.update({
                where: {userID: req.body.userID},
                data: {walletAdress: req.body.walletAdress},
            })
            res.json(result)
        default:
            res.setHeader("Allow", ['POST', 'PUT'])
            res.status(405).end(`Method ${method} Now Allowed`)
    }
}