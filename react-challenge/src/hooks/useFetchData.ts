import { useEffect, useState } from "react";

export const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
};
