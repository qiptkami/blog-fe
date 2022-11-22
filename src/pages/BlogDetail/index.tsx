import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getCommentInfo } from '../../services/blogPage';
import { getBlogInfo } from '../../services/homePage';
import { Blog, User, Comment } from '../../typings/index';
import Comments from './components/CommentList';
import MarkDown2Html from './components/MarkDown2Html';
import './index.less';

const BlogDetail: React.FC = () => {
  const [bid, setBid] = useState<number>(2);
  const [blog, setBlog] = useState<Blog>();
  const [commentList, setCommentList] = useState<Comment[]>();

  useEffect(() => {
    getBlog(bid);
    getComments(bid);
  }, [bid]);

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

  return (
    <div className='blog-container'>
      <div className='blog-header'>
        <div className='blog-header-title'>{blog?.title}</div>
        <div className='blog-header-info'>
          <div className='blog-header-views'>{blog?.views}</div>
          <div className='blog-header-time'>
            {moment(blog?.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className='blog-header-flag'>{blog?.flag}</div>
          <div className='blog-header-reader'>
            本文章共 1055 字 / 预计阅读时间 3 分钟
            {/* 总之，大多数人阅读一篇文章的时间=文章数字÷（300~500字/分钟）
           例：文章字数为15000字，那么阅读时间=15000÷（300~500）=50~30分钟 */}
          </div>
        </div>
        <div className='blog-header-type'>{blog?.type.name}</div>
        {/*
          <img
            className='blog-picture'
            src='${blog?.firstPicture}'
            alt=''
          />
        */}
      </div>
      <div className='blog-main'>
        <MarkDown2Html content={blog?.content}></MarkDown2Html>
      </div>
      <div className='blog-footer'>
        <div className='ui right aligned basic segment'></div>
        {blog?.appreciation && (
          <>
            <div className='ui center aligned basic segment'>
              <button
                id='payButton'
                className='ui orange basic circular button'
              >
                赞赏
              </button>
            </div>
            <div className='ui payQR flowing popup top left transition hidden'>
              <div className='ui images'>
                <div className='image'>
                  <img
                    src='@{/images/zfb.jpg}'
                    alt=''
                    className='ui rounded bordered image'
                    style={{ width: '120px' }}
                  />
                  <div>支付宝</div>
                </div>
                <div className='image'>
                  <img
                    src='@{/images/wx.png}'
                    alt=''
                    className='ui rounded bordered image'
                    style={{ width: '120px' }}
                  />
                  <div>微信</div>
                </div>
              </div>
            </div>
          </>
        )}
        {blog?.shareStatement && (
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
              <li>
                版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）
              </li>
            </ul>
          </div>
        )}
        <Comments bid={bid} list={commentList}></Comments>
      </div>
    </div>
  );
};

export default BlogDetail;
