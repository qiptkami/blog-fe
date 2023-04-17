import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MyPagination from '../MyPagination';
import './index.less';

interface Param {
  page: number;
  size: number;
}
interface IColumn {
  title: string;
  dataIndex: string;
  render?: (_: any) => JSX.Element;
  width?: string;
  ellipsis?: boolean;
}

interface IProps {
  page: number; //当前页数
  size: number; //页面大小
  total: number; //
  dataSource: any[]; //
  getData: (param: Param) => void;
  columns: IColumn[];
}

const MyTable: React.FC<IProps> = ({
  page = 1,
  size = 5,
  total,
  dataSource,
  getData,
  columns,
}) => {
  const tableRef = useRef<any>(null);
  const [tableWidth, setTableWidth] = useState<number>();
  const [tableHegiht, setTableHeight] = useState<number>();

  useEffect(() => {
    setTableWidth(tableRef.current.scrollWidth);
    setTableHeight(tableRef.current.scrollHeight);
  }, [tableRef, dataSource]);

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
                    >
                      {render}
                    </td>
                  );
                })}
              </tr>
            );
          }),
        [dataSource, columns]
      )}
    </tbody>
  );

  return (
    <div className='container'>
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
