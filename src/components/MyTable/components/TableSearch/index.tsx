import React, { useEffect, useState } from 'react';
import Input from '../../../Input';
import InputSelect from '../../../Input/components/InputSelect';
import { ESearchType, IColumn } from '../../typing';
import './index.less';

interface IProps {
  columns: IColumn[];
  onSubmit?: (params: any) => void;
}

const TableSearch: React.FC<IProps> = ({ columns, onSubmit }) => {
  const [searchMap, setSearchMap] = useState<IColumn[]>([]);
  const [inputValues, setInputValues] = useState<
    { name: string; value: any }[]
  >([]);
  useEffect(() => {
    const filterMap = columns.filter((col: IColumn) => !col.hideInSearch);
    setSearchMap(filterMap);
    const obj: { name: string; value: any }[] = [];
    filterMap.forEach((col: IColumn) => {
      obj.push({ name: col.dataIndex, value: '' });
    });
    setInputValues(obj);
  }, [columns]);

  const getInputType = (column: IColumn) => {
    if (column.valueType === ESearchType.select) {
      return (
        <InputSelect
          options={column.valueEnum}
          onChange={(value: any) => {
            setInputValues((prev) => {
              return prev.map((item) => {
                if (item.name === column.dataIndex) {
                  return { ...item, value: value };
                }
                return item;
              });
            });
          }}
        />
      );
    } else if (column.valueType === ESearchType.text) {
      return (
        <Input
          className='table-search-item-input'
          onChange={(value: any) => {
            setInputValues((prev) => {
              return prev.map((item) => {
                if (item.name === column.dataIndex) {
                  return { ...item, value: value };
                }
                return item;
              });
            });
          }}
        />
      );
    }
  };

  const searchDom = searchMap.map((item: IColumn) => {
    return (
      <div className='table-search-item' key={item.dataIndex}>
        <span className='table-search-item-label'>{item.title}</span>
        {getInputType(item)}
      </div>
    );
  });
  return (
    <div className='table-search'>
      {searchDom}
      <button
        onClick={() => {
          onSubmit?.(inputValues);
        }}
      >
        提交
      </button>
    </div>
  );
};
export default TableSearch;
