import VerifyEmail from '@/app/(auth)/(reg)/_components/VerifyEmail';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { phoneNumber } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';

const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
const db = client.db('deliveryshop');
const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await resend.emails.send({
          from: 'Северяночка <onboarding@resend.dev>',
          to: user.email,
          subject: 'Подтверждение регистрации на сайте Северяночка',
          react: VerifyEmail({ username: user.name, verifyUrl: url }),
        });
      } catch (error) {
        console.error('Ошибка отправки email через Resend:', error);
        throw new Error('Failed to send verification email');
      }
    },
    expiresIn: 86400,
    autoSignInAfterVerification: false,
  },
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        console.log(
          `[DEBUG]Отправка OTP ${code} на номер ${phoneNumber}`
        );
        //     try {
        //       const response = await fetch(
        //         `https://smspilot.ru/api.php?send=Ваш код подтверждения от "Северяночки": ${code}&to=${phoneNumber}&apikey=${process.env.SMS_SMSPILOT_TEST_API_ID}&format=json`
        //       );
        //       const result = await response.json();
        //       if (
        //         result.status !== '1' &&
        //         result.status !== '2' &&
        //         result.status !== '0'
        //       ) {
        //         throw new Error('Ошибка отправки СМС', result.status);
        //       }
        //     } catch (error) {
        //       console.error('Ошибка отправки СМС:', error);
        //       throw error;
        //     }
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@delivery-shop.ru`;
        },
        getTempName: (phoneNumber) => {
          return phoneNumber;
        },
      },
      allowedAttempts: 3,
      otpLength: 6,
      expiresIn: 300,
      requireVerification: true,
    }),
  ],
  user: {
    additionalFields: {
      phoneNumber: { type: 'string', input: true, required: true },
      surname: { type: 'string', input: true, required: true },
      birthdayDate: { type: 'date', input: true, required: true },
      region: { type: 'string', input: true, required: true },
      location: { type: 'string', input: true, required: true },
      gender: { type: 'string', input: true, required: true },
      card: { type: 'string', input: true, required: false },
      hasCard: { type: 'boolean', input: true, required: false },
    },
  },
});
