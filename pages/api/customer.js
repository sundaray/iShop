import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;

  console.log(session_id);

  if (req.method === "GET") {
    try {
      const { name } = await stripe.customers.retrieve(session_id);

      res.status(200).json({ name });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).json({ message: "Method not allowed" });
  }
}
