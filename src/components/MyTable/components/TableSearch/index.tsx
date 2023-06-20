import React, { useEffect, useState } from 'react';
import Input from '../../../Input';
import InputSelect from '../../../Input/components/InputSelect';
import { ESearchType, IColumn } from '../../typing';
import './index.less';

interface IProps {
  columns: IColumn[];
}

const TableSearch: React.FC<IProps> = ({ columns }) => {
  const [searchMap, setSearchMap] = useState<IColumn[]>([]);
  useEffect(() => {
    setSearchMap(columns.filter((col: IColumn) => !col.hideInSearch));
  }, [columns]);

  const getInputType = (column: IColumn) => {
    if (column.valueType === ESearchType.select) {
      return <InputSelect options={column.valueEnum} />;
    } else if (column.valueType === ESearchType.text) {
      return <Input className='table-search-item-input' />;
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
  return <div className='table-search'>{searchDom}</div>;
};
export default TableSearch;
