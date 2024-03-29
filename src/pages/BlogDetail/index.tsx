import React, { useEffect, useState } from 'react';
import { getCommentInfo, insertComment } from '../../services/commentService';
import { getBlogInfo } from '../../services/blogService';
import { Blog, Comment, Tag } from '../../typings/index';
import Comments from './components/CommentList';
import MarkDown2Html from './components/MarkDown2Html';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { scrollToAnchor } from '../../utils/scrollToAnchor';
import classNames from 'classnames';
import LoadingAnimation from '../../components/LoadingAnimation';
import './index.less';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bid, setBid] = useState<number>(0);
  const [blog, setBlog] = useState<Blog>();
  const [commentList, setCommentList] = useState<Comment[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [commentLoading, setCommentLoading] = useState<boolean>(true);

  useEffect(() => {
    const blogId = (id && parseInt(id)) || 0;
    setBid(blogId);
    getBlog(blogId);
    getComments(blogId);
  }, [id]);

  useEffect(() => {
    blog && !commentLoading && setLoading(false);
  }, [blog, loading, commentLoading]);

  const tags = (tags?: Tag[]) => {
    return tags?.map((tag: Tag) => {
      return (
        <div
          className='blog-tags-item'
          key={tag.id}
          onClick={() => {
            scrollToAnchor(location.pathname, '/tags', tag?.name, navigate);
          }}
        >
          <span className='blog-tags-item-info'>{tag?.name + ' '}</span>
        </div>
      );
    });
  };

  const getBlog = (id: number) => {
    getBlogInfo(id).then((res: any) => {
      if (res.status === 200) {
        setBlog(res.data.value);
      }
    });
    setCommentLoading(false);
  };

  const getComments = (id: number) => {
    getCommentInfo(id).then((res: any) => {
      if (res.status === 200) {
        setCommentList(res.data.value);
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
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className='blog-container'>
          <div className='blog-main'>
            <div className='blog-header'>
              <div className='blog-header-title'>{blog?.title}</div>
              <div className='blog-header-info'>
                <div className='blog-header-info-time'>
                  <i className={classNames('iconfont', 'icon-clock')}>
                    &#xe62a;
                  </i>
                  {moment(blog?.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                <div className='blog-header-info-comment'>
                  <i className={classNames('', 'icon-comment')}>&#xe689;</i>
                  {commentList?.length}
                </div>
                <div className='blog-header-info-reader'>
                  <i className={classNames('iconfont', 'icon-pen')}>&#xe795;</i>
                  本文章共 1055 字
                  <i className={classNames('iconfont', 'icon-hourglass')}>
                    &#xe62e;
                  </i>
                  预计阅读时间 3 分钟
                </div>
              </div>

              {/* <img className='blog-picture' src={blog?.firstPicture} alt='' /> */}
            </div>
            <MarkDown2Html content={blog?.content} />
            <div className='blog-tags'>
              <i className={classNames('iconfont', 'icon-tags')}>&#xe87c;</i>
              {tags(blog?.tags)}
            </div>
            <Comments
              bid={bid}
              list={commentList}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetail;
