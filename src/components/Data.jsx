import { useState, useEffect, useRef } from "react";
import { infiniteScrolling } from "../services/InfiniteScrolling";
import { PageChecker } from "../services/PaginationChecker";

const Data = () => {
  const [page, setPage] = useState(1);
  const {
    isLoading,
    error,
    isSuccess,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = infiniteScrolling(page);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    )
  );

  const lastPostRef = useRef();
  const setLastPostRef = (node) => {
    if (node) observer.current.observe(node);
    lastPostRef.current = node;
  };

  useEffect(() => {
    PageChecker();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {isSuccess &&
        data.pages.map((page) => {
          return page.map((post) => {
            return (
              <div key={post.id} ref={setLastPostRef}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            );
          });
        })}
      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
};

export default Data;
