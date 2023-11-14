import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { isEqualArr } from '../../utils/deepClone';
import MyPagination from '../MyPagination';
import Loading from '../Loading';
import TableSearch from './components/TableSearch';
import './index.less';
import { IColumn } from './typing';

interface IProps {
  page: number; //当前页数
  size: number; //页面大小
  total: number; //
  loading?: boolean;
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
    loading,
    dataSource,
    onRequest,
    columns,
    onRow,
    onSubmit,
    TopRender,
  }) => {
    const tableRef = useRef<HTMLTableElement>(null);
    const blurRef = useRef<HTMLDivElement>(null!);
    const loadingRef = useRef<HTMLDivElement>(null!);

    const [baseColumns, setBaseColumns] = useState<IColumn[]>([]);
    useEffect(() => {
      if (!isEqualArr(baseColumns, columns)) {
        setBaseColumns(columns);
      }
    }, [columns]);

    useEffect(() => {
      const blur = blurRef.current;

      if (loading) {
        blur.style.opacity = '0.5';
        const newContainer = document.createElement('div');
        newContainer.classList.add('table-loading');
        loadingRef.current = newContainer;
        blurRef.current.appendChild(newContainer);
        const root = createRoot(newContainer);
        root.render(<Loading size={2} />);
      } else {
        blur.style.opacity = '1';
        if (loadingRef.current) {
          loadingRef.current.remove();
        }
      }
    }, [loading]);

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
        <div className='table-loading-container' ref={blurRef}>
          <div className='table-top'>{TopRender}</div>
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
          />
        </div>
      </div>
    );
  }
);
export default MyTable;
