import { NextResponse } from "next/server";

const BASE_API_URL = "http://lang-courses.onrender.com/api/levels/";

export async function GET() {
  const res = await fetch(BASE_API_URL);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(BASE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const id = body.id;
  const res = await fetch(`${BASE_API_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const id = body.id;
  const res = await fetch(`${BASE_API_URL}${id}/`, { method: "DELETE" });
  const data = await res.json();
  return NextResponse.json(data);
}
