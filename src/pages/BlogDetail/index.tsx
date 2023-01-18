import React, { useEffect, useState } from 'react';
import { getCommentInfo, insertComment } from '../../services/blogPage';
import { getBlogInfo } from '../../services/homePage';
import { Blog, Comment, Tag } from '../../typings/index';
import Comments from './components/CommentList';
import MarkDown2Html from './components/MarkDown2Html';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { scrollToAnchor } from '../../utils/scrollToAnchor';
import classNames from 'classnames';
import './index.less';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bid, setBid] = useState<number>(0);
  const [blog, setBlog] = useState<Blog>();
  const [commentList, setCommentList] = useState<Comment[]>();

  useEffect(() => {
    const blogId = (id && parseInt(id)) || 0;
    setBid(blogId);
    getBlog(blogId);
    getComments(blogId);
  }, [id]);

  const tags = (tags?: Tag[]) => {
    return tags?.map((tag: Tag) => {
      return (
        <div
          className='blog-header-tags-item'
          key={tag.id}
          onClick={() => {
            scrollToAnchor(location.pathname, '/tags', tag?.name, navigate);
          }}
        >
          <span className='blog-header-tags-item-info'>{tag?.name + ' '}</span>
        </div>
      );
    });
  };

  const getBlog = (id: number) => {
    getBlogInfo(id).then((res: any) => {
      if (res.data.status) {
        setBlog(res.data.data);
      }
    });
  };

  const getComments = (id: number) => {
    getCommentInfo(id).then((res: any) => {
      if (res.data.status) {
        setCommentList(res.data.data);
      }
    });
  };

  const handleSubmit = (
    nickname: string,
    content: string,
    email: string,
    parentId: number
  ) => {
    const comment: Comment = {
      nickname: nickname,
      content: content,
      email: email,
      blog: { id: bid ?? 0 },
      parentComment: { id: parentId ?? 0 },
    };
    insertComment(comment).then((res: any) => {
      if (res?.data?.status) {
        getComments(bid);
      }
    });
  };

  return (
    <div className='blog-container'>
      <div className='blog-header'>
        <div className='blog-header-title'>{blog?.title}</div>
        <div className='blog-header-info'>
          <div className='blog-header-info-time'>
            <i className={classNames('iconfont', 'icon-clock')}>&#xe62a;</i>
            {moment(blog?.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className='blog-header-info-tags'>
            <i className={classNames('iconfont', 'icon-tags')}>&#xe87c;</i>
            {tags(blog?.tags)}
          </div>
          <div className='blog-header-info-reader'>
            <i className={classNames('iconfont', 'icon-pen')}>&#xe795;</i>
            本文章共 1055 字
            <i className={classNames('iconfont', 'icon-hourglass')}>&#xe62e;</i>
            预计阅读时间 3 分钟
          </div>
        </div>

        <img className='blog-picture' src={blog?.firstPicture} alt='' />
      </div>
      <div className='blog-main'>
        <MarkDown2Html content={blog?.content}></MarkDown2Html>
      </div>
      <div className='blog-footer'>
        <div className='ui right aligned basic segment'></div>

        <div className='ui middle aligned grid'>
          <ul className='list'>
            <li>
              作者：<span>blog.user.username</span>
              <a href='@{/about}' target='_blank'>
                （联系作者）
              </a>
            </li>
            <li>
              发表时间：<span>blog.updateTime, 'yyyy-MM-dd HH:mm</span>
            </li>
            <li>版权声明：自由转载-非商用-非衍生-保持署名</li>
          </ul>
        </div>

        <Comments
          bid={bid}
          list={commentList}
          handleSubmit={handleSubmit}
        ></Comments>
      </div>
    </div>
  );
};

export default BlogDetail;
