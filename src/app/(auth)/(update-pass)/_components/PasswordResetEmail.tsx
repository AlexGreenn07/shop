import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';

interface ResetPasswordProps {
  username: string;
  resetUrl: string;
}

const PasswordResetEmail = (props: ResetPasswordProps) => {
  const { username, resetUrl } = props;
  return (
    <Html lang="ru" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 px-2 py-4 font-sans">
          <Container className="mx-auto max-w-145 rounded-md bg-white p-6">
            <Section>
              <Text className="mt-0 mb-4 text-xl font-bold text-gray-900">
                Восстановление пароля
              </Text>

              <Text className="mt-0 mb-4 text-base leading-5 text-gray-700">
                Здравствуйте, {username}! Мы получили запрос на сброс
                пароля для вашего аккаунта. Для создания нового пароля
                нажмите на кнопку ниже.
              </Text>

              <Section className="mb-6 text-center">
                <Button
                  href={resetUrl}
                  className="hover: rounded bg-[#70C05B] px-6 py-2 text-base font-medium text-white no-underline"
                >
                  Сбросить пароль
                </Button>
              </Section>

              <Text className="mt-0 mb-4 text-sm leading-5 text-gray-600">
                Если кнопка не работает, скопируйте и вставьте эту
                ссылку в адресную строку браузера:
                <br />
                <span className="break-all">{resetUrl}</span>
              </Text>

              <Text className="mt-0 mb-6 text-sm leading-5 text-gray-600">
                Ссылка для сброса пароля будет активна в течение 24
                часов. Если Вы не запрашивали сброс пароля,
                пожалуйста, проигнорируйте это письмо или свяжитесь со
                службой поддержки.
              </Text>

              <Hr className="my-4 border-gray-200" />

              <Text className="m-0 text-xs leading-4 text-gray-500">
                С уважением,
                <br />
                Команда &quot;Северяночки&quot;
              </Text>
            </Section>

            <Section className="mt-6 border-t border-gray-200 pt-4">
              <Text className="m-0 text-center text-xs leading-4 text-gray-400">
                Северяночка
                <br />
                Россия, Архангельск, ул. Ленина, д.1
                <br />
                ИНН 0291234567890
              </Text>

              <Text className="m-0 mt-2 text-center text-xs leading-4 text-gray-400">
                © {new Date().getFullYear()} Северяночка. Все права
                защищены.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
