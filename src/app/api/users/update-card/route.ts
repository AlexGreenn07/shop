import { getDB } from '@/utils/api-routes';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const db = await getDB();
  try {
    const { userId, cardNumber } = await request.json();

    if (!userId || !cardNumber) {
      return NextResponse.json(
        { error: 'Отсутствуют id пользователя и номер карты' },
        { status: 400 }
      );
    }

    let objectId;

    try {
      objectId = ObjectId.createFromHexString(userId);
    } catch {
      return NextResponse.json(
        { error: 'Неверный формат id пользователя' },
        { status: 400 }
      );
    }

    const exist = await db
      .collection('user')
      .findOne({ _id: objectId });
    if (!exist) {
      return NextResponse.json(
        { error: 'Пользователя с таким id не существует' },
        { status: 404 }
      );
    }
    if (exist.card === cardNumber) {
      return NextResponse.json({
        success: true,
        message: 'Данные карты лояльности уже актуальны',
        card: cardNumber,
      });
    }
    const result = await db.collection('user').updateOne(
      { _id: objectId },
      {
        $set: {
          hasCard: true,
          card: cardNumber,
          updatedAt: new Date(),
        },
      }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Ошибка при обновлении номера карты лояльности' },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Данные карты лояльности успешно обновлены',
      card: cardNumber,
    });
  } catch (error) {
    console.error('Ошибка при обновлении карты лояльности: ', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Ошибка сервера при обновлении номера карты лояльности',
      },
      { status: 500 }
    );
  }
}
