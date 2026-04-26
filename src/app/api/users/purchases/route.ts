import { getDB } from '@/utils/api-routes';
import { NextResponse } from 'next/server';
import { CONFIG } from '../../../../../config/config';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = await getDB();

    const url = new URL(request.url);
    const userPurchasesLimit = url.searchParams.get(
      'userPurchasesLimit'
    );
    const startIdx = parseInt(
      url.searchParams.get('startIdx') || '0'
    );
    const perPage = parseInt(
      url.searchParams.get('perPage') ||
        CONFIG.ITEMS_PER_PAGE.toString()
    );

    const user = await db.collection('users').findOne({});
    if (!user?.purchases?.length) {
      return NextResponse.json({ products: [], totalCount: 0 });
    }

    const productIds = user.purchases.map(
      (p: { id: number }) => p.id
    );

    if (userPurchasesLimit) {
      const limit = parseInt(userPurchasesLimit);
      const purchases = await db
        .collection('products')
        .find(
          { id: { $in: productIds } },
          { projection: { discountPercent: 0 } }
        )
        .limit(limit)
        .toArray();
      return NextResponse.json(purchases);
    }

    const totalCount = productIds.length;

    const purchases = await db
      .collection('products')
      .find(
        { id: { $in: productIds } },
        { projection: { discountPercent: 0 } }
      )
      .sort({ _id: -1 })
      .skip(startIdx)
      .limit(perPage)
      .toArray();

    console.log(purchases);
    return NextResponse.json({ products: purchases, totalCount });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return NextResponse.json(
      { message: 'Ошибка сервера при купленных продуктов:' },
      { status: 500 }
    );
  }
}
