import { CUSTOMERS } from "@/data/customers";

export async function GET() {
  return new Response(JSON.stringify(CUSTOMERS), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
