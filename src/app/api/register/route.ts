import { getDB } from '@/utils/api-routes';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// export const dynamic = 'force-dynamic';
// export const revalidate = 3600;
export async function POST(request: Request) {
  try {
    const {
      phoneNumber,
      surname,
      name,
      password,
      birthdayDate,
      region,
      location,
      gender,
      card,
      email,
      hasCard,
    } = await request.json();

    const db = await getDB();

    const existingUser = await db
      .collection('users')
      .findOne({ phoneNumber });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким телефоном уже существует' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      phoneNumber,
      surname,
      name,
      password: hashedPassword,
      birthdayDate,
      region,
      location,
      gender,
      card,
      email,
      hasCard,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        userId: result.insertedId,
        user: {
          phoneNumber,
          surname,
          name,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка сервера при регистрации:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при регистрации:' },
      { status: 500 }
    );
  }
}
