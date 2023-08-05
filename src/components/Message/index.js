import './index.css';

const message = document.createElement('div');
message.className = 'message';
document.body.appendChild(message);

const createDom = (content, icon, duration) => {
  const messageBox = document.createElement('div');

  const messageContent = document.createElement('span');
  messageBox.className = 'message-notice';
  messageBox.classList.add('show');

  icon.className = `${icon.className} message-icon`;
  messageContent.className = 'message-content';
  messageContent.textContent = content;
  messageBox.appendChild(icon);
  messageBox.appendChild(messageContent);
  message.appendChild(messageBox);
  setTimeout(() => {
    messageBox.classList.remove('show');
    messageBox.classList.add('hide'); // 添加消失动画类
    setTimeout(() => {
      messageBox.remove(); // 在动画完成后移除元素
    }, 300); // 等待0.3秒后再移除元素，与动画持续时间相同
  }, duration * 1000);
};

const Message = {
  info: (content, duration) => {
    const icon = document.createElement('i');
    icon.className = 'iconfont icon-message-info';
    createDom(content, icon, duration ?? 3);
  },
  success: (content, duration) => {
    const icon = document.createElement('i');
    icon.className = 'iconfont icon-message-success';
    createDom(content, icon, duration ?? 3);
  },
  warning: (content, duration) => {
    const icon = document.createElement('i');
    icon.className = 'iconfont icon-message-warning';
    createDom(content, icon, duration ?? 3);
  },
  error: (content, duration) => {
    const icon = document.createElement('i');
    icon.className = 'iconfont icon-message-error';
    createDom(content, icon, duration ?? 3);
  },
};

export default Message;
