import VerifyEmail from '@/app/(auth)/(reg)/_components/VerifyEmail';
import PasswordResetEmail from '@/app/(auth)/(update-pass)/_components/PasswordResetEmail';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { phoneNumber } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';
import { CONFIG } from '../../config/config';
import EmailChangeVerification from '@/app/(user-profile)/_components/EmailChangeVerification';
import DeleteVerify from '@/app/(auth)/(reg)/_components/DeleteVerify';
import { deleteUserAvatarFromGridFS } from '@/utils/deleteUserAvatar';

const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
const db = client.db('deliveryshop');
const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  session: {
    expiresIn: 60 * 60 * 24 * 30, // Продолжительность сессии
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 86400, // 1 day
    sendResetPassword: async ({ user, url }) => {
      try {
        await resend.emails.send({
          from: 'Северяночка <onboarding@resend.dev>',
          to: user.email,
          subject: 'Сброс пароля на сайте Северяночка',
          react: PasswordResetEmail({
            username: user.name,
            resetUrl: url,
          }),
        });
      } catch (error) {
        console.error('Ошибка отправки email через Resend:', error);
        throw new Error('Failed to send reset password email');
      }
    },
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
      sendPasswordResetOTP: async ({ phoneNumber, code }) => {
        console.log(
          `[DEBUG]Отправка OTP ${code} на номер ${phoneNumber}`
        );
      },
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
          return `${phoneNumber}${CONFIG.TEMPORARY_EMAIL_DOMAIN}`;
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
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({
        user,
        newEmail,
        url,
      }: {
        user: { email: string; name: string };
        newEmail: string;
        url: string;
      }) => {
        await resend.emails.send({
          from: 'Северяночка <onboarding@resend.dev>',
          to: user.email,
          subject: 'Подтверждение смены email в Северяночке',
          react: EmailChangeVerification({
            username: user.name,
            currentEmail: user.email,
            newEmail,
            verificationUrl: url,
          }),
        });
      },
    },
    deleteUser: {
      enabled: true,

      sendDeleteAccountVerification: async ({
        user,
        url,
      }: {
        user: { email: string; name: string };
        url: string;
      }) => {
        await resend.emails.send({
          from: 'Северяночка <onboarding@resend.dev>',
          to: user.email,
          subject:
            'Подтверждение email для удаления аккаунта в Северяночке',
          react: DeleteVerify({
            username: user.name,
            verifyUrl: url,
          }),
        });
      },
      afterDelete: async (user) => {
        await deleteUserAvatarFromGridFS(user.id);
      },
    },
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

// import { CONFIG } from '../../config/config';
// import { betterAuth } from 'better-auth';
// import { mongodbAdapter } from 'better-auth/adapters/mongodb';
// import { phoneNumber } from 'better-auth/plugins';
// import { MongoClient } from 'mongodb';
// import nodemailer from 'nodemailer';

// const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
// const db = client.db('deliveryshop');

// // Локальный SMTP транспорт для разработки
// const localTransporter = nodemailer.createTransport({
//   host: 'localhost',
//   port: 1025,
//   secure: false,
//   ignoreTLS: true,
// });

// // Функции для отправки email через nodemailer
// async function sendVerificationEmail({
//   user,
//   url,
// }: {
//   user: { email: string; name: string };
//   url: string;
// }) {
//   await localTransporter.sendMail({
//     from: 'Северяночка <dev@localhost.com>',
//     to: user.email,
//     subject: 'Подтвердите email',
//     html: `
//       <!DOCTYPE html>
//       <html lang="ru">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Подтвердите email</title>
//       </head>
//       <body>
//         <h1>Подтвердите Ваш email</h1>
//         <p>Спасибо, ${user.name}, за регистрацию!</p>
//         <p>Для подтверждения email перейдите по ссылке: <a href="${url}">${url}</a></p>
//       </body>
//       </html>
//     `,
//     text: `Подтвердите Ваш email\n\nСпасибо, ${user.name}, за регистрацию!\n\nДля подтверждения перейдите по ссылке: ${url}`,
//   });

//   console.log(
//     'Email отправлен через MailDev. Preview: http://localhost:1080'
//   );
// }

// async function sendResetPasswordEmail({
//   user,
//   url,
// }: {
//   user: { email: string; name: string };
//   url: string;
// }) {
//   await localTransporter.sendMail({
//     from: 'Северяночка <dev@localhost.com>',
//     to: user.email,
//     subject: 'Сброс пароля для Северяночки',
//     html: `
//       <!DOCTYPE html>
//       <html lang="ru">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Сброс пароля</title>
//       </head>
//       <body>
//         <h1>Сброс пароля</h1>
//         <p>Здравствуйте, ${user.name}!</p>
//         <p>Для сброса пароля перейдите по ссылке: <a href="${url}">${url}</a></p>
//       </body>
//       </html>
//     `,
//     text: `Сброс пароля\n\nЗдравствуйте, ${user.name}!\n\nДля сброса пароля перейдите по ссылке: ${url}`,
//   });

//   console.log(
//     'Email сброса пароля отправлен через MailDev. Preview: http://localhost:1080'
//   );
// }

// // Исправленная функция с точным соответствием типов Better Auth
// async function sendChangeEmailConfirmation({
//   user,
//   newEmail,
//   url,
// }: {
//   user: {
//     id: string;
//     createdAt: Date;
//     updatedAt: Date;
//     email: string;
//     emailVerified: boolean;
//     name: string;
//     image?: string | null;
//   };
//   newEmail: string;
//   url: string;
//   token: string;
// }) {
//   await localTransporter.sendMail({
//     from: 'Северяночка <dev@localhost.com>',
//     to: user.email, // Текущий (старый) email берется из объекта user
//     subject: 'Подтверждение смены email в Северяночке',
//     html: `
//       <!DOCTYPE html>
//       <html lang="ru">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Подтверждение смены email</title>
//       </head>
//       <body>
//         <h1>Подтверждение смены email</h1>
//         <p>Здравствуйте, ${user.name}!</p>
//         <p>Вы запросили смену email с ${user.email} на ${newEmail}.</p>
//         <p>Для подтверждения этого действия перейдите по ссылке: <a href="${url}">${url}</a></p>
//       </body>
//       </html>
//     `,
//     text: `Подтверждение смены email\n\nЗдравствуйте, ${user.name}!\n\nВы запросили смену email с ${user.email} на ${newEmail}.\n\nДля подтверждения перейдите по ссылке: ${url}`,
//   });

//   console.log(
//     'Email подтверждения смены отправлен на старый адрес через MailDev. Preview: http://localhost:1080'
//   );
// }

// export const auth = betterAuth({
//   database: mongodbAdapter(db),
//   session: {
//     expiresIn: 60 * 60 * 24 * 30,
//     updateAge: 60 * 60 * 24,
//   },
//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: true,
//     resetPasswordTokenExpiresIn: 86400,
//     sendResetPassword: sendResetPasswordEmail,
//   },
//   emailVerification: {
//     sendVerificationEmail: sendVerificationEmail,
//     expiresIn: 86400,
//     autoSignInAfterVerification: false,
//   },
//   plugins: [
//     phoneNumber({
//       sendOTP: async ({ phoneNumber, code }) => {
//         console.log(
//           `[DEBUG] Отправка OTP: ${code} для ${phoneNumber}`
//         );
//       },
//       signUpOnVerification: {
//         getTempEmail: (phoneNumber) => {
//           return `${phoneNumber}${CONFIG.TEMPORARY_EMAIL_DOMAIN}`;
//         },
//         getTempName: (phoneNumber) => {
//           return phoneNumber;
//         },
//       },
//       allowedAttempts: 3,
//       otpLength: 6,
//       expiresIn: 300,
//       requireVerification: true,
//     }),
//   ],
//   user: {
//     changeEmail: {
//       enabled: true,
//       sendChangeEmailConfirmation: sendChangeEmailConfirmation,
//     },
//

//     additionalFields: {
//       phoneNumber: { type: 'string', input: true, required: true },
//       surname: { type: 'string', input: true, required: true },
//       birthdayDate: { type: 'date', input: true, required: true },
//       region: { type: 'string', input: true, required: true },
//       location: { type: 'string', input: true, required: true },
//       gender: { type: 'string', input: true, required: true },
//       card: { type: 'string', input: true, required: false },
//       hasCard: { type: 'boolean', input: true, required: false },
//     },
//   },
// });
