import { UserData } from '@/types/userData';
import { calculateAge } from '@/utils/admin/calculateAge';
import { getShortDecimalId } from '@/utils/admin/shortDecimalId';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface UsersTableProps {
  users: UserData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string, direction: 'asc' | 'desc') => void;
}

const UsersTable = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
  sortBy,
  sortDirection,
  onSort,
}: UsersTableProps) => {
  let sortedUsers = users;

  if (sortBy === 'id') {
    sortedUsers = [...users].sort((a, b) => {
      const decimalA = parseInt(getShortDecimalId(a.id));
      const decimalB = parseInt(getShortDecimalId(b.id));

      return sortDirection === 'asc'
        ? decimalA - decimalB
        : decimalB - decimalA;
    });
  }

  if (sortBy === 'age') {
    sortedUsers = [...users].sort((a, b) => {
      const ageA = parseInt(calculateAge(a.birthdayDate).toString());
      const ageB = parseInt(calculateAge(b.birthdayDate).toString());

      return sortDirection === 'asc' ? ageA - ageB : ageB - ageA;
    });
  }
  return (
    <div className="mt-4 overflow-hidden rounded border border-gray-200 bg-white shadow-lg">
      <TableHeader
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <div className="flex flex-col gap-y-5 divide-y divide-gray-200 border-b border-gray-200 pb-3">
        {sortedUsers.map((user) => (
          <TableRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
