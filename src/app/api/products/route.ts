import { getDatalist } from '@/api/fetch/helpers/get';
import { Product } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search');

    const searchResultParams = {
      select: '*',
      title: `ilike.%${search}%`,
      limit: '5',
    };

    const data = await getDatalist<Product>(
      'shop_products',
      searchResultParams
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: String(error) },
      { status: 500 }
    );
  }
};
