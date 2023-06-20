import { useEffect, useMemo, useRef, useState } from 'react';
import Input from '../Input';
import MyPagination from '../MyPagination';
import TableSearch from './components/TableSearch';
import './index.less';
import { ESearchType, IColumn, Param } from './typing';

interface IProps {
  page: number; //当前页数
  size: number; //页面大小
  total: number; //
  dataSource: any[]; //
  getData: (param: Param) => void;
  columns: IColumn[];
  onRow?: (record: IColumn) => void;
}

const MyTable: React.FC<IProps> = ({
  page = 1,
  size = 5,
  total,
  dataSource,
  getData,
  columns,
  onRow,
}) => {
  const tableRef = useRef<any>(null);
  const [tableWidth, setTableWidth] = useState<number>();
  const [tableHegiht, setTableHeight] = useState<number>();

  const [value, setValue] = useState<string | undefined>('');

  useEffect(() => {
    setTableWidth(tableRef.current.scrollWidth);
    setTableHeight(tableRef.current.scrollHeight);
  }, [tableRef, dataSource]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const colGroup = (
    <colgroup>
      {columns.map((column: IColumn) => {
        let width = 'auto';
        if (column.width) {
          width = column.width;
        }
        return (
          <col
            key={column.dataIndex}
            style={{ width: width, minWidth: width }}
          />
        );
      })}
    </colgroup>
  );

  const tHead = (
    <thead>
      <tr>
        {columns.map((column: IColumn) => {
          return (
            <th key={column.dataIndex} title={column.title}>
              {column.title}
            </th>
          );
        })}
      </tr>
    </thead>
  );

  const tBody = (
    <tbody>
      {useMemo(
        () =>
          dataSource.map((item: any) => {
            return (
              <tr key={item.id}>
                {columns.map((column: IColumn) => {
                  const render =
                    (column.render && column?.render(item)) ||
                    item[column.dataIndex];
                  return (
                    <td
                      key={column.dataIndex}
                      className={column.ellipsis ? 'ellipsis' : ''}
                      onClick={() => {
                        onRow?.(item);
                      }}
                    >
                      {render}
                    </td>
                  );
                })}
              </tr>
            );
          }),
        [dataSource, columns, onRow]
      )}
    </tbody>
  );

  return (
    <div className='container'>
      <TableSearch columns={columns} />
      <table id='table' className='table-container' ref={tableRef}>
        {colGroup}
        {tHead}
        {tBody}
      </table>
      <MyPagination
        total={total}
        page={page}
        size={size}
        getData={getData}
        singleMsg=''
      ></MyPagination>
    </div>
  );
};
export default MyTable;
