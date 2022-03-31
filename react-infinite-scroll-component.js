import React, { useState, useEffect } from "react";
import { List, message, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { original } from "@reduxjs/toolkit";
let orginal = 30;
let track = 0;
const InfiniteScrollbar = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([0]);

  const loadMoreData = () => {
    let i = 0;
    while (track < orginal && i < 5) {
      track++;
      i++;
      setData((prevData) => [...prevData, 1]);
    }
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 300,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length} // data length
        next={loadMoreData}
        hasMore={data.length < orginal} // has more means its boolean
        loader={<Skeleton avatar paragraph={{ rows: 2 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item, i) => <h1 key={item.id}>{i}</h1>}
        />
      </InfiniteScroll>
    </div>
  );
};
export default InfiniteScrollbar;
