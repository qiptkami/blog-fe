import { UserOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Comment } from '../../../../typings/index';
import ReplyList from './ReplyList';
import './index.less';

interface IProps {
  bid: number;
  list?: Comment[];
}

const CommentList: React.FC<IProps> = ({ bid, list }) => {
  const [parentComment, setParentComment] = useState<Comment[]>();
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [commentPid, setCommentPid] = useState<number>(-1);

  useEffect(() => {
    //session.getUser ? setNickName(nickname) & setEmail(email) : setNickName('') & setEmail('');
    list && buildCommentTree(list);
  }, [list]);

  const buildCommentTree = (list: Comment[]) => {
    const [...deepClone] = list; //深拷贝
    const parentList: Comment[] = [];
    //找出所有parent为null的
    deepClone.forEach((item: Comment, index: number) => {
      if (!item.parentComment) {
        deepClone.splice(index, 1);
        parentList.push(item);
        buildSubTree(item, deepClone);
      }
    });
    setParentComment(parentList);
  };

  const buildSubTree = (parent: Comment, list: Comment[]) => {
    list.forEach((item: Comment, index: number) => {
      if (item.parentComment.id === parent.id) {
        if (!parent.replyComment) {
          parent.replyComment = [];
        }
        parent.replyComment.push(item);
        item.parentComment = parent;
        list.splice(index, 1);
        buildSubTree(item, list);
      }
    });
  };

  const replyComment = () => {
    //回复哪条评论？
    //
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    const comment = {
      nickname: '',
      content: '',
      email: '',
      blog: { id: bid },
      parentComment: { id: commentPid },
    };
    //insertComment(comment);
    //getCommentList(bid);
  };

  return (
    <div className='comment-container'>
      <div className='comment-header' style={{ maxWidth: '100%' }}>
        评论
      </div>
      <div className='comment-list'></div>
      <ReplyList replyList={parentComment}></ReplyList>
      <div className='comment-input'>
        <div className='comment-input-textarea'>
          <textarea
            className='comment-input-textarea-content'
            name='content'
            placeholder='请输入评论信息...'
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
    </div>
  );
};

export default CommentList;
