import React, { useEffect, useRef, useState, forwardRef } from 'react';
import classNames from 'classnames';

import './index.less';
interface IOptions {
  value: any;
  label: string;
}

interface IProps {
  label?: string;
  multiple?: boolean;
  defaultValue?: any;
  onChange?: (value: string) => void;
  className?: string | undefined;
  options?: IOptions[];
}

const InputSelect: React.FC<IProps> = ({
  label,
  multiple = false,
  defaultValue,
  onChange,
  className,
  options,
}) => {
  const wrapperRef = useRef<any>();
  const dropdownContentRef = useRef<any>();
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<any>('');

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowDrop(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectValue(defaultValue);
  }, [defaultValue]);

  const getDropdownContentHeight = () => {
    return showDrop ? `${dropdownContentRef.current.scrollHeight}px` : '0px';
  };

  const dropDom = () => {
    if (!options || !options.length) {
      return <div className='select-dropdown-empty'>暂无数据</div>;
    }
    return options?.map((option: IOptions) => (
      <div
        className={classNames(
          'select-dropdown-item',
          selectValue === option.value && 'select-dropdown-item-selected'
        )}
        key={option.value}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault();
          e.stopPropagation();
          onChange?.(option.value);
          setSelectValue(option.value);
          setShowDrop(false);
        }}
      >
        {option.label}
      </div>
    ));
  };
  return (
    <>
      {label && (
        <label htmlFor={label} className='input-label'>
          {label}
        </label>
      )}
      <span
        ref={wrapperRef}
        className={classNames('input-select-wrapper', className)}
        onClick={() => {
          setShowDrop(true);
        }}
      >
        <input
          id={label}
          type='text'
          defaultValue={
            selectValue !== ''
              ? options?.find((option) => option.value === selectValue)?.label
              : ''
          }
          onBlur={() => {
            setShowDrop(false);
          }}
          readOnly
        />
        <div
          className={classNames(
            'select-dropdown',
            showDrop ? 'dropdown-open' : 'dropdown-close'
          )}
          style={{
            maxHeight: getDropdownContentHeight(),
          }}
          ref={dropdownContentRef}
        >
          {dropDom()}
        </div>
      </span>
    </>
  );
};

export default InputSelect;
