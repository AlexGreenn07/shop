'use client';

import { useState, useEffect } from 'react';
import MiniLoader from '@/components/MiniLoader';
import { UserRole } from '@/types/userData';
import { useAuthStore } from '@/store/authStore';
import { tableStyles } from '@/app/(admin)/styles';
import {
  getRoleLabel,
  getRoleStyles,
} from '@/utils/admin/rolesUtils';

interface RoleProps {
  initialRole: string;
  userId: string;
}

const Role = ({ initialRole, userId }: RoleProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const [localRole, setLocalRole] = useState<UserRole>(
    initialRole as UserRole
  );
  const { user: currentUser } = useAuthStore();

  const isAdmin = currentUser?.role === 'admin';
  const canChangeRole = isAdmin; // Только админы могут менять роли

  // Синхронизируем локальное состояние с пропсом role при изменении
  useEffect(() => {
    setLocalRole(initialRole as UserRole);
  }, [initialRole]);

  const handleRoleChange = async (newRole: UserRole) => {
    if (newRole === localRole || !canChangeRole) return;

    setIsChanging(true);
    try {
      const response = await fetch(
        `/api/admin/users/${userId}/role`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при обновлении роли');
      }

      const data = await response.json();

      if (data.success) {
        setLocalRole(newRole);
      } else {
        throw new Error(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при обновлении роли:', error);
      // Возвращаем предыдущую роль в случае ошибки
      setLocalRole(initialRole as UserRole);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div
      className={`order-6 flex flex-row gap-x-3 border-b border-gray-300 md:border-b-0 ${tableStyles.colSpans.role} ${tableStyles.border.right}`}
    >
      <div className="text-xs font-semibold md:hidden">Роль:</div>

      {isChanging ? (
        <div className="text-xs text-gray-500">
          <MiniLoader />
        </div>
      ) : localRole === 'admin' ? (
        <div
          className={`inline-flex h-8 w-35 items-center justify-center rounded px-3 py-2 text-xs font-medium md:w-30 md:flex-1 md:px-1 md:text-[10px] lg:px-3 lg:text-xs ${getRoleStyles(localRole)}`}
        >
          {getRoleLabel(localRole)}
        </div>
      ) : canChangeRole ? (
        <select
          value={localRole}
          onChange={(e) =>
            handleRoleChange(e.target.value as UserRole)
          }
          className={`ma:w-30 inline-flex h-8 w-35 cursor-pointer items-center justify-center rounded px-3 py-2 text-xs font-medium outline-none md:flex-1 md:px-1 md:text-[10px] lg:px-3 lg:text-xs ${getRoleStyles(localRole)}`}
          disabled={isChanging}
        >
          <option value="user">Пользователь</option>
          <option value="manager">Менеджер</option>
        </select>
      ) : (
        <div
          className={`inline-flex h-8 w-35 items-center justify-center rounded px-3 py-2 text-xs font-medium md:w-30 md:flex-1 md:px-1 md:text-[10px] lg:px-3 lg:text-xs ${getRoleStyles(localRole)}`}
        >
          {getRoleLabel(localRole)}
        </div>
      )}
    </div>
  );
};

export default Role;
