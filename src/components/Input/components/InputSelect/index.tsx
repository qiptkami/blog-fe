import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import './index.less';
interface IOptions {
  value: any;
  label: string;
}

interface IProps {
  multiple?: boolean;
  defaultValue?: any;
  onChange?: (value: string | undefined) => void;
  className?: string | undefined;
  options?: IOptions[];
}

const InputSelect: React.FC<IProps> = ({
  multiple = false,
  defaultValue,
  onChange,
  className,
  options,
}) => {
  const dropdownContentRef = useRef<any>();
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<any>('');

  useEffect(() => {
    setSelectValue(defaultValue);
  }, [defaultValue]);

  const getDropdownContentHeight = useCallback(() => {
    return showDrop ? `${dropdownContentRef.current.scrollHeight}px` : '0px';
  }, [showDrop]);

  const dropDom = useMemo(() => {
    if (!options || !options.length) {
      return <>暂无数据</>;
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
  }, [options, selectValue, onChange]);
  return (
    <>
      <span
        className={classNames('input-select-wrapper', className)}
        onClick={() => {
          setShowDrop(true);
        }}
      >
        <input
          type='text'
          value={
            selectValue
              ? options?.find((option) => option.value === selectValue)?.label
              : ''
          }
          onBlur={() => {
            setShowDrop(false);
          }}
          readOnly
        />
        {selectValue && (
          <i
            className={classNames('iconfont', 'icon-clear')}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectValue('');
            }}
          >
            &#xe629;
          </i>
        )}
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
          {dropDom}
        </div>
      </span>
    </>
  );
};

export default InputSelect;
