import React, { useEffect, useState } from 'react';
import { Comment } from '../../../../typings/index';
import ReplyList from './ReplyList';
import './index.less';
import CommentInput from './CommentInput';
import { deepCloneArr } from '../../../../utils/deepClone';

interface IProps {
  bid: number;
  list?: Comment[];
}

const CommentList: React.FC<IProps> = ({ bid, list }) => {
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
      <div className='comment-title' style={{ maxWidth: '100%' }}>
        评论
      </div>
      <div className='comment-list'></div>
      <CommentInput
        parent={replyParent}
        bid={bid}
        uname={adminName}
        uEmail={adminEmail}
      ></CommentInput>
      <ReplyList
        bid={bid}
        replyList={parentCommentList}
        getReplyParent={getReplyParent}
        uname={adminName}
        uEmail={adminEmail}
      ></ReplyList>
    </div>
  );
};

export default CommentList;
