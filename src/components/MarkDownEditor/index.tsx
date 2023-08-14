import React, { useEffect } from 'react';
import Editor from './components/Editor';
import './index.less';

interface IProps {
  content?: string;
  onChange?: (value: string | undefined) => void;
}

const MarkDownEditor: React.FC<IProps> = ({ content, onChange }) => {
  useEffect(() => {
    console.log(content);
  }, [content]);

  return content ? <Editor content={content} onChange={onChange} /> : null;
};

export default MarkDownEditor;
