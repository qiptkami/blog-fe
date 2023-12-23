import React from 'react';
import classNames from 'classnames';

import './index.less';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  className?: string | undefined;
}

const TextArea: React.FC<IProps> = ({
  value,
  onChange,
  name,
  placeholder,
  className,
}) => {
  return (
    <span className={classNames('text-area-wrapper', className)}>
      <textarea
        className='text-area-wrapper-content'
        name={name}
        value={value || ''}
        autoComplete='off'
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          onChange?.(e.target.value);
        }}
      />
    </span>
  );
};

export default TextArea;
