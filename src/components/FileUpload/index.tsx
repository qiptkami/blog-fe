import React, { useRef } from 'react';
import { imgUpload } from '../../services/imgService';

import './index.less';

const FileUpload: React.FC = () => {
  const fileUploadRef = useRef<any>(null);

  const handleFileUpload = () => {
    if (!fileUploadRef.current.files[0]) return;
    const formData = new FormData();
    formData.append('smfile', fileUploadRef.current.files[0]);
    imgUpload(formData);
  };

  return (
    <div>
      <input
        ref={fileUploadRef}
        type='file'
        id='avatar'
        name='avatar'
        accept='image/png, image/jpeg'
      />
      <div onClick={handleFileUpload}>上传文件</div>
    </div>
  );
};

export default FileUpload;
