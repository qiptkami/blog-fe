import { useEffect, useState } from 'react';
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
  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);
  const tHead = columns.map((column: IColumn) => {
    return <th>{column.title}</th>;
  });

  const list = dataSource.map((item: any) => {
    return (
      <tr key={item.id}>
        {columns.map((column: IColumn) => {
          const render =
            (column.render && column?.render(item)) || item[column.dataIndex];
          return <td>{render}</td>;
        })}
      </tr>
    );
  });

  return (
    <div className='blog-admin-container'>
      <table className='blog-table'>
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
