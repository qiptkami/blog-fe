import "./index.less";
import React, { useCallback, useRef, useState, useEffect } from "react";
import useFetch from "./components/useFetch";
import { Blog } from "../../typings/index";
import moment from "moment";
import classnames from "classnames";

const InfiniteScroll: React.FC = () => {
  const container = useRef<any>();
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);
  useEffect(() => {
    const option = {
      root: container.current,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  const archivesList = list.map((blog: Blog) => {
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
    <div ref={container} className="infinite-scroll-container">
      <div>{archivesList}</div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  );
};
export default InfiniteScroll;
