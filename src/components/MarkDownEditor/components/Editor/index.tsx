import React, { useEffect, useRef } from 'react';
import { createEditor } from '../config';
import './index.less';

interface IProps {
  content?: string;
  onChange?: (value: string | undefined) => void;
}

const Editor: React.FC<IProps> = ({ content, onChange }) => {
  const inputRef = useRef<any>();

  useEffect(() => {
    createEditor(content, (value: string) => {
      onChange?.(value);
    });
  }, []);

  return (
    <div className='editor'>
      <div id='editor' className='editor-container'>
        <div
          ref={inputRef}
          id='input'
          contentEditable={true}
          className='input-container'
        ></div>
        <div id='toolbar' className='toolbar-container'></div>
      </div>
      <div id='preview' className='preview-container'></div>
    </div>
  );
};

export default Editor;
