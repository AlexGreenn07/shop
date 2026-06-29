'use client';

interface OTPResendButtonProps {
  canResend: boolean;
  timeLeft: number;
  onResendAction: () => void;
}

function OTPResendButton({
  canResend,
  timeLeft,
  onResendAction,
}: OTPResendButtonProps) {
  return !canResend ? (
    <p className="text-center text-xs text-[#414141]">
      Код подтверждения можно будет повторно запросить через{' '}
      <span className="font-bold">{timeLeft}</span> секунд
    </p>
  ) : (
    <button
      onClick={onResendAction}
      disabled={!canResend}
      className={`cursor-pointer text-center text-xs underline ${canResend ? 'text-[#ff6633]' : 'cursor-not-allowed text-gray-400'}`}
    >
      Отправить еще раз
    </button>
  );
}

export default OTPResendButton;
