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

interface VerifyEmailProps {
  username: string;
  verifyUrl: string;
}

const VerifyEmail = (props: VerifyEmailProps) => {
  const { username, verifyUrl } = props;
  return (
    <Html lang="ru" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 px-2 py-4 font-sans">
          <Container className="mx-auto max-w-145 rounded-md bg-white p-6">
            <Section>
              <Text className="mt-0 mb-4 text-xl font-bold text-gray-900">
                Подтвердите Ваш email
              </Text>

              <Text className="mt-0 mb-4 text-base leading-5 text-gray-700">
                Спасибо, {username}, за регистрацию! Чтобы завершить
                процесс и активировать Ваш аккаунт, пожалуйста,
                подтвердите Ваш email, нажав на кнопку ниже.
              </Text>

              <Section className="mb-6 text-center">
                <Button
                  href={verifyUrl}
                  className="hover: rounded bg-[#70C05B] px-6 py-2 text-base font-medium text-white no-underline"
                >
                  Подтвердить Email
                </Button>
              </Section>

              <Text className="mt-0 mb-4 text-sm leading-5 text-gray-600">
                Если кнопка не работает, скопируйте и вставьте эту
                ссылку в адресную строку браузера:
                <br />
                <span className="break-all">{verifyUrl}</span>
              </Text>

              <Text className="mt-0 mb-6 text-sm leading-5 text-gray-600">
                Ссылка для подтверждения будет активна в течение 24
                часов. Если Вы не регистрировали аккаунт, просто
                проигнорируйте это письмо.
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

export default VerifyEmail;
