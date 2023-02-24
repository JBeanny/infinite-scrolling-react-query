import { useInfiniteQuery } from "react-query";

const fetchData = async (pageParam) => {
  return await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}`
  ).then((res) => res.json());
};

export const infiniteScrolling = ({ page }) => {
  return useInfiniteQuery(
    ["posts", page],
    async ({ pageParam = 1 }) => {
      const res = await fetchData(pageParam);
      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        const isLastPage = lastPage.length < 10;
        return isLastPage ? undefined : page + 1;
      },
    }
  );
};
