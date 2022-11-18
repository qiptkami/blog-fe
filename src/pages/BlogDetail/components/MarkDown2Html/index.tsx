import React from 'react';

interface Props {
  content?: string;
}

const MarkDown2Html: React.FC<Props> = ({ content }) => {
  return <div className='blog-info'>{content}</div>;
};

export default MarkDown2Html;
