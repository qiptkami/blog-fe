import React, { useState } from "react";
import { Blog } from "../../../../typings/index";

const MarkDown2Html: React.FC = () => {
  const [data, setData] = useState<Blog>();
  return <div className="blog-detail"></div>;
};

export default MarkDown2Html;
