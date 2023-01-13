import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getArchivesPaginationInfo } from '../../services/archivesPage';
import { Blog } from '../../typings/index';
import InfiniteScroll from '../../components/InfiniteScroll';
import './index.less';

const Archives: React.FC = () => {
  const [msg, setMsg] = useState<string>('');
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();

  const handleClickBlog = (id: number) => {
    navigate(`/blog/${id}`);
  };

  const handleClickTag = (id: number) => {
    navigate(`/Tags`);
  };

  const getData = (page: number) => {
    getArchivesPaginationInfo({ page: page, size: 5 }).then((res: any) => {
      if (res?.data?.status) {
        setTotal(res?.data?.data?.total);
        setList((prev: any) => [...prev, ...res?.data?.data?.list]);
      }
      if (!res?.data?.data?.list?.length) {
        setMsg('我也是有底线的...');
      }
    });
  };

  const archives = () => (
    <div className='archives-body'>
      <li className='archives-item'>
        <div className='archives-timeline'>
          <div className='archives-timeline-node'></div>
          <div className='archives-timeline-line'></div>
        </div>
        <div className='archives-item-info'>
          <div className='archives-item-content'>共计 {total} 篇文章</div>
          <div className='archives-item-timestamp'></div>
        </div>
      </li>
      {list.map((blog: Blog) => (
        <li className='archives-item' key={blog.id}>
          <div className='archives-timeline'>
            <div className='archives-timeline-node'></div>
            <div className='archives-timeline-line'></div>
          </div>
          <div className='archives-item-info'>
            <div className='archives-item-content'>
              <div
                className='archives-item-content'
                onClick={() => handleClickBlog(blog.id)}
              >
                {blog.title}
              </div>
              <span
                className='archives-item-tag'
                onClick={() => handleClickTag(blog?.tag?.id ?? 0)}
              >
                {blog?.tag?.name}
              </span>
            </div>
            <div className='archives-item-timestamp'>
              {moment(blog.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>
        </li>
      ))}
    </div>
  );

  return (
    <ul className='archives-container'>
      <InfiniteScroll
        getData={getData}
        render={archives}
        msg={msg}
      ></InfiniteScroll>
    </ul>
  );
};

export default Archives;
