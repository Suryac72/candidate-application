import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch data from API request
 * @param {*} limit
 * @param {*} offset
 * @returns
 */
const buildApiEndpoint = async ({ pageParam }) => {
  const response = await fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 10,
        offset: pageParam,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Something went Wrong!");
  }

  return response.json();
};

const useJobDetails = () => {
  const {
    data,
    isLoading,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["sampleJdJSON"],
    queryFn: buildApiEndpoint,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
  });

  return {
    data,
    isLoading,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

export default useJobDetails;
