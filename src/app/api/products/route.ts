import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sortBy') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  // TODO: Replace with real database query
  // const where: any = {};
  // if (category) where.category = category;
  // if (search) where.name = { contains: search, mode: 'insensitive' };

  // const products = await db.product.findMany({ where, skip: (page - 1) * limit, take: limit });
  // const total = await db.product.count({ where });

  return NextResponse.json({
    products: [],
    total: 0,
    page,
    totalPages: 0,
  });
}

export async function POST(request: NextRequest) {
  // TODO: Create product (admin only)
  const body = await request.json();
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}
