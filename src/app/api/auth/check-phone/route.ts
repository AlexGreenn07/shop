import { NextResponse } from 'next/server';
import { getDB } from '@/utils/api-routes';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();
    const db = await getDB();
    const user = await db
      .collection('users')
      .findOne({ phoneNumber });
    if (!user) return NextResponse.json({ exists: false });
    return NextResponse.json({ exists: true, userName: user.name });
  } catch (error) {
    console.error('Ошибка при проверке номера телефона:', error);
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}
