import React, { useEffect, useState } from 'react';
import Input from '../../../components/Input';
import Message from '../../../components/Message/index.js';
import Modal from '../../../components/Modal';
import { addTag, editTag } from '../../../services/tagService';
import { Tag } from '../../../typings/index';

import './index.less';

interface IProps {
  visible?: boolean;
  editInfo?: Tag;
  onOk?: () => void;
  onCancel?: () => void;
}

const TagModal: React.FC<IProps> = ({ visible, editInfo, onOk, onCancel }) => {
  const [tag, setTag] = useState<Tag>();

  useEffect(() => {
    if (!visible) return;
    if (editInfo?.id !== -1) {
      setTag(editInfo);
    } else {
      setTag({
        id: -1,
        name: '',
      });
    }
  }, [visible, editInfo]);

  const submit = () => {
    if (!tag) return;
    if (!tag.name) {
      Message.error('请先输入_嘻嘻', 2);
      return;
    }
    if (tag.id === -1) {
      addTag(tag).then((res: any) => {
        if (res.status === 200) {
          Message.success('新增成功_嘻嘻', 2);
          onOk?.();
        }
      });
    } else {
      editTag(tag).then((res: any) => {
        if (res.status === 200) {
          Message.success('编辑成功_嘻嘻', 2);
          onOk?.();
        }
      });
    }
  };

  return (
    <Modal
      title='tag'
      visible={visible}
      onOk={submit}
      onCancel={onCancel}
      width={300}
    >
      <Input
        value={tag?.name}
        className='tag-editor-name'
        placeholder='name'
        onChange={(value: string) => {
          setTag((prev: Tag | undefined) => {
            if (!prev) return;
            return { ...prev, name: value };
          });
        }}
      />
    </Modal>
  );
};
export default TagModal;
