import React from 'react';
import { marked } from 'marked';

interface Props {
  content?: string;
}

const MarkDown2Html: React.FC<Props> = ({ content }) => {
  return <div className='blog-info'>{content && marked.parse(content)}</div>;
};

export default MarkDown2Html;
