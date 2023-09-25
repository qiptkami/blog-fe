import React from 'react';
import classNames from 'classnames';

import './index.less';

interface IProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string | undefined;
}

const Input: React.FC<IProps> = ({
  value,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <span className={classNames('input-wrapper', className)}>
      <input
        type='text'
        placeholder={placeholder}
        value={value || ''}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          onChange?.((e.target as HTMLInputElement).value);
        }}
      />
    </span>
  );
};

export default Input;
