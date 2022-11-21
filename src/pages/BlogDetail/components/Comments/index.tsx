import React, { useEffect, useState } from 'react';

interface IProps {
  bid: number;
  list: Comment[];
}

const Comments: React.FC<IProps> = ({ bid, list }) => {
  const [commentInfo, setCommentInfo] = useState<string>('');
  const [nickname, serNickName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [commentPid, setCommentPid] = useState<number>(-1);

  useEffect(() =>
    //session.getUser ? serNickName(nickname) & setEmail(email) : 'serNickName('') & setEmail('');
    {}, [list]);
  const handleSubmit = () => {};

  const buildCommentTree = () => {};

  return (
    <div className='ui attached segment ${!blog.commentAble}'>
      <div className='comments-container'>
        <div className='ui threaded comments'>
          <h3 className='ui dividing header' style={{ maxWidth: '100%' }}>
            评论
          </h3>
          <div className='comment   comment : ${comments}'>
            <a className='avatar'>
              <img src='${comment.avatar}' />
            </a>
            <div className='content'>
              <a className='author'>
                <span>${'nickname'}</span>
                <div className='ui mini basic teal left pointing label m-padded-mini th:if=${comment.isAdminComment}'></div>
              </a>
              <div className='metadata'>
                <span className='date'>
                  "comment.createTime ,'yyyy-MM-dd HH:mm"
                </span>
              </div>
              <div className='text'>comment.content</div>
              <div className='actions'>
                <a
                  className='reply'
                  data-commentid='1'
                  data-commentnickname='yiqiandewo attr data-commentid=${comment.id}, data-commentnickname=${comment.nickname}'
                  onClick={() => {
                    console.log('reply(this)');
                  }}
                >
                  回复
                </a>
              </div>
            </div>
            <div className='comments th:unless=${#arrays.length(comment.replyComment)} <= 0'>
              <div className='comment th:each=reply : ${comment.replyComment}'>
                <a className='avatar'>
                  <img src='${reply.avatar}' />
                </a>
                <div className='content'>
                  <a className='author'>
                    <span>reply.nickname</span>
                    <div className='ui mini basic teal left pointing label m-padded-mini th:if=${reply.isAdminComment}'></div>
                    <span className='m-teal'>
                      ' @' + reply.parentComment.nickname
                    </span>
                  </a>
                  <div className='metadata'>
                    <span className='date'>
                      reply.createTime ,'yyyy-MM-dd HH:mm'
                    </span>
                  </div>
                  <div className='text'>reply.content</div>
                  <div className='actions'>
                    <a
                      className='reply'
                      data-commentid='1'
                      data-commentnickname='yiqiandewo  th:attr=data-commentid=${reply.id}, data-commentnickname=${reply.nickname}'
                      onClick={() => {
                        console.log('reply(this)');
                      }}
                    >
                      回复
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='comment-input'>
        <div className='field'>
          <textarea name='content' placeholder='请输入评论信息...'></textarea>
        </div>
        <div className='fields'>
          <div className='field m-mobile-wide m-margin-bottom-small'>
            <i className='user icon'></i>
            <input
              type='text'
              name='nickname'
              placeholder='昵称'
              value={nickname}
            />
          </div>
          <div className='field m-mobile-wide m-margin-bottom-small'>
            <i className='mail icon'></i>
            <input type='text' name='email' placeholder='邮箱' value={email} />
          </div>
          <button
            type='button'
            className='comment-post-btn'
            onClick={handleSubmit}
          >
            <i className='edit icon'></i>发布
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
