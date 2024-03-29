import React, { useEffect, useState, memo } from 'react';
import Input from '../../../Input';
import InputSelect from '../../../Input/components/InputSelect';
import Button from '../../../Button';
import { ESearchType, IColumn } from '../../typing';
import './index.less';

interface IProps {
  columns: IColumn[];
  onSubmit?: (params: any) => void;
}

const TableSearch: React.FC<IProps> = memo(({ columns, onSubmit }) => {
  const [searchMap, setSearchMap] = useState<IColumn[]>([]);
  const [inputValues, setInputValues] = useState<any>({});
  useEffect(() => {
    const filterMap = columns.filter((col: IColumn) => !col.hideInSearch);
    setSearchMap(filterMap);
    const obj: any = {};
    filterMap.forEach((col: IColumn) => {
      obj[col.dataIndex] = '';
    });
    setInputValues(obj);
  }, [columns]);

  const getInputType = (column: IColumn) => {
    if (column.valueType === ESearchType.select) {
      return (
        <InputSelect
          options={column.valueEnum}
          placeholder={column.title}
          onChange={(value: any, options: any) => {
            const newInputValues = { ...inputValues };
            newInputValues[column.dataIndex] = value;
            setInputValues(newInputValues);
          }}
        />
      );
    } else if (column.valueType === ESearchType.text) {
      return (
        <Input
          className='table-search-item-input'
          value={inputValues[column.dataIndex]}
          placeholder={column.title}
          onChange={(value: any) => {
            const newInputValues = { ...inputValues };
            newInputValues[column.dataIndex] = value;
            setInputValues(newInputValues);
          }}
        />
      );
    }
  };

  const searchDom = searchMap.map((item: IColumn) => {
    return (
      <div className='table-search-item' key={item.dataIndex}>
        {getInputType(item)}
      </div>
    );
  });
  return (
    <div className='table-search'>
      {searchMap.length === 0 ? (
        <></>
      ) : (
        <>
          {searchDom}
          <Button
            text='搜索'
            onClick={() => {
              onSubmit?.(inputValues);
            }}
          />
        </>
      )}
    </div>
  );
});
export default TableSearch;
