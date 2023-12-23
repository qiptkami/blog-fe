import React, { useCallback, useRef, useEffect } from 'react';
import Loading from '../Loading';

import './index.less';

interface Props {
  next: (param?: any) => any;
  children?: React.ReactNode;
  hasMore?: boolean;
  msg?: string;
  loading?: boolean;
}

const InfiniteScroll: React.FC<Props> = ({
  next,
  children,
  hasMore,
  msg = '你已经到达世界的尽头',
  loading,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scrollFooter = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await next();
  }, [hasMore, loading, next]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const currentFooter = scrollFooter.current;

    const observer = new IntersectionObserver(async (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMore();
      }
    }, option);

    if (currentFooter) observer.observe(currentFooter);

    return () => {
      if (currentFooter) observer.disconnect();
    };
  }, [loadMore]);

  return (
    <>
      <div ref={container} className='infinite-scroll-container'>
        {children}
        {loading && (
          <div className='infinite-scroll-center'>
            <Loading size={2} />
          </div>
        )}
        {!loading && !hasMore && (
          <p className='infinite-scroll-center'>{msg}</p>
        )}
      </div>
      <div ref={scrollFooter} className='infinite-scroll-footer' />
    </>
  );
};
export default InfiniteScroll;
