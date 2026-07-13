import { tableStyles } from '@/app/(admin)/styles';
import { getShortDecimalId } from '@/utils/admin/shortDecimalId';

const UserId = ({ userId }: { userId: string }) => {
  return (
    <div
      className={`order-1 flex flex-row gap-x-3 border-b border-gray-300 md:border-b-0 ${tableStyles.colSpans.id} ${tableStyles.border.right}`}
    >
      <div className="text-xs font-semibold md:hidden">ID:</div>
      <span className="flex w-full justify-start rounded font-mono text-xs md:justify-center lg:bg-[#f3f2f1] lg:text-sm">
        #{getShortDecimalId(userId)}
      </span>
    </div>
  );
};

export default UserId;
