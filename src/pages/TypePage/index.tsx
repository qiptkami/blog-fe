import { useEffect, useState } from 'react';
import { getPaginationInfoByType, getTypes } from '../../services/typePage';
import { useNavigate } from 'react-router-dom';
import { Type, Blog } from '../../typings/index';
import { parseType } from '../../utils/JsonParser';
import BlogItem from '../HomePage/components/BlogList/BlogItem';
import MyPagination from '../../components/MyPagination';
import './index.less';

interface IType {
  type: Type;
  num: number; //type下有num个blog
}

const TypePage: React.FC = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(0); //页面大小
  const [types, setTypes] = useState<IType[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [typeId, setTypeId] = useState<number>(-1);

  useEffect(() => {
    getData();
  }, []);

  const getData = (params?: { id?: number; page: number; size: number }) => {
    getAllType();
    getBlogByType(params);
  };

  const getAllType = () => {
    getTypes().then((res) => {
      console.log(res?.data?.data);
      const temp: IType[] = [];
      Object.keys(res?.data?.data).map((item: any) => {
        temp.push({ type: parseType(item), num: res?.data?.data[item] });
      });
      setTypes(temp);
    });
  };

  const getBlogByType = (params?: {
    id?: number;
    page: number;
    size: number;
  }) => {
    getPaginationInfoByType(params).then((res) => {
      setTotal(res?.data?.data?.total);
      setPage(res?.data?.data?.pageNum);
      setSize(res?.data?.data?.pageSize);
      setBlogs(res?.data?.data?.list);
      setTypeId(params?.id ?? -1);
    });
  };
  const typeList = types.map((type) => {
    console.log(type);
    return (
      <div
        className='type-item'
        key={type.type.id}
        onClick={() => {
          getBlogByType({ id: type.type.id, page: page, size: size });
          navigate(`/types/${type.type.id}`);
        }}
      >
        <div className='type-item-content'>{type.type.name}</div>
        <div className='type-item-line'>|</div>
        <div className='type-item-num'>{type.num}</div>
      </div>
    );
  });
  const blogList = blogs.map((blog) => {
    return <BlogItem key={blog.id} blog={blog}></BlogItem>;
  });
  return (
    <div className='type-container'>
      <div className='type-info'>
        <div className='type-info-header'>
          <span>分类</span>
          <span>共 {types.length} 类</span>
        </div>
        <div className='type-list'>{typeList}</div>
      </div>
      <div className='type-content'>{blogList}</div>
      <MyPagination
        total={total}
        page={page}
        size={size}
        getData={getPaginationInfoByType}
      ></MyPagination>
    </div>
  );
};
export default TypePage;
