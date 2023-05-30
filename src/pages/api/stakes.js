import { prisma } from "../../../server/db/client"


export default async function handler(req, res) {
    const {method} = req
    console.log("Прошел")
    switch(method){
        case 'POST':
            const newID = await prisma.activeStake.count + 1
            const {stakeID, userID, amount, startedAt, blockDuration, blockedUntil} = req.body
            const post = await prisma.activeStake.create({
                data: {
                    stakeID,
                    userID,
                    amount,
                    startedAt,
                    blockDuration,
                    blockedUntil
                }
            })
            res.status(201).json(post)
            break;
        // case 'PUT':
        //     console.log(req.body.userID)
        //     // console.log(getUserID + walletAdress)
        //     const result = await prisma.user.update({
        //         where: {userID: req.body.userID},
        //         data: {walletAdress: req.body.walletAdress},
        //     })
        //     res.json(result)
        default:
            res.setHeader("Allow", ['POST', 'PUT'])
            res.status(405).end(`Method ${method} Now Allowed`)
    }
}