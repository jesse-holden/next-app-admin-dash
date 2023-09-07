'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export function SubmitButton(
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} {...props}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
