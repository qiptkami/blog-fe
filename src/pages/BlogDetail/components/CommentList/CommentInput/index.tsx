import React, { useEffect, useState } from 'react';
import { Comment } from '../../../../../typings/index';
import classNames from 'classnames';
import TextArea from '../../../../../components/Input/components/TextArea';
import './index.less';

interface IProps {
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
  parent,
  uname,
  uEmail,
  handleSubmit,
}) => {
  const [content, setContent] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isWarning, setIsWarning] = useState<boolean>(false);

  useEffect(() => {
    //不为空说明为管理员评论
    uname && setNickname(uname);
    uEmail && setEmail(uEmail);
  }, [uname, uEmail]);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className={'comment-input'}>
      <TextArea
        value={content}
        placeholder={parent ? `回复@${parent?.nickname}：` : '写下你的评论...'}
        onChange={(e) => handleContentChange(e)}
      />
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
          onClick={() => {
            if (nickname === '' || content === '') {
              setIsWarning(true);
              return;
            }
            setIsWarning(false);
            handleSubmit(nickname, content, email, parent?.id ?? 0);
          }}
        >
          <i className={classNames('iconfont', 'icon-post')}>&#xe711;</i>
          <span className='comment-post-btn-info'>发布</span>
        </button>
      </div>
      {isWarning && (
        <div className='comment-alert-warning'>
          昵称或评论信息不能为空
          <i
            className={classNames('iconfont', 'icon-close')}
            onClick={() => setIsWarning(false)}
          >
            &#xe723;
          </i>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
