'use client';
import React from 'react';
import { SubmitButton } from '../buttons/form-submit';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import clsx from 'classnames';

function NameInput(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const { pending } = useFormStatus();

  return <input disabled={pending} {...props} />;
}

export default function UserForm(props: {
  create: (formData: FormData) => Promise<{
    message: string;
  }>;
}) {
  const { create } = props;

  // submitCount is used to reset the form
  const [submitCount, incrementSubmitCount] = React.useReducer((count) => count + 1, 0);
  const [message, setMessage] = React.useState<string>('');

  const is_error = ['invalid', 'error'].some((str) => message.toLowerCase().includes(str));

  async function onCreate(formData: FormData) {
    const res = await create(formData);
    setMessage(res.message);
    incrementSubmitCount();
  }

  return (
    <form
      key={submitCount}
      action={onCreate}
      onChange={() => {
        setMessage('');
      }}
    >
      <label htmlFor="name" className="mr-2">
        Name
      </label>
      <NameInput
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        type="text"
        name="name"
        required
        className={clsx('border border-gray-300 rounded-xl p-2 text-black', {
          'border-2 border-red-500 bg-red-100': is_error,
        })}
      />
      <div className="flex justify-end mt-2">
        <SubmitButton />
      </div>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
