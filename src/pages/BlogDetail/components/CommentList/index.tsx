import React, { useEffect, useState } from 'react';
import { Comment } from '../../../../typings/index';
import ReplyList from './ReplyList';
import './index.less';
import CommentInput from './CommentInput';
import { getCommentInfo, insertComment } from '../../../../services/blogPage';
import classNames from 'classnames';

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

  const handleSubmit = (
    nickname: string,
    content: string,
    email: string,
    parentId: number
  ) => {
    const comment: Comment = {
      nickname: nickname,
      content: content,
      email: email,
      blog: { id: bid ?? 0 },
      parentComment: { id: parentId ?? 0 },
    };
    insertComment(comment);
    getCommentInfo(bid ?? 0);
  };

  return (
    <div className='comment-container'>
      <div className='comment-title'>
        <i className={classNames('iconfont', 'icon-comments')}>&#xe8e8;</i>
        评论
      </div>
      <div className='comment-list'></div>
      <CommentInput
        isReply={false}
        parent={replyParent}
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
      ></CommentInput>
      <ReplyList
        replyId={replyParent?.id}
        bid={bid}
        replyList={parentCommentList}
        getReplyParent={getReplyParent}
        uname={adminName}
        uEmail={adminEmail}
        handleSubmit={handleSubmit}
      ></ReplyList>
    </div>
  );
};

export default CommentList;
