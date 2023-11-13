import { marked } from 'marked';

const toolBarConfig = [
  {
    id: '1',
    title: 'Text',
    children: [
      {
        id: '1-1',
        key: 'h1',
        name: '一级标题',
        prefix: '#',
      },
      {
        id: '1-2',
        key: 'h2',
        name: '二级标题',
        prefix: '##',
      },
      {
        id: '1-3',
        key: 'h3',
        name: '三级标题',
        prefix: '###',
      },
      {
        id: '1-4',
        key: 'h4',
        name: '四级标题',
        prefix: '####',
      },
      {
        id: '1-5',
        key: 'h5',
        name: '五级标题',
        prefix: '#####',
      },
      {
        id: '1-6',
        key: 'h6',
        name: '六级标题',
        prefix: '######',
      },
      {
        id: '1-7',
        key: 'codeblock',
        name: '代码块',
        prefix: '``` ```',
      },
      { id: '1-8', key: 'quote', name: '引用' },
      {
        id: '1-9',
        key: 'divider',
        name: '分割线',
        prefix: '---',
      },
    ],
  },
  {
    id: '2',
    title: 'Style',
    children: [
      {
        id: '2-1',
        key: 'bold',
        name: '加粗',
        prefix: '** **',
      },
      {
        id: '2-2',
        key: 'italic',
        name: '斜体',
      },
      {
        id: '2-3',
        key: 'underline',
        name: '下划线',
      },
      {
        id: '2-4',
        key: 'strikethrough',
        name: '删除线',
      },
    ],
  },
  {
    id: '3',
    title: 'List',
    children: [
      {
        id: '3-1',
        key: 'unnumberedList',
        name: '无序列表',
      },
      {
        id: '3-2',
        key: 'numberedList',
        name: '有序列表',
      },
      {
        id: '3-3',
        key: 'todoList',
        name: '任务列表',
      },
    ],
  },
  {
    id: '4',
    title: 'Image',
    children: [
      {
        id: '4-1',
        key: 'image',
        name: '插入图片',
      },
    ],
  },
];

let editorRef;
let viewRef;
let inputRef;
let toolbarRef;

function createToolbar() {
  const toolbar = document.createElement('div');
  for (let i = 0; i < toolBarConfig.length; i++) {
    const item = toolBarConfig[i];
    const toolBarItem = document.createElement('div');
    toolBarItem.className = 'toolbar-item';
    toolBarItem.setAttribute('key', item.id);

    const toolBarItemNav = document.createElement('span');
    toolBarItemNav.className = 'toolbar-item-nav';
    toolBarItemNav.textContent = item.title;
    toolBarItem.appendChild(toolBarItemNav);

    const toolBarItemOptions = document.createElement('div');
    toolBarItemOptions.className = 'toolbar-item-options';

    for (let j = 0; j < item.children.length; j++) {
      const option = item.children[j];
      const optionsItem = document.createElement('div');
      optionsItem.className = 'options-item';
      optionsItem.setAttribute('key', option.id);

      if (option.key) {
        const optionsItemIcon = document.createElement('img');
        optionsItemIcon.src = `../../assets/markdownjs/img/${option.key}.png`;
        optionsItemIcon.alt = '';
        optionsItemIcon.className = 'options-item-icon';
        optionsItem.appendChild(optionsItemIcon);
      }

      const optionsItemName = document.createElement('span');
      optionsItemName.className = 'options-item-name';
      optionsItemName.textContent = option.name;
      optionsItem.appendChild(optionsItemName);

      toolBarItemOptions.appendChild(optionsItem);
    }

    toolBarItem.appendChild(toolBarItemOptions);
    toolbar.appendChild(toolBarItem);
  }
  toolbarRef.appendChild(toolbar);
  toolbarRef.style.display = 'none';
}

export const createEditor = (callback) => {
  editorRef = document.getElementById('editor');
  viewRef = document.getElementById('preview');
  inputRef = document.getElementById('input');
  toolbarRef = document.getElementById('toolbar');

  function onClickOption() {
    //获取光标选中
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    console.log(range);
  }

  viewRef.addEventListener('click', () => {
    onClickOption();
  });

  toolbarRef && createToolbar();
  inputRef.addEventListener('input', function (event) {
    const updatedContent = event.target.innerText;
    callback && callback(event.target.innerText);
    viewRef.innerHTML = marked.parse(updatedContent);
    const suffix = updatedContent.slice(-2);
    const reg = /^\s$/; //字符是否是空格、制表符或换行符。
    if (
      updatedContent.slice(-1) === '/' &&
      (suffix.length === 1 || (suffix.length === 2 && reg.test(suffix[0])))
    ) {
      const toolbarHeight = 400;
      const toolbarWidth = 200;
      const selection = document.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getClientRects()[0];
      const containerRect = inputRef.getBoundingClientRect();
      const right = containerRect.right - rect.right;
      toolbarRef.style.left =
        right > toolbarWidth
          ? `${rect.left}px`
          : `${rect.left - toolbarWidth + 20}px`;

      if (rect.top > toolbarHeight) {
        toolbarRef.style.bottom = `${rect.top}px`;
      } else {
        toolbarRef.style.top = `${rect.bottom}px`;
      }
      toolbarRef.style.display = 'block';
    } else {
      toolbarRef.style.display = 'none';
    }
  });

  let scrolling = '';
  function handleScroll(type) {
    if (type === 'edit') {
      if (scrolling === '') scrolling = 'edit';
      if (scrolling === 'view') return;
      viewRef.scrollTo({
        top:
          (editorRef.scrollTop /
            (editorRef.scrollHeight - editorRef.clientHeight)) *
          (viewRef.scrollHeight - viewRef.clientHeight),
      });
      const scrollTimer = setTimeout(() => {
        scrolling = ''; //滚动结束
        clearTimeout(scrollTimer);
      }, 200);
    } else {
      if (scrolling === '') scrolling = 'view';
      if (scrolling === 'edit') return;
      editorRef.scrollTop =
        (viewRef.scrollTop / (viewRef.scrollHeight - viewRef.clientHeight)) *
        (editorRef.scrollHeight - editorRef.clientHeight);
      const scrollTimer = setTimeout(() => {
        scrolling = ''; // 滚动结束
        clearTimeout(scrollTimer);
      }, 200);
    }
  }
  editorRef.addEventListener('scroll', () => {
    handleScroll('edit');
  });
  viewRef.addEventListener('scroll', () => {
    handleScroll('view');
  });
};

export const setDefaultValue = (content) => {
  inputRef.innerText = content;
  viewRef.innerHTML = marked.parse(content);
};

export const onInput = () => {};
