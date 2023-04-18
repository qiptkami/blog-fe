import { marked } from 'marked';
import { useEffect, useState } from 'react';
import './index.less';
interface IProps {
  content?: string;
}

const Editor: React.FC<IProps> = ({ content = '' }) => {
  const [content1, setContent1] = useState<string>('');
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    setHtml(content && marked(content));
  }, [content]);
  useEffect(() => {
    setHtml(content1 && marked(content1));
  }, [content1]);
  return (
    <>
      <div className='editor-container'>
        <textarea
          className='editor'
          value={content1}
          onChange={(e) => {
            setContent1(e.target.value);
          }}
        />
        <div
          className='markdown-content'
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </>
  );
};

export default Editor;
