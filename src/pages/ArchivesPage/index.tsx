import classnames from "classnames";
import moment from "moment";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getArchivesPaginationInfo } from "../../services/archivesPage";
import { Blog } from "../../typings/index";
import "./index.less";

const Archives: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [blogArchives, setBlogArchives] = useState<Blog[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getArchivesPaginationInfo({ page: 1, size: 5 }).then((res: any) => {
      if (res?.data?.status) {
        setBlogArchives(res?.data?.data?.list);
        setTotal(res?.data?.data?.total);
      }
    });
  };

  const archivesList = blogArchives.map((blog: Blog) => {
    return (
      <li className="archives-item" key={blog.id}>
        <div className="archives-timeline"></div>
        <div
          className={classnames(
            "archives-timeline-node",
            "archives-timeline-node-normal"
          )}
        ></div>
        <div className="archives-item-info">
          <div className="archives-item-content">
            <div className="archives-item-content">{blog.title}</div>{" "}
            <span className="archives-item-tag">{blog.type.name}</span>
          </div>
          <div className="archives-item-timestamp">
            {moment(blog.createTime).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>
      </li>
    );
  });

  return (
    <ul className="archives-container">
      <li className="archives-item">
        <div className="archives-timeline"></div>
        <div
          className={classnames(
            "archives-timeline-node",
            "archives-timeline-node-normal"
          )}
        ></div>
        <div className="archives-item-info">
          <div className="archives-item-content">共计 {total} 篇文章</div>
          <div className="archives-item-timestamp"></div>
        </div>
      </li>{" "}
      {archivesList}
    </ul>
  );
};

export default Archives;
