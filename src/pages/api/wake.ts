import { PrismaClient, ShorLink } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import GenericResponseModel from "../../models/GenericResponseModel";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    const data = await prisma.shorLink.findFirst();

    if (!data) {
        res.setHeader("Cache-Control", "s-maxage=10000000000000, stale-while-revalidate=59")
        res.statusCode = 404;
        let resp: GenericResponseModel = {
            Codigo: "02",
            Descripcion: "Slug No encontrado"
        };
        res.json(resp);
        return;
    }

    return res.json(data.slug);


}