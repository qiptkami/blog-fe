import React, { useCallback, useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'github-markdown-css';
import 'highlight.js/styles/atom-one-dark.css'; //css 详见https://highlightjs.org/static/demo
import './index.less';

interface TreeNode {
  hash: string;
  tag: string;
  suffix: string;
}

interface IProps {
  content?: string;
}

const MarkDown2Html: React.FC<IProps> = ({ content }) => {
  const [markdownContent, setMarkdownContent] =
    useState<string>('加载中。。。请稍后'); //html内容
  const [tocNodes, setTocNodes] = useState<TreeNode[]>([]);
  const blogBody = useRef<any>();
  const [checkedTitle, setCheckedTitle] = useState<string>();

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
    let i: number = 0;
    html &&
      setMarkdownContent(
        html?.replace(/<(h\d.*?)>.*?<\/h\d>/g, (match, tag) => {
          i++;
          const hash: string = match.replace(/<.*?>/g, '');
          const suffix = Math.random().toString(36).slice(-6);
          nodes.push({ hash, tag, suffix });
          if (i === 1) {
            setCheckedTitle(suffix);
          }
          return `<a class="blog-content-anchor-${suffix}" href="#${hash}" id="${hash}">${match}</a>`;
        })
      );

    setTocNodes(nodes);
  }, [content]);

  useEffect(() => {}, [checkedTitle]);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      const suffix = entries[0].target.className.slice(-6);
      setCheckedTitle(suffix);
    }
  }, []);

  useEffect(() => {
    const height = window.innerHeight;
    const option = {
      root: null, //根元素必须是目标元素的祖先包含块
      rootMargin: `0px 0px -${height - 15}px 0px`,
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    tocNodes.forEach((node: any) => {
      observer.observe(
        blogBody.current.querySelector(`.blog-content-anchor-${node.suffix}`)
      );
    });

    return () => {
      observer.disconnect();
    };
  }, [handleObserver, tocNodes]);

  const Toc = tocNodes?.map(({ hash, tag, suffix }, index) => {
    return (
      <div key={index} className='blog-table-item'>
        <a
          key={index}
          className={`blog-table-item-${tag.substring(0, 2)}`}
          href={'#' + hash}
          onClick={(e) => handleScroll(e, hash, suffix)}
        >
          <span
            className={
              checkedTitle === suffix
                ? `blog-table-item-${tag.substring(0, 2)}-checked`
                : ''
            }
          >
            {hash}
          </span>
        </a>
      </div>
    );
  });

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    hash: string,
    suffix: string
  ) => {
    setCheckedTitle(suffix);
  };

  return (
    <>
      <div v-html='content' className='markdown-body'>
        <div
          className='markdown-content'
          ref={blogBody}
          dangerouslySetInnerHTML={{ __html: markdownContent }}
        ></div>
        <div className='blog-toc'>
          <h4>目录</h4>
          {Toc}
        </div>
      </div>
    </>
  );
};

export default MarkDown2Html;
