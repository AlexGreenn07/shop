import { tableStyles } from '@/app/(admin)/styles';
import { isBirthdaySoon } from '@/utils/admin/birthdaySoon';
import { formatBirthday } from '@/utils/admin/formatBirthday';
import { Cake } from 'lucide-react';

const Person = ({
  name,
  surname,
  birthday,
}: {
  name: string;
  surname: string;
  birthday: string;
}) => {
  const birthdaySoon = isBirthdaySoon(birthday);
  return (
    <div
      className={`order-2 flex flex-row gap-x-3 gap-y-2 border-b border-gray-300 md:flex-col md:items-start md:border-b-0 ${tableStyles.colSpans.name} ${tableStyles.border.right}`}
    >
      <div className="text-xs font-medium md:text-left lg:text-sm">
        {name} {surname}
      </div>
      {birthdaySoon && (
        <span className="inline-flex items-center gap-2 text-xs text-[#ff6633] md:justify-start">
          <Cake className="h-4 w-4" />
          {formatBirthday(birthday)}
        </span>
      )}
    </div>
  );
};

export default Person;
