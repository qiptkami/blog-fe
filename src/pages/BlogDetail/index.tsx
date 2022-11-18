import React, { useEffect, useState } from 'react';
import { getBlogInfo } from '../../services/homePage';
import { Blog } from '../../typings/index';
import MarkDown2Html from './components/MarkDown2Html';
import './index.less';

const BlogDetail: React.FC = () => {
  const [bid, setBid] = useState<number>(1);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    console.log('blogasdasdaset');
    getBlogInfo(bid).then((res: any) => {
      if (res.data.status) {
        setBlog(res.data.data);
      }
      console.log(res.data);
    });
  }, []);

  return (
    <div className='blog-detail'>
      <div className='ui container'>
        <div className='ui top attached segment'>
          <div className='ui horizontal link list' id='item1'>
            <div className='item'>
              <img className='ui avatar image' src='${blog.user.avatar}' />
              <div className='content'>
                <a className='header' href='@{/about}'>
                  blog.user.username
                </a>
              </div>
            </div>
            <div className='item' id='item2'>
              <i className='clock icon'></i>
              <span style={{ marginLeft: '5px', padding: '5px 0' }}>
                blog.updateTime, 'yyyy-MM-dd'
              </span>
            </div>
            <div className='item' id='item3'>
              <i className='eye icon'></i>
              <span style={{ marginLeft: '5px', padding: '5px 0' }}>
                blog.views
              </span>
            </div>
          </div>
        </div>
        <div className='ui attached segment'>
          <img
            className='ui fluid rounded image'
            src='${blog.firstPicture}'
            alt=''
          />
        </div>

        <div className='ui attached padded segment'>
          <div className='ui right aligned basic segment'>
            <div className='ui orange basic label'>blog.flag原创</div>
          </div>
          <h2 className='ui center aligned header'>blog.title</h2>
          <div
            id='content'
            className='typo typo-selection js-toc-content m-padded-lr-responsive m-padded-tb-large'
          >
            blog.content -- markdown
            <MarkDown2Html content={blog?.content}></MarkDown2Html>
          </div>
          <div className='m-padded-lr-responsive m-padded-tb-large'>
            <div className='ui basic teal left pointing label'>
              blog.type.name
            </div>
          </div>
          <div className='th:unless=${!blog.appreciation}'>
            <div className='ui center aligned basic segment'>
              <button
                id='payButton'
                className='ui orange basic circular button'
              >
                赞赏
              </button>
            </div>
            <div className='ui payQR flowing popup top left transition hidden'>
              <div className='ui orange basic label'>
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
            </div>
          </div>
        </div>
        <div className='ui attached positive message th:if=${blog.shareStatement}'>
          <div className='ui middle aligned grid'>
            <div className='eleven wide column'>
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
                <li>公众号转载：请在文末添加作者公众号二维码</li>
              </ul>
            </div>
            <div className='five wide column'>
              <img
                src='@{/images/MyWeChat.png}'
                alt=''
                className='ui right floated rounded bordered image'
                style={{ width: '1120px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
