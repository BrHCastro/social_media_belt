import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

interface ITextInputRootProps {
  children: ReactNode
  className?: string
  error?: string
}

function TextInputRoot({ children, className, error }: ITextInputRootProps) {
  return (
    <>
      <div
        className={clsx(
          'rounded-lg flex gap-2 appearance-none border border-gray-500 w-full py-2 px-4 bg-white dark:bg-gray-800 shadow-sm focus-within:ring-2 ring-purple-600',
          {
            'ring-2 ring-red-500': !!error,
          },
          className,
        )}
      >
        {children}
      </div>
      <small className="text-red-500">{error}</small>
    </>
  )
}
TextInputRoot.displayName = 'TextInput.Root'

interface ITextInputInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const TextInputInput = forwardRef<HTMLInputElement, ITextInputInputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={clsx(
          'w-full outline-none bg-transparent flex-1 text-gray-700 dark:text-gray-300 placeholder-gray-400 text-base font-medium placeholder:text-gray-500',
          className,
        )}
        ref={ref}
        {...rest}
      />
    )
  },
)
TextInputInput.displayName = 'TextInput.Input'

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
}
