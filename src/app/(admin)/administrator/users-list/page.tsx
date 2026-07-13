'use client';

import { useCallback, useEffect, useState } from 'react';
import NavAndInfo from './_components/NavAndInfo';
import { UserData } from '@/types/userData';
import { Loader } from '@/components/Loader';
import ErrorComponent from '@/components/ErrorComponent';
import { useAuthStore } from '@/store/authStore';
import { CONFIG } from '../../../../../config/config';
import UsersTable from './_components/UsersTable';

const PAGE_SIZE_OPTIONS = [1, 5, 10, 20, 50, 100];

function UsersList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    'desc'
  );
  const [pageSize, setPageSize] = useState(
    CONFIG.DEFAULT_PAGE_SIZE_USERS_LIST
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const { user: currentUser } = useAuthStore();
  const isManager = currentUser?.role === 'manager';

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnPageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    const newDirection =
      sortBy === field && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortBy(field);
    setSortDirection(newDirection);
    setCurrentPage(1);
  };

  const loadUsers = useCallback(
    async (
      page: number,
      sortField: string,
      sortDir: 'asc' | 'desc',
      limit: number
    ) => {
      try {
        setLoading(true);
        setError(null);
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          isManager: isManager.toString(),
          sortBy: sortField,
          sortDirection: sortDir,
        });

        if (isManager && currentUser) {
          queryParams.append(
            'managerRegion',
            currentUser.region || ''
          );
          queryParams.append(
            'managerLocation',
            currentUser.location || ''
          );
        }

        const response = await fetch(
          `/api/admin/users?${queryParams}`
        );
        if (!response.ok) {
          throw new Error('Ошибка загрузки пользователей');
        }

        const data = await response.json();
        if (data?.users) {
          setUsers(data.users);
          setTotalPages(data.totalPages);
          setTotalUsers(data.totalCount);
        }
      } catch (error) {
        setError({
          error:
            error instanceof Error
              ? error
              : new Error('Неизвестная ошибка'),
          userMessage: 'Не удалось загрузить список пользователей',
        });
      } finally {
        setLoading(false);
      }
    },
    [currentUser, isManager]
  );

  useEffect(() => {
    loadUsers(currentPage, sortBy, sortDirection, pageSize);
  }, [loadUsers, currentPage, pageSize, sortBy, sortDirection]);

  if (loading) return <Loader />;
  if (error) {
    return (
      <ErrorComponent
        error={error.error}
        userMessage={error.userMessage}
      />
    );
  }

  return (
    <div className="p-3 lg:p-6">
      <NavAndInfo
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        onPageSizeChange={handleOnPageSizeChange}
        totalUsers={totalUsers}
      />
      <UsersTable
        users={users}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
}

export default UsersList;
