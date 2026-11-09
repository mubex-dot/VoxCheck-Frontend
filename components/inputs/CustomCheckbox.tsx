import { FieldError } from "react-hook-form";

interface CustomCheckboxProps {
  label: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  errorMessage?: FieldError | undefined;
  className?: string;
  disabled?: boolean;
}

const CustomCheckbox = ({
  label,
  register,
  errorMessage,
  className,
  disabled,
}: CustomCheckboxProps) => {
  return (
    <div className={`${className}`}>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register}
          disabled={disabled}
          className="mt-1 size-4 shrink-0 rounded border border-input outline-none checked:border-primary checked:bg-primary focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none"
        />
        <span className="text-sm text-text-primary leading-tight select-none">
          {label}
        </span>
      </label>
      {errorMessage?.message && (
        <p className="text-red-500 text-sm my-1">{errorMessage.message}</p>
      )}
    </div>
  );
};

export default CustomCheckbox;
