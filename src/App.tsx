import { useState } from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "./components/loader/LoadingSpinner";
import UserComponent from "./components/user/User";
import useUsersFetch from "./hooks/useUsersFetch";
import { Text } from "./components/shared/styled-components/Text";

function App() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {
    data: usersData,
    totalPages,
    isLoading,
    error,
  } = useUsersFetch(pageNumber);

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <>
      <Text bgColor="#d4d4d4" fontWeight="bold" height="40px">
        Users
      </Text>
      {error && (
        <Text fontWeight="bold" height="60px">
          {error}
        </Text>
      )}
      {isLoading && <LoadingSpinner />}
      <div id="scrollableDiv" style={{ height: "94vh", overflow: "auto" }}>
        <InfiniteScroll
          dataLength={usersData.length}
          next={fetchMoreData}
          hasMore={totalPages > pageNumber}
          loader={""}
          scrollableTarget="scrollableDiv"
          endMessage={
            !isLoading &&
            totalPages === pageNumber && (
              <Text fontWeight={400} height="80px">
                No more data ...
              </Text>
            )
          }
        >
          {usersData.map((user) => (
            <div className="user_container" key={user.id}>
              <UserComponent user={user} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default App;
