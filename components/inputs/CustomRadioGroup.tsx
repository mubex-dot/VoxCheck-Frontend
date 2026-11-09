interface CustomRadioGroupProps {
  label: string;
  subLabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  options: Array<{
    name: string | number;
    value: string | number;
    description?: string;
  }>;
  errorMessage?: { message?: string };
  className?: string;
}

const CustomRadioGroup = ({
  label,
  subLabel,
  register,
  options,
  errorMessage,
  className,
}: CustomRadioGroupProps) => {
  return (
    <div className={`${className}`}>
      <label className="text-sm text-text-primary font-bold">{label}</label>
      {subLabel && (
        <p className="text-xs text-text-primary/70 mt-1">{subLabel}</p>
      )}

      <div className="flex flex-col gap-3 mt-3 bg-red">
        {options.map((item) => (
          <label
            key={item.value}
            htmlFor={String(item.value)}
            className="flex items-start sm:items-center justify-between gap-4 p-4 border border-primary/10 rounded cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col gap-1 ">
              <span className="text-sm font-semibold text-text-primary">
                {item.name}
              </span>
              {item.description && (
                <span className="text-xs text-text-primary/70 leading-relaxed">
                  {item.description}
                </span>
              )}
            </div>

            <input
              type="radio"
              id={String(item.value)}
              value={item.value}
              {...register}
              className="appearance-none aspect-square size-4 shrink-0 rounded-full border border-input outline-none checked:border-primary checked:bg-primary checked:shadow-[inset_0_0_0_3px_var(--primary-foreground)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer mt-1 sm:mt-0"
            />
          </label>
        ))}
      </div>

      {errorMessage?.message && (
        <p className="text-red-500 text-sm my-1">{errorMessage.message}</p>
      )}
    </div>
  );
};

export default CustomRadioGroup;
