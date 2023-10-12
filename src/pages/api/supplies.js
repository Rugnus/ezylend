import { prisma } from "../../../server/db/client"


export default async function handler(req, res) {
    const {method} = req
    console.log("Прошел")
    switch(method){
        case 'POST':
            const {supplyID, userID, supplyAmount, currency, createdAt} = req.body
            const supplyBTCAPY = "1.5"
            const supplyETHAPY = "3.2%"
            const supplyUSDTAPY = "1.78%"
            const hasCurrencyBTCCount = await prisma.activeSupplies.count({where: {currency: "BTC"}})
            const hasCurrencyBTC = await prisma.activeSupplies.findMany({where: {currency: "BTC"}})
            console.log(hasCurrencyBTC)
            const hasCurrencyETH = await prisma.activeSupplies.findMany({where: {currency: "ETH"}})
            const hasCurrencyETHCount = await prisma.activeSupplies.count({where: {currency: "ETH"}})
            const hasCurrencyUSDT = await prisma.activeSupplies.findMany({where: {currency: "USDT"}})
            const hasCurrencyUSDTCount = await prisma.activeSupplies.count({where: {currency: "USDT"}})
            if (hasCurrencyBTCCount >= 1 && currency == "BTC") {
                const updateSupply = await prisma.activeSupplies.update({
                    where: {
                        currency: "BTC"
                    },
                    data: {
                        supplyAmount: hasCurrencyBTC[0].supplyAmount + supplyAmount
                    }
                })
                res.status(201).json(updateSupply)
            } else if (hasCurrencyETHCount >= 1 && currency == "ETH") {
                const updateSupply = await prisma.activeSupplies.update({
                    where: {
                        currency: "ETH"
                    },
                    data: {
                        supplyAmount: hasCurrencyETH[0].supplyAmount + supplyAmount
                    }
                })
                res.status(201).json(updateSupply)
            } else if (hasCurrencyUSDTCount >= 1 && currency == "USDT") {
                const updateSupply = await prisma.activeSupplies.update({
                    where: {
                        currency: "USDT"
                    },
                    data: {
                        supplyAmount: hasCurrencyUSDT[0].supplyAmount + supplyAmount
                    }
                })
                res.status(201).json(updateSupply)
            } else if (currency == 'BTC'){
                const post = await prisma.activeSupplies.create({
                    data: {
                        supplyID,
                        userID,
                        supplyAmount,
                        currency,
                        createdAt,
                        APY: supplyBTCAPY
                    }
                })
                res.status(201).json(post)
            }
            else if (currency == 'ETH'){
                const post = await prisma.activeSupplies.create({
                    data: {
                        supplyID,
                        userID,
                        supplyAmount,
                        currency,
                        createdAt,
                        APY: supplyETHAPY
                    }
                })
                res.status(201).json(post)
            }
            else if (currency == 'USDT'){
                const post = await prisma.activeSupplies.create({
                    data: {
                        supplyID,
                        userID,
                        supplyAmount,
                        currency,
                        createdAt,
                        APY: supplyUSDTAPY
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