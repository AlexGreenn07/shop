import { CheckCircle } from 'lucide-react';
import { AuthFormLayout } from '../../_components/AuthFormLayout';

function SuccessUpdatePass() {
  return (
    <AuthFormLayout>
      <div className="mx-auto mt-10 max-w-md p-6 text-center">
        <CheckCircle className="text-primary mx-auto mb-4 h-16 w-16" />
        <h1 className="text-primary mb-4 text-2xl font-bold">
          Пароль успешно изменен!
        </h1>
        <p className="text-gray-600">
          Вы будете перенаправлены на страницу входа ...
        </p>
      </div>
    </AuthFormLayout>
  );
}

export default SuccessUpdatePass;
