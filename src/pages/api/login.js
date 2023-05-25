import { prisma } from "../../../server/db/client";
// import { Users } from "../data/users";
export default async function handler(req, res) {
    const users = await prisma.user.findMany()
    const pUsers = JSON.parse(JSON.stringify(users))
    console.log("Parsed users: " + pUsers)
    // console.log(users)
    // const login = users?.map(user => user.email)
    // console.log(login)
    // const password = users?.map(user => user.password)
    // console.log(password)
    try {
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
        }
        const body = JSON.parse(JSON.stringify(req.body))
        // console.log("Fields values" + body.email + body.password)
        // const user = currUser
        //   console.log(user)
        // const user = await prisma.user.findUnique({
        //     where: {
        //       email: body.email,
        //       password: parseInt(body.password)
        //     },
        //   })
        // console.log(user.email)
        // const user = parsedUsers.find((user) => user.email === body.email && user.password === parseInt(body.password))
        // const user = users.find((user) => user.email === body.email && user.password === parseInt(body.password))
        // console.log(user.email)
        // console.log(user.password)
        const user = pUsers.find((user1) => user1.email === body.email && user1.password === body.password);
        console.log(user)
        // const users1 = users.forEach((user) => user.email === body.email && user.password === parseInt(body.password))
        // console.log("User: " + user)
        // console.log("User1: " + users1)
        if (!user) {
            res.status(404).send({ message: 'User does not exit!' })
            return
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(405).send({ message: `{error.message}` })
        return
    }
};

export async function getServerSideProps() {
    const users = await prisma.user.findMany()
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        }
    }
}

