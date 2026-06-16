import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Инициализируем Resend с вашим API-ключом из .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // После верификации домена замените на свой email
      to: 't9169905831@gmail.com', // Email получателя
      subject: 'Привет из Next.js!',
      html: '<strong>Письмо успешно отправлено через Resend!</strong>',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}
