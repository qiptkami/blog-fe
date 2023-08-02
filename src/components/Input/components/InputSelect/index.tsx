import React, { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';

import './index.less';
interface IOptions {
  value: string | number;
  label: string;
}
interface IProps {
  label?: string;
  multiple?: boolean;
  // value?: any; //多选需要传value
  defaultValue?: string | number | string[] | number[];
  onChange?: (value: (string | undefined)[], options: IOptions[]) => void;
  className?: string | undefined;
  options?: IOptions[];
}

const findLabel = (
  options: IOptions[] | undefined,
  value: string | number | string[] | number[] | undefined
) => {
  if (!options || !options.length || !value) return undefined;
  if (Array.isArray(value)) {
    const res = value.map((item) => {
      return options.find((option: IOptions) => option.value === item)?.label;
    });
    if (!res || !res.length) return undefined;
    return res;
  }
  return [options.find((option: IOptions) => option.value === value)?.label];
};

const insertDom = (
  multiple: boolean,
  wrapperRef: any,
  inputRef: any,
  value: Array<string | undefined> | undefined
) => {
  if (!value || !value.length) return;
  //考虑单选
  if (!multiple) {
    //删除原先的dom
    if (wrapperRef.current.firstChild === inputRef.current) {
      //没有选中任何
      const newSpan = document.createElement('span');
      newSpan.className = 'input-select-wrapper-selected';
      value[0] && (newSpan.textContent = value[0]);
      wrapperRef.current.insertBefore(newSpan, inputRef.current);
    } else {
      //替换
      wrapperRef.current.firstChild.textContent = value[0];
    }
  } else {
    value.forEach((item) => {
      const newSpan = document.createElement('span');
      newSpan.className = 'input-select-wrapper-selected';
      newSpan.id = `input-selected-${item}`;
      item && (newSpan.textContent = item);
      wrapperRef.current.insertBefore(newSpan, inputRef.current);
    });
  }
};
const InputSelect: React.FC<IProps> = ({
  label,
  multiple = false,
  defaultValue,
  onChange,
  className,
  options,
}) => {
  const inputRef = useRef<any>();
  const wrapperRef = useRef<any>();
  const dropdownContentRef = useRef<any>();
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<
    Array<string | undefined> | undefined
  >(undefined);

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
    if (selectValue === undefined) {
      console.log('defaultValue: ', defaultValue);
      setSelectValue(findLabel(options, defaultValue));
      multiple &&
        insertDom(
          multiple,
          wrapperRef,
          inputRef,
          findLabel(options, defaultValue)
        );
    }
  }, [defaultValue, selectValue, options, multiple]);

  useEffect(() => {
    console.log('selectValue: ', selectValue);
    !multiple && insertDom(multiple, wrapperRef, inputRef, selectValue);
  }, [selectValue, multiple]);

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
          selectValue?.includes(option.value.toString()) &&
            'select-dropdown-item-selected'
        )}
        key={option.value}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault();
          e.stopPropagation();
          if (!multiple) {
            //如果单选
            const find = findLabel(options, option.value);
            if (!find) return;
            setSelectValue(find);
            onChange?.(find, options);
            setShowDrop(false);
          } else {
            const find = findLabel(options, option.value);
            if (!find || !find[0] || !selectValue) return;
            const newSelectValue = [...selectValue];
            const findIndex = newSelectValue.findIndex(
              (item) => find[0] === item
            );
            if (findIndex !== -1) {
              newSelectValue.splice(findIndex, 1);
              const dom = document.getElementById(`input-selected-${find[0]}`);
              dom?.remove();
            } else {
              //不存在 直接添加dom
              newSelectValue.push(...find);
              const newSpan = document.createElement('span');
              newSpan.className = 'input-select-wrapper-selected';
              newSpan.id = `input-selected-${find[0]}`;
              newSpan.textContent = find[0];
              wrapperRef.current.insertBefore(newSpan, inputRef.current);
            }
            setSelectValue(newSelectValue);
            onChange?.(newSelectValue, options);
          }
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
      <div
        ref={wrapperRef}
        className={classNames('input-select-wrapper', className)}
        onClick={() => {
          setShowDrop(true);
        }}
      >
        <input
          id={label}
          ref={inputRef}
          type='search'
          style={{ opacity: multiple ? 1 : 0 }}
          autoComplete={'off'}
          onBlur={() => {
            // setShowDrop(false);
          }}
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
      </div>
    </>
  );
};

export default InputSelect;
