import React from 'react';
import Editor from './components/Editor';
import './index.less';

interface IProps {
  defaultContent?: string;
  onChange?: (value: string | undefined) => void;
}

const MarkDownEditor: React.FC<IProps> = ({ defaultContent, onChange }) => {
  return defaultContent === '' || defaultContent ? (
    <Editor
      className='markdown-editor'
      defaultContent={defaultContent}
      onChange={onChange}
    />
  ) : null;
};

export default MarkDownEditor;
