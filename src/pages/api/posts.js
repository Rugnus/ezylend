import { prisma } from "../../../server/db/client"

function titleFromCode(code) {
    return code.trim().split('\n')[0].replace('// ', '')
}

export default async function handler(req, res) {
    const {method} = req

    switch(method){
        case 'POST':
            const {language, code} = req.body
            const title = titleFromCode(code)
            const post = await prisma.post.create({
                data: {
                    title,
                    language,
                    code,
                }
            })
            res.status(201).json(post)
            break
        case 'GET':
            try {
                const data = await prisma.post.findMany()
                return res.status(200).json(data)
            } catch (error) {
                return res.status(500).json(error)
            }
        default:
            res.setHeader("Allow", ['POST', 'GET'])
            res.status(405).end(`Method ${method} Now Allowed`)
    }

}