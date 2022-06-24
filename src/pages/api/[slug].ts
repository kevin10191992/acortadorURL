import { PrismaClient, ShorLink } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import GenericResponseModel from "../../models/GenericResponseModel";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string") {
        res.statusCode = 404;
        let resp: GenericResponseModel = {
            Codigo: "02",
            Descripcion: "Parametro invalido"
        };
        res.send(JSON.stringify(resp));
        return;
    }

    const data = await prisma.shorLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    });

    if (!data) {
        res.statusCode = 404;
        let resp: GenericResponseModel = {
            Codigo: "02",
            Descripcion: "Slug No encontrado"
        };
        res.send(JSON.stringify(resp));
        return;
    }

    return res.redirect(data.url != null ? data.url : "");




}