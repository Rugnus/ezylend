import { prisma } from "../../../server/db/client"

export default async function handler(req, res) {
    const {method} = req
    const {userID, email, walletAdress, role, sentAt, userLogin} = req.body

    switch(method){
        case 'POST':
            const appls = await prisma.creditorApplications
            console.log("applications: " + appls)
            // console.log(email)
            const post = await prisma.creditorApplications.create({
                data: {
                    userID,
                    email,
                    walletAdress,
                    role,
                    sentAt,
                    userLogin
                }
            })
            res.status(201).json(post)
            break
        case 'DELETE':
            console.log("delete userid is " + userID)
            const drop = await prisma.creditorApplications.delete({
                where: {
                    userID: userID
                }
            })
            console.log(drop)
        case 'PUT':
            console.log("Userid is " + userID)
            // const {currUserID} = req.body
            // console.log(currUserID)
            const result = await prisma.user.update({
                where: {
                    userID: userID,
                },
                data: {
                    role: "Creditor",
                },
            })
            res.json(result)
        default:
            res.setHeader("Allow", ['POST', 'PUT'])
            res.status(405).end(`Method ${method} Now Allowed`)
    }
}