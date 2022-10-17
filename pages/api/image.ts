import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { image } = req.query;
    fetch(image.toString(), {})
        .then((res) => res.blob())
        .then((blob) => {
            res.setHeader("Content-Type", blob.type);
            //  res.setHeader("Access-Control-Allow-Origin", "*");
            // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            // res.setHeader("Access-Control-Allow-Credentials", "true");
            blob.arrayBuffer().then((buffer) => {
                res.send(Buffer.from(buffer));
                console.log("blob", blob);
            });
        })
        .catch((err) => console.log("error message,", err));
}
