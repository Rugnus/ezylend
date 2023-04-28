// import mysql from "mysql2/promise";

// export default function handler(req, res) {
//     const dbconnection = await.mysql.createConnection({
//         host: process.env.MYSQL_HOST,
//         database: process.env.MYSQL_DATABASE,
//         port: process.env.MYSQL_PORT,
//         user: process.env.MYSQL_USER,
//         password: process.env.MYSQL_PASSWORD,
//         acquireTimeout: 1000000,
//         socketPath: "/var/run/mysqld/mysqld.sock",
//     });
//     try {
        
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
//     res.status(200).json({name: "John Doe"});
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const data = await prisma.post.findMany
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}



