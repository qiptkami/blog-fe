import { UserOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
  getCommentInfo,
  insertComment,
} from '../../../../../services/blogPage';
import { Comment } from '../../../../../typings/index';
import './index.less';

interface IProps {
  parent?: Comment;
  bid?: number;
  uname?: string;
  uEmail?: string;
}

const CommentInput: React.FC<IProps> = ({ parent, bid, uname, uEmail }) => {
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

  const handleSubmit = () => {
    const comment: Comment = {
      nickname: nickname,
      content: content,
      email: email,
      blog: { id: bid ?? 0 },
      parentComment: { id: parent?.id ?? 0 },
    };
    insertComment(comment);
    getCommentInfo(bid ?? 0);
  };
  return (
    <div className='comment-input'>
      <div className='comment-input-textarea'>
        <textarea
          className='comment-input-textarea-content'
          name='content'
          value={content}
          placeholder={
            parent ? `回复@${parent?.nickname}：` : '请输入评论信息...'
          }
          onChange={(e) => handleContentChange(e)}
        ></textarea>
      </div>
      <div className='comment-input-info'>
        <div className='comment-input-name'>
          <UserOutlined />
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
          <MailOutlined />
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
          onClick={handleSubmit}
        >
          <EditOutlined />
          发布
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
