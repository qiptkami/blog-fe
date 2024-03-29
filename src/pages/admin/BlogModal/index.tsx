import React, { useEffect, useState } from 'react';
import FileUpload from '../../../components/FileUpload';
import Input from '../../../components/Input';
import InputSelect from '../../../components/Input/components/InputSelect';
import TextArea from '../../../components/Input/components/TextArea';
import MarkDownEditor from '../../../components/MarkDownEditor';
import Message from '../../../components/Message/index.js';
import Modal from '../../../components/Modal';
import { addBlog, editBlog, getBlogInfo } from '../../../services/blogService';
import { getAllTag } from '../../../services/tagService';
import { Blog, Tag } from '../../../typings/index';

import './index.less';

interface IProps {
  id: number;
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

const BlogModal: React.FC<IProps> = ({ id, visible, onOk, onCancel }) => {
  const [blog, setBlog] = useState<Blog>();
  const [tags, setTags] = useState<any[]>([]);

  const [defaultContent, setDefaultContent] = useState<string>('');

  useEffect(() => {
    if (!visible) return;
    getAllTags();
    if (id !== -1) {
      getBlog(id || 0);
    } else {
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) return;
      setDefaultContent('');
      setBlog({
        id: -1,
        title: '',
        description: '',
        tags: [],
        firstPicture: '',
        content: '',
        user: JSON.parse(userInfo),
      });
    }
  }, [id, visible]);

  const getBlog = (id: number) => {
    getBlogInfo(id).then((res: any) => {
      if (res.status === 200) {
        const data = res.data.value;
        setDefaultContent(data.content || '');
        setBlog({
          id: data.id || 0,
          title: data.title || '',
          description: data.description || '',
          tags: data.tags || [],
          firstPicture: data.firstPicture || '',
          content: data.content || '',
        });
      }
    });
  };
  const getAllTags = () => {
    getAllTag().then((res: any) => {
      if (res.status === 200) {
        setTags(
          res.data.value.map((item: Tag) => {
            return { value: item.id, label: item.name };
          })
        );
      }
    });
  };

  const submit = () => {
    if (!blog) return;
    if (
      !blog.title ||
      !blog.tags?.length ||
      !blog.content ||
      !blog.description
    ) {
      Message.error('请先输入_嘻嘻', 2);
      return;
    }
    if (blog.id === -1) {
      addBlog(blog).then((res: any) => {
        if (res.status === 200) {
          Message.success('新增成功_嘻嘻', 2);
          onOk?.();
        }
      });
    } else {
      editBlog(blog).then((res: any) => {
        if (res.status === 200) {
          Message.success('编辑成功_嘻嘻', 2);
          onOk?.();
        }
      });
    }
  };

  return (
    <Modal
      title='blog'
      visible={visible}
      onOk={submit}
      onCancel={onCancel}
      width={725}
    >
      <div className='blog-editor-container'>
        <form>
          <div className='form-item form-item-title'>
            <Input
              value={blog?.title}
              className='form-item-title-input'
              placeholder='title'
              onChange={(value: string) => {
                setBlog((prev: Blog | undefined) => {
                  if (!prev) return;
                  return { ...prev, title: value };
                });
              }}
            />
            <InputSelect
              multiple
              options={tags}
              placeholder='tags'
              value={blog?.tags?.map((tag) => tag.id)}
              onChange={(value: any) => {
                setBlog((prev: Blog | undefined) => {
                  if (!prev) return;
                  return {
                    ...prev,
                    tags: value.map((item: any) => {
                      const find = tags.find((tag) => tag.value === item);
                      return { id: find.value, name: find.label };
                    }),
                  };
                });
              }}
            />
          </div>
          <div className='form-item form-item-description'>
            <TextArea
              value={blog?.description}
              placeholder='description'
              onChange={(value: string) => {
                setBlog((prev: Blog | undefined) => {
                  if (!prev) return;
                  return { ...prev, description: value };
                });
              }}
            />
          </div>
          <div className='form-item form-item-upload'>
            <FileUpload
              url={blog?.firstPicture}
              onChange={(url: string) => {
                setBlog((prev: Blog | undefined) => {
                  if (!prev) return;
                  return { ...prev, firstPicture: url };
                });
              }}
            />
          </div>
          <div className='form-item form-item-content'>
            <MarkDownEditor
              defaultContent={defaultContent}
              onChange={(value: string | undefined) => {
                setBlog((prev: Blog | undefined) => {
                  if (!prev) return;
                  return { ...prev, content: value };
                });
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default BlogModal;
