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
  const tHead = columns.map((column: IColumn) => {
    return <th key={column.dataIndex}>{column.title}</th>;
  });

  const list = useMemo(
    () =>
      dataSource.map((item: any) => {
        return (
          <tr key={item.id}>
            {columns.map((column: IColumn) => {
              let width = 'auto';
              if (column.width) {
                width = column.width;
              }
              const render =
                (column.render && column?.render(item)) ||
                item[column.dataIndex];
              console.log(render);

              return (
                <td
                  key={column.dataIndex}
                  style={{ width: width }}
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
  );

  return (
    <div className='container'>
      <table id='table' className='table-container' ref={tableRef}>
        <thead>
          <tr>{tHead}</tr>
        </thead>
        <tbody>{list}</tbody>
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
