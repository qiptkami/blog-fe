import React from 'react';
import classNames from 'classnames';

import './index.less';

interface IProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  className?: string | undefined;
}

const TextArea: React.FC<IProps> = ({
  label,
  value,
  onChange,
  name,
  placeholder,
  className,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className='input-label'>
          {label}
        </label>
      )}
      <span className={classNames('text-area-wrapper', className)}>
        <textarea
          className='text-area-wrapper-content'
          id={label}
          name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange?.(e.target.value);
          }}
        />
      </span>
    </>
  );
};

export default TextArea;
