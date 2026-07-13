import { tableStyles } from '@/app/(admin)/styles';
import { calculateAge } from '@/utils/admin/calculateAge';

interface AgeProps {
  birthdayDate: string;
}

const Age = ({ birthdayDate }: AgeProps) => {
  const age = calculateAge(birthdayDate);

  return (
    <div
      className={`order-3 border-b border-gray-300 text-xs md:border-b-0 ${tableStyles.colSpans.age} ${tableStyles.border.right}`}
    >
      {age === 0 ? (
        0
      ) : (
        <>
          {age}
          <span className="ml-1 md:hidden">лет</span>
        </>
      )}
    </div>
  );
};

export default Age;
