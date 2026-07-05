'use client';

import { ErrorContent } from '@/app/(auth)/(reg)/_components/ErrorContent';
import { useAuthStore } from '@/store/authStore';
import { MailWarning, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProfileHeader from '../_components/ProfileHeader';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader';
import SecuritySection from '../_components/SecuritySection';

function UserProfile() {
  const { user, isAuth, checkAuth } = useAuthStore();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const isPhoneRegistration = user?.phoneNumberVerified;

  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth();
      setIsCheckingAuth(false);
    };
    checkAuthentication();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && !isAuth) {
      router.replace('/');
    }
  }, [router, isAuth, isCheckingAuth]);

  const handleToLogin = () => {
    router.replace('/login');
  };

  const handleToRegister = () => {
    router.replace('/register');
  };

  if (isCheckingAuth) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Loader />;
  }

  if (!user) {
    return (
      <ErrorContent
        error="Данные пользователя не найдены"
        icon={<MailWarning className="h-8 w-8 text-red-600" />}
        primaryAction={{ label: 'Войти', onClick: handleToLogin }}
        secondaryAction={{
          label: 'Зарегистрироваться',
          onClick: handleToRegister,
        }}
      />
    );
  }

  return (
    <div className="bg-[#fbf8ec] px-4 md:px-6 xl:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="animate-slide-in opacity translate-y-8">
          <div className="overflow-hidden rounded-xl bg-white shadow-xl duration-700 ease-out">
            <ProfileHeader name={user.name} surname={user.surname} />

            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-center justify-center">
                <div className="bg-primary flex items-center rounded-full px-3 py-1 text-sm text-white">
                  {!isPhoneRegistration ? (
                    <>
                      <Phone className="mr-1 h-4 w-4" />
                      <span>Зарегистрирован по телефону</span>
                    </>
                  ) : (
                    <>
                      <MailWarning className="mr-1 h-4 w-4" />
                      <span>Зарегистрирован по email</span>
                    </>
                  )}
                </div>
              </div>
              <SecuritySection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
