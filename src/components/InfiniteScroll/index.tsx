import "./index.less";
import React, { useCallback, useRef, useState, useEffect } from "react";

interface Props {
  getData: (param?: any) => void;
  render: any;
  msg: string;
}

const InfiniteScroll: React.FC<Props> = ({ getData, render, msg }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const container = useRef<any>();
  const [page, setPage] = useState<number>(1);
  const scrollFooter = useRef<any>(null);

  const loadMore = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      await getData(page);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }, [page]);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (scrollFooter.current) observer.observe(scrollFooter.current);
  }, [handleObserver]);

  return (
    <>
      <div ref={container} className="infinite-scroll-container">
        {render()}
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}
        <span>{msg}</span>
      </div>
      <div ref={scrollFooter} className="infinite-scroll-footer" />
    </>
  );
};
export default InfiniteScroll;
