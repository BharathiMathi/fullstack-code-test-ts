import { useState, useEffect } from "react";
import { User } from "../model/user";

type Response = {
  data: User[];
  totalPages: number;
  isLoading: boolean;
  error: string | null;
};

const useUsersFetch = (pageNumber: number): Response => {
  const [data, setData] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    let controller = null;
    const fetchData = async () => {
      controller = new AbortController();
      try {
        setError(null);
        setIsloading(true);
        const response = await fetch(
          " https://reqres.in/api/users?page=" + pageNumber,
          {
            signal: controller.signal,
          }
        );
        const responseData = await response.json();

        setTotalPages(responseData.total_pages);
        setTimeout(() => {
          setIsloading(false);
          setData((prevData: User[]) => [...prevData, ...responseData.data]);
        }, 3000);
      } catch (e) {
        setIsloading(false);
        setError("Unable to process the request");
        if (controller) {
          controller.abort();
        }
      }
      controller = null;
    };
    fetchData();
  }, [pageNumber]);

  return { data, totalPages, isLoading, error };
};

export default useUsersFetch;
