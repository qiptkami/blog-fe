import React, { useState } from 'react';
import classNames from 'classnames';

import './index.less';

interface IProps {
  value?: string | undefined;
  onChange?: (e: string | undefined) => void;
  className?: string | undefined;
}

const Input: React.FC<IProps> = ({ value, onChange, className }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <span className={classNames('input-wrapper', className)}>
      <input
        type='text'
        value={value}
        onFocus={() => {
          setIsFocus(true);
        }}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          onChange?.((e.target as HTMLInputElement).value);
        }}
      />
      {isFocus && value && (
        <i
          className={classNames('iconfont', 'icon-clear')}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
            e.stopPropagation();
            onChange?.('');
          }}
        >
          &#xe629;
        </i>
      )}
    </span>
  );
};

export default Input;
