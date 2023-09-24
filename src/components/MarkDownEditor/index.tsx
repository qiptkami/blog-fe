import React from 'react';
import Editor from './components/Editor';
import './index.less';

interface IProps {
  content?: string;
  onChange?: (value: string | undefined) => void;
}

const MarkDownEditor: React.FC<IProps> = ({ content, onChange }) => {
  return content === '' || content ? (
    <Editor className='markdown-editor' content={content} onChange={onChange} />
  ) : null;
};

export default MarkDownEditor;
