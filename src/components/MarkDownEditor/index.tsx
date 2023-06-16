import { useEffect } from 'react';
import { createEditor } from './config';
import './index.less';

interface IProps {
  content?: string;
}

const Editor: React.FC<IProps> = ({ content = '' }) => {
  useEffect(() => {
    createEditor();
  }, []);
  return (
    <div className='editor'>
      <div id='editor' className='editor-container'>
        <div
          id='input'
          contentEditable={true}
          className='input-container'
        ></div>
        {/* <div id='toolbar' className='toolbar-container'></div> */}
      </div>
      <div id='preview' className='preview-container'></div>
    </div>
  );
};

export default Editor;
