import { prisma } from "../../../server/db/client"


export default async function handler(req, res) {
    const {method} = req
    console.log("Прошел")
    switch(method){
        case 'POST':
            const {supplyID, userID, supplyAmount, currency, createdAt} = req.body
            const hasCurrencyBTC = await prisma.activeSupplies.findMany({where: {currency: "BTC"}})
            console.log(hasCurrencyBTC)
            console.log(hasCurrencyBTC[0].supplyAmount)
            const hasCurrencyETH = await prisma.activeSupplies.findMany({where: {currency: "ETH"}})
            const hasCurrencyUSDT = await prisma.activeSupplies.findMany({where: {currency: "USDT"}})
            if (hasCurrencyBTC && currency == "BTC") {
                const updateSupply = await prisma.activeSupplies.update({
                    where: {
                        currency: "BTC"
                    },
                    data: {
                        supplyAmount: hasCurrencyBTC[0].supplyAmount + supplyAmount
                    }
                })
                res.status(201).json(updateSupply)
            } else if (hasCurrencyETH && currency == "ETH") {
                const updateSupply = await prisma.activeSupplies.update({
                    where: {
                        currency: "ETH"
                    },
                    data: {
                        supplyAmount: hasCurrencyETH[0].supplyAmount + supplyAmount
                    }
                })
                res.status(201).json(updateSupply)
            } else if (hasCurrencyUSDT && currency == "USDT") {
                const updateSupply = await prisma.activeSupplies.update({
                    where: {
                        currency: "USDT"
                    },
                    data: {
                        supplyAmount: hasCurrencyUSDT[0].supplyAmount + supplyAmount
                    }
                })
                res.status(201).json(updateSupply)
            } else {
                const post = await prisma.activeSupplies.create({
                    data: {
                        supplyID,
                        userID,
                        supplyAmount,
                        currency,
                        createdAt
                    }
                })
                res.status(201).json(post)
            }
            
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