import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { createEditor, setDefaultValue } from '../config';
import './index.less';

interface IProps {
  defaultContent?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
}

const Editor: React.FC<IProps> = ({ defaultContent, onChange, className }) => {
  const inputRef = useRef<any>();

  useEffect(() => {
    createEditor((value: string) => {
      onChange?.(value);
    });
  }, []);

  useEffect(() => {
    setDefaultValue(defaultContent || '');
  }, [defaultContent]);

  return (
    <div className={classNames(className, 'editor')}>
      <div id='editor' className='editor-container'>
        <div
          ref={inputRef}
          id='input'
          contentEditable={true}
          className='input-container'
        />
        <div id='toolbar' className='toolbar-container' />
      </div>
      <div id='preview' className='preview-container' />
    </div>
  );
};

export default Editor;
