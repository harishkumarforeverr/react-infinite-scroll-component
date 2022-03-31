import { List, Skeleton, message, Avatar, Divider } from "antd";
import React, { useState, useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import cdnsUrls from "../../../../../Common/CdnImage/cdnsUrls";
import { DiagnosisHeader } from "../DiagnosisHeader/DiagnosisHeader";
import Center from "./Center/Center";
import "./DaignoticCenter.scss";
import { useSelector, useDispatch } from "react-redux";
import { fecthdiagnosisCentres } from "../../../../../redux/DiagnosisModule/diagnosisCentres/CentresSlice";
import { loginValidation } from "../../../../../utills/loginValidation";
import InfiniteScrollbar from "../../../../../InfiniteScrollbar";

const centers = [
  {
    name: "Thyrocare Hyderabad",
    srcWeb: cdnsUrls.DiagnoCenter1_WEB,
    srcMobile: cdnsUrls.DiagnoCenter1_MOBILE,
  },
  {
    name: "Healthians",
    srcWeb: cdnsUrls.DiagnoCenter2_WEB,
    srcMobile: cdnsUrls.DiagnoCenter2_MOBILE,
  },
  {
    name: "Dr Lal PathLabs Hyderabad",
    srcWeb: cdnsUrls.DiagnoCenter3_WEB,
    srcMobile: cdnsUrls.DiagnoCenter3_MOBILE,
  },
  {
    name: "Aarthi Scans and Labs",
    srcWeb: cdnsUrls.DiagnoCenter4_WEB,
    srcMobile: cdnsUrls.DiagnoCenter4_MOBILE,
  },
];
let track = 0;
const DaignoticCenter = ({ setviewtype }) => {
  const [data, setData] = useState([]);

  const { diagnosisCentres } = useSelector((state) => state.Diagonsis);
  const loadMoreData = () => {
    let i = 0;
    while (track < diagnosisCentres.length && i < 5) {
      track++;
      i++;
      // setData((prevData) => [...prevData, 1]);
    }
    setData(diagnosisCentres.slice(0, track));
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  useEffect(() => {
    loadMoreData();
  }, [diagnosisCentres]);
  const history = useHistory();
  const [showSkeleton, setshowSkeleton] = useState(false);
  const dispatch = useDispatch();

  console.log("diagnosisCentres", diagnosisCentres);

  useEffect(() => {
    dispatch(fecthdiagnosisCentres());
  }, []);

  const UserLogined = loginValidation()
    ? "DaignoticCenter_login"
    : "DaignoticCenter_logout";

  return (
    <div className={`DaignoticCenter ${UserLogined}`}>
      <div className="DaignoticCenter_intro">
        <DiagnosisHeader />
      </div>
      <div className="DaignoticCenter_content">
        {/* <div className="title">
          <h3>Popular Diagnostic Centers </h3>
          <div className="divider">
            <Divider />
          </div>
        </div> */}
        <div className="allCenters">
          {/* {centers.map((obj) => {
            return (
            <Center name={obj.name} src={obj.url}  
            setviewtype={setviewtype}
            // onClick={() => history.push("/centreDteails")}
            />
            )
          })} */}
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
              hasMore={data.length < diagnosisCentres.length} // has more means its boolean
              loader={<Skeleton avatar paragraph={{ rows: 2 }} active />}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                // pagination={{ pageSize: 4, size: "small" }}
                renderItem={(item) => {
                  return (
                    <div>
                      {/* {showSkeleton && (
                
                  )} */}
                      <div
                        style={{
                          display: `${showSkeleton ? "block" : "none"}`,
                        }}
                      >
                        <Center
                          name={item.displayName}
                          srcWeb={item.logo}
                          srcMobile={item.logo}
                          info={item}
                          onClick={() => history.push("/centreDteails")}
                          setshowSkeleton={setshowSkeleton}
                        />
                      </div>
                      {!showSkeleton && (
                        <div className="centerSkelton">
                          <Skeleton active avatar paragraph={{ rows: 4 }} />
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            </InfiniteScroll>
          </div>
        </div>
        {/* <div className="showmore">
          <Button> View more </Button>
        </div> */}
      </div>
    </div>
  );
};
export default DaignoticCenter;
