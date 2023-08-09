import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FileUpload from '../../../components/FileUpload';
import Input from '../../../components/Input';
import InputSelect from '../../../components/Input/components/InputSelect';
import TextArea from '../../../components/Input/components/TextArea';
import MarkDownEditor from '../../../components/MarkDownEditor';
import Message from '../../../components/Message/index.js';
import { editBlog, getBlogInfo } from '../../../services/blogService';
import { getAllTag } from '../../../services/tagService';
import { Blog, Tag } from '../../../typings/index';
import './index.less';

interface IProps {}

const BlogEdit: React.FC<IProps> = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [tags, setTags] = useState<any[]>([]);

  const getBlog = (id: number) => {
    getBlogInfo(id).then((res: any) => {
      if (res.status === 200) {
        const data = res.data.value;
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

  const edit = () => {
    if (!blog) return;
    editBlog(blog).then((res: any) => {
      if (res.status === 200) {
        Message.success('编辑成功_嘻嘻', 2);
      }
    });
  };

  useEffect(() => {
    getAllTags();
    getBlog((id && parseInt(id)) || 0);
  }, [id]);

  return (
    <div className='blog-editor-container'>
      <form>
        <div className='form-item'>
          <Input
            label='title'
            className='form-item-title'
            value={blog?.title}
            onChange={(value: string) => {
              setBlog((prev: Blog | undefined) => {
                if (!prev) return;
                return { ...prev, title: value };
              });
            }}
          />
        </div>
        <div className='form-item'>
          <InputSelect
            multiple
            label='tags'
            options={tags}
            defaultValue={blog?.tags?.map((tag) => tag.id)}
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
        <div className='form-item'>
          <TextArea
            label={'description'}
            value={blog?.description}
            onChange={(value: string) => {
              setBlog((prev: Blog | undefined) => {
                if (!prev) return;
                return { ...prev, description: value };
              });
            }}
          />
        </div>
        <div className='form-item'>
          <label className='content-label'>content</label>
          <MarkDownEditor
            content={blog?.content}
            onChange={(value: string | undefined) => {
              setBlog((prev: Blog | undefined) => {
                if (!prev) return;
                return { ...prev, content: value };
              });
            }}
          />
        </div>
        {/* <FileUpload /> */}
        <button
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            edit();
          }}
        >
          onClick
        </button>
      </form>
    </div>
  );
};
export default BlogEdit;
