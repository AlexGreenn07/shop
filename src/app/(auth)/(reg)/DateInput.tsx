// 'use client';

import { ChangeEvent, useState, useRef } from 'react';
import { formStyles } from './styles';
import Image from 'next/image';
import Tooltip from './Tooltip';
import { validateBirthDate } from '@/utils/validation/validateBithDate';

interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChangeAction: (value: string) => void;
}

function DateInput({
  id,
  label,
  value,
  onChangeAction,
}: DateInputProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState<string | null>(null);

  {
    /* 1. Создаем реф для ссылки на скрытый инпут */
  }
  const hiddenCalendarRef = useRef<HTMLInputElement>(null);

  const formatDate = (input: string): string => {
    const clened = input.replace(/\D/g, '');
    let formatted = '';
    if (clened.length > 0) formatted = clened.slice(0, 2);
    if (clened.length > 2) formatted += '.' + clened.slice(2, 4);
    if (clened.length > 4) formatted += '.' + clened.slice(4, 8);
    return formatted;
  };

  const handleDateChange = (formattedDate: string) => {
    const validation = validateBirthDate(formattedDate);
    setError(validation.error || null);
    setShowTooltip(!!validation.error);
    onChangeAction(formattedDate);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    handleDateChange(formatted);
  };

  {
    /* 2. Открываем календарь напрямую через реф по клику */
  }
  const handleCalendarClick = () => {
    if (hiddenCalendarRef.current) {
      hiddenCalendarRef.current.showPicker();
    }
  };

  {
    /* 3. Обрабатываем выбор даты в скрытом инпуте */
  }
  const handleHiddenCalendarChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value) {
      const [year, month, day] = e.target.value.split('-');
      const formatted = `${day}.${month}.${year}`;
      handleDateChange(formatted);
    }
  };

  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div className="relative w-full">
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <div className="relative flex w-full items-center">
        <input
          id={id}
          type="text"
          value={value}
          placeholder="дд.мм.гггг"
          onChange={handleInputChange}
          className={`${formStyles.input} w-full pr-10`}
          maxLength={10}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        />

        {/* Кнопка теперь просто триггерит скрытый инпут */}
        <button
          type="button"
          onClick={handleCalendarClick}
          className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center"
          aria-label="Установить дату рождения"
        >
          <Image
            src="/icons-auth/icon-date.svg"
            alt="Календарь"
            width={24}
            height={24}
          />
        </button>

        {/* 4. Скрытый нативный инпут, встроенный в разметку */}
        <input
          ref={hiddenCalendarRef}
          type="date"
          max={maxDate}
          onChange={handleHiddenCalendarChange}
          className="pointer-events-none invisible absolute opacity-0"
          tabIndex={-1}
        />
      </div>
      {showTooltip && error && <Tooltip text={error} />}
    </div>
  );
}

export default DateInput;
