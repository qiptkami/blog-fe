import React from 'react';
import classNames from 'classnames';

import './index.less';

interface IProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string | undefined;
}

const Input: React.FC<IProps> = ({ label, value, onChange, className }) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className='input-label'>
          {label}
        </label>
      )}
      <span className={classNames('input-wrapper', className)}>
        <input
          id={label}
          type='text'
          value={value || ''}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            onChange?.((e.target as HTMLInputElement).value);
          }}
        />
      </span>
    </>
  );
};

export default Input;
