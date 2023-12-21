import React, { useEffect, useState } from 'react';
import { Comment } from '../../../../typings/index';
import ReplyList from './ReplyList';
import CommentInput from './CommentInput';
import classNames from 'classnames';
import './index.less';

interface IProps {
  bid: number;
  list?: Comment[];
  handleSubmit: (
    nickname: string,
    content: string,
    email: string,
    parentCommentId: number
  ) => void;
}

const CommentList: React.FC<IProps> = ({ bid, list, handleSubmit }) => {
  const [parentCommentList, setParentCommentList] = useState<Comment[]>();
  const [replyParent, setReplyParent] = useState<Comment>();
  const [adminName, setAdminName] = useState<string>();
  const [adminEmail, setAdminEmail] = useState<string>();
  useEffect(() => {
    //session.getUser ? setAdminName(nickname) & setAdminEmail(email) : setAdminName('') & setAdminEmail('');
    list && buildCommentTree(list);
  }, [list]);

  const buildCommentTree = (list: Comment[]) => {
    const parentList: Comment[] = [];
    // console.log(deepClone); //延时打印
    //找出所有parent为null的
    list.forEach((item: Comment) => {
      if (!item.parentComment) {
        parentList.push(item);
        buildSubTree(item, list);
      }
    });
    setParentCommentList(parentList);
  };

  const buildSubTree = (parent: Comment, list: Comment[]) => {
    list.forEach((item: Comment) => {
      if (item?.parentComment?.id === parent.id) {
        if (!parent.replyComment) {
          parent.replyComment = [];
        }
        parent.replyComment.push(item);
        item.parentComment = parent;
        buildSubTree(item, list);
      }
    });
  };

  const getReplyParent = (pid: number) => {
    const parent = list?.find((item: Comment) => item.id === pid);
    setReplyParent(parent);
  };

  return (
    <div className='comment-container'>
      <div className='comment-title'>
        评论
        <span className='comment-num'> {list?.length || 0}</span>
      </div>
      <CommentInput
        bid={bid}
        uname={adminName}
        uEmail={adminEmail}
        handleSubmit={(
          nickname: string,
          content: string,
          email: string,
          parentId: number
        ) => {
          handleSubmit(nickname, content, email, parentId);
        }}
      />
      <ReplyList
        replyId={replyParent?.id}
        bid={bid}
        replyList={parentCommentList}
        getReplyParent={getReplyParent}
        uname={adminName}
        uEmail={adminEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CommentList;
