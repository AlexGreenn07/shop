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

interface DeleteVerifyProps {
  username: string;
  verifyUrl: string;
}

const DeleteVerify = (props: DeleteVerifyProps) => {
  const { username, verifyUrl } = props;

  return (
    <Html lang="ru" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 px-2 py-4 font-sans">
          <Container className="mx-auto max-w-145 rounded-md bg-white p-6">
            <Section>
              <Text className="mt-0 mb-4 text-xl font-bold text-gray-900">
                Подтверждение удаления аккаунта
              </Text>

              <Text className="mt-0 mb-4 text-base leading-5 text-gray-700">
                Здравствуйте, {username}! Мы получили запрос на
                удаление Вашего аккаунта в &quot;Северяночке&quot;.
              </Text>

              <Section className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
                <Text className="mt-0 mb-2 text-sm font-semibold text-red-700">
                  Внимание: это действие необратимо!
                </Text>
                <Text className="mt-0 mb-0 text-sm text-red-700">
                  После удаления аккаунта все Ваши данные, включая
                  историю заказов, бонусные баллы и персональные
                  настройки, будут безвозвратно удалены.
                </Text>
              </Section>

              <Text className="mt-0 mb-4 text-base leading-5 text-gray-700">
                Если Вы хотите продолжить удаление аккаунта, нажмите
                на кнопку ниже:
              </Text>

              <Section className="mb-6 text-center">
                <Button
                  href={verifyUrl}
                  className="rounded bg-red-600 px-6 py-3 text-base font-medium text-white no-underline hover:bg-red-700"
                >
                  Подтвердить удаление аккаунта
                </Button>
              </Section>

              <Text className="mt-0 mb-4 text-sm leading-5 text-gray-600">
                Если кнопка не работает, скопируйте и вставьте эту
                ссылку в адресную строку браузера:
                <br />
                <span className="break-all text-blue-600">
                  {verifyUrl}
                </span>
              </Text>

              <Text className="mt-0 mb-6 text-sm leading-5 text-gray-600">
                Ссылка для подтверждения будет активна в течение 24
                часов. Если Вы не запрашивали удаление аккаунта,
                пожалуйста, проигнорируйте это письмо или свяжитесь со
                службой поддержки для обеспечения безопасности Вашего
                аккаунта.
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

export default DeleteVerify;
