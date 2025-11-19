export async function GET() {
  return Response.json({
    starter: process.env.STRIPE_PRICE_STARTER ?? null,
    professional: process.env.STRIPE_PRICE_PROFESSIONAL ?? null,
    intensive: process.env.STRIPE_PRICE_INTENSIVE ?? null,
    secretKeyExists: !!process.env.STRIPE_SECRET_KEY,
  });
}
