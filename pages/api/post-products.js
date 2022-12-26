import prisma from "../../lib/prisma"

export default async function handler(req, res) {

    if (req.method === 'POST') {
        try {
            const {name, description, price, stockCount} = req.body;

            const product = await prisma.product.create(
                {
                    data: {name, description, price, stockCount}
                }
            )
            res.status(200).json(product);    
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({
            message:`HTTP method ${req.method} is not allowed.`
        })
    }
};