import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'orders.json');

function readOrders() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(orders, null, 2), 'utf-8');
}

export async function GET(req) {
  const orders = readOrders();
  return new Response(JSON.stringify(orders), { status: 200 });
}

export async function POST(req) {
  // allow public POSTs (customers place orders) — no token required
  const body = await req.json();
  const orders = readOrders();
  const newOrder = { ...body, id: Date.now().toString(), date: new Date().toISOString() };
  orders.push(newOrder);
  writeOrders(orders);
  return new Response(JSON.stringify(newOrder), { status: 201 });
}

export async function DELETE(req) {
  // protect delete behind token
  const token = req.headers.get('x-admin-token') || process.env.ADMIN_API_TOKEN || 'devtoken';
  if (token !== (process.env.ADMIN_API_TOKEN || 'devtoken')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  const orders = readOrders();
  const filtered = orders.filter(o => o.id !== id);
  writeOrders(filtered);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
