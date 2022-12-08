import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'github-markdown-css';
import 'highlight.js/styles/atom-one-dark.css'; //css 详见https://highlightjs.org/static/demo
import './index.less';

interface TreeNode {
  hash: string;
  tag: string;
}

interface IProps {
  content?: string;
}

const MarkDown2Html: React.FC<IProps> = ({ content }) => {
  const [markdownContent, setMarkdownContent] =
    useState<string>('加载中。。。请稍后'); //html内容
  const [tocNodes, setTocNodes] = useState<TreeNode[]>([]);

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    gfm: true, // 允许 GitHub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    breaks: false, // 允许回车换行（该选项要求 gfm 为true）
    //TODO 允许支持表格语法（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
  });

  useEffect(() => {
    const html = content && marked(content);
    const nodes: TreeNode[] = [];
    html &&
      setMarkdownContent(
        html?.replace(/<(h\d.*?)>.*?<\/h\d>/g, (match, tag) => {
          const hash: string = match.replace(/<.*?>/g, '');
          nodes.push({ hash, tag });
          console.log(nodes);
          return `<a class="blog-content-anchor" href="#${hash}" id="${hash}">${match}</a>`;
        })
      );
    setTocNodes(nodes);
  }, [content]);

  const Toc = tocNodes?.map(({ hash, tag }, index) => {
    return (
      <div key={index} className='blog-table-item'>
        <a
          className={'blog-table-item-' + tag.substring(0, 2)}
          href={'#' + hash}
          onClick={(e) => handleScroll(e, hash)}
        >
          {hash}
        </a>
      </div>
    );
  });

  const handleScroll = (e: any, hash: any) => {
    console.log(e, hash);
  };

  return (
    <div v-html='content' className='markdown-body'>
      {/* {content1} */}
      <div
        className='markdown-content'
        dangerouslySetInnerHTML={{ __html: markdownContent }}
      ></div>
      <div className='blog-toc'>
        <h4>目录</h4>
        {Toc}
      </div>
    </div>
  );
};

export default MarkDown2Html;
