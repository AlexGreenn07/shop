import { getDB } from '@/utils/api-routes';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// export const dynamic = 'force-dynamic';
// export const revalidate = 3600;
export async function POST(request: Request) {
  try {
    const { phoneNumber, password } = await request.json();

    const db = await getDB();
    if (!phoneNumber || !password) {
      return NextResponse.json(
        { message: 'Заполните все поля' },
        { status: 400 }
      );
    }
    const user = await db.collection('user').findOne({ phoneNumber });
    if (!user) {
      return NextResponse.json(
        { message: 'Пользователя с таким телефоном не существует' },
        { status: 401 }
      );
    }
    console.log(user.phoneNumber);

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Неверный пароль' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          _id: user._id.toString(),
          phoneNumber: user.phoneNumber,
          surname: user.surname,
          name: user.name,
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
