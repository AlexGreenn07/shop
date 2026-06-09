import { getDB } from '@/utils/api-routes';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// export const dynamic = 'force-dynamic';
// export const revalidate = 3600;
export async function POST(request: Request) {
  try {
    const {
      phone,

      password,
    } = await request.json();

    const db = await getDB();
    if (!phone || !password) {
      return NextResponse.json(
        { error: 'Заполните все поля' },
        { status: 400 }
      );
    }
    const user = await db.collection('users').findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { error: 'Пользователя с таким телефоном не существует' },
        { status: 401 }
      );
    }
    console.log(user.phone);

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          _id: user._id.toString(),
          phone: user.phone,
          surname: user.surname,
          firstName: user.firstName,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка сервера при авторизации', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при авторизации' },
      { status: 500 }
    );
  }
}
