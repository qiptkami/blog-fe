import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { isEqualArr } from '../../utils/deepClone';
import MyPagination from '../MyPagination';
import TableSearch from './components/TableSearch';
import './index.less';
import { IColumn } from './typing';

interface IProps {
  page: number; //当前页数
  size: number; //页面大小
  total: number; //
  dataSource: any[]; //
  onRequest: (params: any) => void;
  columns: IColumn[];
  onRow?: (record: IColumn) => void;
  onSubmit?: (params: any) => void;
  TopRender?: JSX.Element;
}

const MyTable: React.FC<IProps> = memo(
  ({
    page = 1,
    size = 5,
    total,
    dataSource,
    onRequest,
    columns,
    onRow,
    onSubmit,
    TopRender,
  }) => {
    const tableRef = useRef<any>(null);
    // const [tableWidth, setTableWidth] = useState<number>();
    // const [tableHegiht, setTableHeight] = useState<number>();

    // useEffect(() => {
    //   setTableWidth(tableRef.current.scrollWidth);
    //   setTableHeight(tableRef.current.scrollHeight);
    // }, [tableRef, dataSource]);
    const [baseColumns, setBaseColumns] = useState<IColumn[]>([]);
    useEffect(() => {
      if (!isEqualArr(baseColumns, columns)) {
        setBaseColumns(columns);
      }
    }, [columns]);

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
            dataSource.length ? (
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
              })
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className='table-empty'>暂无数据</div>
                </td>
              </tr>
            ),
          [dataSource, columns, onRow]
        )}
      </tbody>
    );

    return (
      <div className='container'>
        <TableSearch columns={baseColumns} onSubmit={onSubmit} />
        <div className='table-top'> {TopRender}</div>
        <table id='table' className='table-container' ref={tableRef}>
          {colGroup}
          {tHead}
          {tBody}
        </table>
        <MyPagination
          total={total}
          page={page}
          size={size}
          onRequest={onRequest}
          singleMsg=''
        ></MyPagination>
      </div>
    );
  }
);
export default MyTable;
