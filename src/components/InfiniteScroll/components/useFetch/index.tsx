import { useCallback, useEffect, useState } from "react";
import { getArchivesPaginationInfo } from "../../../../services/archivesPage";

const useFetch = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendReq = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      getArchivesPaginationInfo({ page: page, size: 6 }).then((res: any) => {
        if (res?.data?.status) {
          console.log(res?.data?.data?.list);
          setList((prev) => [...prev, ...(res?.data?.data?.list as never)]);
        }
      });
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }, [page]);

  useEffect(() => {
    sendReq();
  }, [page, sendReq]);
  return { loading, error, list };
};

export default useFetch;
