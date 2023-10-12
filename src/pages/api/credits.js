import { prisma } from "../../../server/db/client"


export default async function handler(req, res) {
    const {method} = req
    // const {userID, login, firstName, lastName, email, password} = req.body

    switch(method){
        case 'POST':
            // const newID = await prisma.user.count + 1
            console.log(req.body)
            const {userID, creditAmount, currency, creditDuration, interestRate, depositAmount, fixPaidAmount, createdAt, userLogin} = req.body
            const post = await prisma.creditsList.create({
                data: {
                    userID,
                    creditAmount,
                    currency,
                    creditDuration,
                    interestRate,
                    depositAmount,
                    fixPaidAmount,
                    createdAt,
                    userLogin
                }
            })
            // console.log(newID)
            res.status(201).json(post)
            break
        default:
            res.setHeader("Allow", ['POST'])
            res.status(405).end(`Method ${method} Now Allowed`)
    }
}