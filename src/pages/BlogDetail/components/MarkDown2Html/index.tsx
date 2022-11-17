import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  content?: string;
}

const MarkDown2Html: React.FC<Props> = ({ content }) => {
  return (
    <div className='blog-info'>
      {content && <ReactMarkdown>{content}</ReactMarkdown>}
    </div>
  );
};

export default MarkDown2Html;
