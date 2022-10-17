import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { image } = req.query;
    fetch(image.toString())
        .then((res) => res.blob())
        .then((blob) => {
            res.setHeader("Content-Type", blob.type);
            blob.arrayBuffer().then((buffer) => {
                res.send(Buffer.from(buffer));
            });
        });
}
