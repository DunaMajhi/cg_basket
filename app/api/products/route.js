import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'products.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeProducts(products) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

export async function GET(req) {
  const products = readProducts();
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  // simple token auth for mutating routes
  const token = req.headers.get('x-admin-token') || process.env.ADMIN_API_TOKEN || 'devtoken';
  if (token !== (process.env.ADMIN_API_TOKEN || 'devtoken')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const products = readProducts();
  const newProduct = { ...body, _id: Date.now().toString() };
  products.push(newProduct);
  writeProducts(products);
  return new Response(JSON.stringify(newProduct), { status: 201 });
}

export async function PUT(req) {
  const token = req.headers.get('x-admin-token') || process.env.ADMIN_API_TOKEN || 'devtoken';
  if (token !== (process.env.ADMIN_API_TOKEN || 'devtoken')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  if (!body?._id) return new Response('Missing _id', { status: 400 });
  const products = readProducts();
  const idx = products.findIndex(p => p._id === body._id);
  if (idx === -1) return new Response('Not found', { status: 404 });
  products[idx] = { ...products[idx], ...body };
  writeProducts(products);
  return new Response(JSON.stringify(products[idx]), { status: 200 });
}

export async function DELETE(req) {
  const token = req.headers.get('x-admin-token') || process.env.ADMIN_API_TOKEN || 'devtoken';
  if (token !== (process.env.ADMIN_API_TOKEN || 'devtoken')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  const products = readProducts();
  const filtered = products.filter(p => p._id !== id);
  writeProducts(filtered);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
