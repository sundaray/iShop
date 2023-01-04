import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { sessionId } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json({ session });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
