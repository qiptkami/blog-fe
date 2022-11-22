import { UserOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Comment } from '../../../../typings/index';
import ReplyList from './ReplyList';

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
    //session.getUser ? serNickName(nickname) & setEmail(email) : 'serNickName('') & setEmail('');
    list && buildCommentTree(list);
  }, [list]);

  const commentList = parentComment?.map((comment: Comment) => {
    return (
      <div className='comment-body' key={comment.id}>
        <a className='comment-avatar'>
          <img src={comment.avatar} />
        </a>
        <div className='comment-content'>
          <a className='comment-author'>
            <span>{comment.nickname}</span>
            {comment.isAdminComment && <div className=''></div>}
          </a>
          <div className='comment-date'>
            {moment(comment.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className='comment-text'>{comment.content}</div>
          <div
            className='comment-action'
            onClick={() => {
              console.log('//insertComment()');
            }}
          >
            回复
          </div>
        </div>
        <ReplyList comment={comment?.replyComment}></ReplyList>
      </div>
    );
  });

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
    console.log(parentList);
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
    <div className='comments-container'>
      <h3 className='comments-header' style={{ maxWidth: '100%' }}>
        评论
      </h3>
      <div className='comment-list'></div>
      {commentList}
      <div className='comment-input'>
        <textarea
          className='comment-input-textarea'
          name='content'
          placeholder='请输入评论信息...'
        ></textarea>
        <div className='comment-input-name'>
          <UserOutlined />
          <input
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

export default CommentList;
