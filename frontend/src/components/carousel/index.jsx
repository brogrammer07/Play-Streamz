import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import Fab from "@mui/material/Fab";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Button from "../button";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
const Card = React.memo(function (props) {
  const { data, dataIndex } = props;
  const { thumbnail, channelId, videoId, title } = data[dataIndex];
  return (
    <div
      style={{
        width: "100%",
        height: 300,
        userSelect: "none",
      }}
      className=""
    >
      <div className="w-full h-full rounded-2xl relative">
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          className="rounded-2xl"
          draggable={false}
          src={thumbnail}
        />
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-black-900 to-neutral-none opacity-80"></div>
        <div className=" absolute right-[32px] bottom-[32px]">
          <Button
            title="Live"
            icon={<SensorsOutlinedIcon />}
            type="outlined"
            accent="red"
          />
        </div>
      </div>
    </div>
  );
});
function Carousel({ images }) {
  const ref = React.useRef();
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          if (parentWidth <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={Card}
              slideWidth={parentWidth < 800 ? parentWidth - 40 : 750}
              carouselWidth={parentWidth}
              data={images}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={5}
              useGrabCursor
            />
          );
        }}
      />
      <>
        <Fab
          style={{
            position: "absolute",
            top: "40%",
            left: 10,
            zIndex: 10,
            backgroundColor: "#D48F2F",
            color: "white",
          }}
          size="small"
          onClick={() => {
            ref.current?.goBack();
          }}
        >
          <ArrowBackIosOutlinedIcon />
        </Fab>
        <Fab
          style={{
            position: "absolute",
            top: "40%",
            right: 10,
            zIndex: 10,
            backgroundColor: "#D48F2F",
            color: "white",
          }}
          size="small"
          onClick={() => {
            ref.current?.goNext(6);
          }}
        >
          <ArrowForwardIosOutlinedIcon />
        </Fab>
      </>
    </div>
  );
}
export default Carousel;
