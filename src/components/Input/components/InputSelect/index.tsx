import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';

import './index.less';
interface IOptions {
  value: string | number;
  label: string;
}
interface IProps {
  multiple?: boolean;
  value?: string | number | string[] | number[];
  onChange?: (
    value: string | number | (string | undefined)[],
    options: IOptions[]
  ) => void;
  className?: string | undefined;
  options?: IOptions[];
  placeholder?: string;
}

const findLabel = (
  options: IOptions[] | undefined,
  value: string | number | undefined
) => {
  if (!options || !options.length || !value) return undefined;
  return options.find((option: IOptions) => option.value === value)?.label;
};

const insertDom = (
  multiple: boolean,
  wrapperRef: any,
  inputRef: any,
  options: IOptions[] | undefined,
  value: string[] | number[] | string | number | undefined,
  currentClick: string | number | undefined
) => {
  if (!options) return;
  //考虑单选
  if (!multiple) {
    if (!value) {
      if (wrapperRef.firstChild.className === 'input-select-wrapper-selected') {
        wrapperRef.firstChild.remove();
        return;
      }
      return;
    }
    //删除原先的dom
    const label = findLabel(options, value as string | number);
    if (!label) return;
    if (wrapperRef.firstChild === inputRef) {
      //没有选中任何
      const newSpan = document.createElement('span');
      newSpan.className = 'input-select-wrapper-selected';
      label && (newSpan.textContent = label);
      wrapperRef.insertBefore(newSpan, inputRef);
    } else {
      //替换
      wrapperRef.firstChild.textContent = label;
    }
  } else {
    const delDom = document.getElementById(`input-selected-${currentClick}`);
    if (!value || !(value as string[] | number[]).length) {
      delDom && delDom.remove();
      return;
    }
    const selectedDoms = document.querySelectorAll("[id^='input-selected']");
    selectedDoms.forEach((item: any) => {
      const f = item.id.split('-')[2];
      if (
        (value as string[] | number[]).findIndex((item) => item == f) === -1
      ) {
        item.remove();
      }
    });
    (value as string[] | number[]).forEach((item: string | number) => {
      const label = findLabel(options, item);
      if (!label) return;
      const dom = document.getElementById(`input-selected-${item}`);
      if (!dom) {
        const newSpan = document.createElement('span');
        newSpan.className = 'input-select-wrapper-selected';
        newSpan.id = `input-selected-${item}`;
        label && (newSpan.textContent = label);
        wrapperRef.insertBefore(newSpan, inputRef);
      }
      if (delDom) {
        delDom.remove();
      }
    });
  }
};
const InputSelect: React.FC<IProps> = ({
  multiple = false,
  value,
  onChange,
  className,
  options,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const dropdownContentRef = useRef<HTMLDivElement>(null!);
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [currentClick, setCurrentClick] = useState<string | number | undefined>(
    undefined
  );

  useEffect(() => {
    const dropdownDom = dropdownContentRef.current;
    if (!showDrop) {
      dropdownDom.classList.remove('dropdown-enter');
      dropdownDom.classList.add('dropdown-leave');
      setTimeout(() => {
        dropdownDom.classList.remove('dropdown-leave');
        dropdownDom.classList.add('dropdown-close');
      }, 150);
    } else {
      dropdownDom.classList.add('dropdown-enter');
      dropdownDom.classList.remove('dropdown-close');
      setTimeout(() => {
        dropdownDom.classList.remove('dropdown-enter');
      }, 150);
    }
  }, [showDrop]);

  const [selectValue, setSelectValue] = useState<
    string[] | number[] | string | number | undefined
  >(undefined);

  const [searchState, setSearchState] = useState<string>('');

  const handleClickOutside = useCallback((event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowDrop(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  useEffect(() => {
    insertDom(
      multiple,
      wrapperRef.current,
      inputRef.current,
      options,
      selectValue,
      currentClick
    );
  }, [selectValue, multiple, options, currentClick]);

  const getClassName = (
    selected: string | number | string[] | number[] | undefined,
    value: string | number
  ) => {
    let className = '';
    if (!Array.isArray(selected)) {
      selected === value && (className = 'select-dropdown-item-selected');
    } else {
      selected.findIndex((item) => item === value) !== -1 &&
        (className = 'select-dropdown-item-selected');
    }
    return className;
  };

  const memoizedGetClassName = useMemo(() => getClassName, []);

  const dropDom = () => {
    if (!options || !options.length) {
      return <div className='select-dropdown-empty'>暂无数据</div>;
    }
    const searchOptions = options.filter((item) => {
      const mainLower = (item.label as string).toLowerCase();
      const subLower = searchState.toLowerCase();
      return mainLower.includes(subLower);
    });
    if (!searchOptions || !searchOptions.length) {
      return <div className='select-dropdown-empty'>暂无数据</div>;
    }

    return searchOptions.map((option: IOptions) => (
      <div
        className={classNames(
          'select-dropdown-item',
          memoizedGetClassName(selectValue, option.value)
        )}
        key={option.value}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault();
          e.stopPropagation();
          if (!multiple) {
            //如果单选
            setSelectValue(option.value);
            onChange?.(option.value, options);
            setShowDrop(false);
          } else {
            setSearchState('');
            const value = option.value;
            const newSelectValue = [...(selectValue as any[])];
            const findIndex = newSelectValue.findIndex(
              (item) => value === item
            );
            if (findIndex !== -1) {
              newSelectValue.splice(findIndex, 1);
              setCurrentClick(value);
            } else {
              newSelectValue.push(value);
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
    <div
      ref={wrapperRef}
      className={classNames('input-select-wrapper', className)}
      onClick={() => {
        setShowDrop((prev) => !prev);
        inputRef.current.focus();
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <input
        ref={inputRef}
        type='search'
        value={searchState}
        autoComplete={'off'}
        onChange={(e: any) => {
          setSearchState(e.target.value);
          if (!e.target.value) {
            inputRef.current.style.width = '12px';
            return;
          }
          const tempElement = document.createElement('span');
          tempElement.textContent = e.target.value;
          tempElement.style.visibility = 'hidden';
          document.body.appendChild(tempElement);
          const inputWidth = tempElement.offsetWidth;
          document.body.removeChild(tempElement);
          inputRef.current.style.width = `${inputWidth + 10}px`;
        }}
      />

      {(multiple ? !(selectValue as any)?.length : !selectValue) &&
        !searchState && (
          <span className='placeholder select-placeholder'>{placeholder}</span>
        )}
      <div
        className={classNames('select-dropdown', 'dropdown-close')}
        style={{
          top: wrapperRef.current
            ? `${wrapperRef.current.offsetHeight}px`
            : '0px',
        }}
        ref={dropdownContentRef}
      >
        {dropDom()}
      </div>
      <i
        className={classNames(
          'iconfont',
          'drop-icon',
          showDrop && 'icon-reverse'
        )}
        style={{ opacity: !multiple && selectValue && hover ? 0 : 1 }}
      >
        &#xe6b9;
      </i>
      {
        <i
          className={classNames('iconfont', 'drop-icon')}
          style={{
            opacity: !multiple && selectValue && hover ? 1 : 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectValue('');
          }}
        >
          &#xe670;
        </i>
      }
    </div>
  );
};

export default InputSelect;
