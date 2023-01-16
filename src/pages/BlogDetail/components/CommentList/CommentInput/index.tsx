import React, { useEffect, useState } from 'react';
import { Comment } from '../../../../../typings/index';
import classNames from 'classnames';
import './index.less';

interface IProps {
  isReply: boolean;
  parent?: Comment;
  bid?: number;
  uname?: string;
  uEmail?: string;
  handleSubmit: (
    nickname: string,
    content: string,
    email: string,
    parentCommentId: number
  ) => void;
}

const CommentInput: React.FC<IProps> = ({
  isReply,
  parent,
  uname,
  uEmail,
  handleSubmit,
}) => {
  useEffect(() => {
    //不为空说明为管理员评论
    uname && setNickname(uname);
    uEmail && setEmail(uEmail);
  }, [uname, uEmail]);

  // const [replyPid, setReplyPid] = useState<number>();
  const [content, setContent] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div
      className={classNames(
        'comment-input',
        isReply ? 'comment-input-reply' : ''
      )}
    >
      <div className='comment-input-textarea'>
        <textarea
          className='comment-input-textarea-content'
          name='content'
          value={content}
          placeholder={
            isReply ? `回复@${parent?.nickname}：` : '写下你的评论...'
          }
          onChange={(e) => handleContentChange(e)}
        ></textarea>
      </div>
      <div className='comment-input-info'>
        <div className='comment-input-name'>
          <i className={classNames('iconfont', 'icon-user')}>&#xe7ae;</i>
          <input
            className='comment-input-name-content'
            type='text'
            name='nickname'
            placeholder='昵称'
            value={nickname}
            onChange={(e) => handleNameChange(e)}
          />
        </div>
        <div className='comment-input-email'>
          <i className={classNames('iconfont', 'icon-email')}>&#xe66f;</i>
          <input
            className='comment-input-email-content'
            type='text'
            name='email'
            placeholder='邮箱'
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
        </div>
        <button
          type='button'
          className='comment-post-btn'
          onClick={() =>
            handleSubmit(nickname, content, email, parent?.id ?? 0)
          }
        >
          <i className={classNames('iconfont', 'icon-post')}>&#xe711;</i>
          <span className='comment-post-btn-info'>发布</span>
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
