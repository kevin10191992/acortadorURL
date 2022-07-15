import { PrismaClient, ShorLink } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import GenericResponseModel from "../../models/GenericResponseModel";

const prisma = new PrismaClient();

const slug = async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query["slug"];
    const ResponseJson = req.headers["response-json"];

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    if (!slug || typeof slug !== "string") {
        res.statusCode = 404;
        let resp: GenericResponseModel = {
            Codigo: "02",
            Descripcion: "Parametro invalido"
        };
        res.json(resp);
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
        res.setHeader("Cache-Control", "s-maxage=10000000000000, stale-while-revalidate=59")
        res.statusCode = 404;
        let resp: GenericResponseModel = {
            Codigo: "02",
            Descripcion: "Slug No encontrado"
        };
        res.json(resp);
        return;
    }

    if (!ResponseJson) {
        return res.redirect(data.url != null ? data.url : "");
    } else {
        return res.json(data);
    }



}

export default slug;