import { tableStyles } from '@/app/(admin)/styles';
import { CONFIG } from '../../../../../../config/config';

const Email = ({
  email,
  emailVerified,
}: {
  email: string;
  emailVerified: boolean;
}) => {
  const isTemporaryEmail = (email: string): boolean => {
    return email.includes(CONFIG.TEMPORARY_EMAIL_DOMAIN);
  };

  return (
    <div
      className={`order-4 gap-2 border-b border-gray-300 md:border-b-0 ${tableStyles.colSpans.email} ${tableStyles.border.right}`}
    >
      <div className="flex text-xs font-semibold md:hidden">
        Email:
      </div>
      {!isTemporaryEmail(email) ? (
        <div
          className={`flex items-center text-xs break-all ${
            emailVerified ? 'text-[#008c48]' : 'text-[#d80000]'
          }`}
        >
          {email}
        </div>
      ) : (
        <div className="flex items-center md:text-sm">—</div>
      )}
    </div>
  );
};

export default Email;
