"use client";

import useSWR from "swr";

const fetcher = async (url: string) => {
  const results = await fetch(url);

  if (!results.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return results.json();
};

const UserList = () => {
  const {
    data,
    isLoading,
    error,
  } = useSWR("https://dummyjson.com/users", {
    fetcher,
  });

  if (isLoading) {
    return <div>User List is loading....</div>;
  }

  
  return (
    <div className="flex flex-col gap-4">
      {data?.users?.map((user) => (
        <div className="flex justify-evenly bg-amber-200 p-4">
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>
            {user.email}
          </p>
          <p>
            {user.phone}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
