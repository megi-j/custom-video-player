import styled from "styled-components";
import play from "./images/play-button.png";
import left from "./images/left.png";
import right from "./images/fast-forward.png";
import { useEffect, useRef, useState } from "react";
const videoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f3/Big_Buck_Bunny_first_23_seconds_1080p.ogv/Big_Buck_Bunny_first_23_seconds_1080p.ogv.1080p.vp9.webm";

function App() {
  const [width, setWidth] = useState(0);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    videoRef.current.addEventListener("timeupdate", (e: any) => {
      console.log(videoRef.current.width);

      setWidth(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
      // setInterval(() => {
      //   setWidth(growWidth);
      // }, 1000);
      // console.log("%: " + growWidth);
    });
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setWidth(width + 62);
  //   }, 1000);
  // }, []);
  return (
    <Container>
      <video ref={videoRef} style={{ width: "100%" }}>
        <source src={videoUrl} type="video/webm" />
      </video>
      <PlayBox>
        <img style={{ width: 32, height: 32 }} src={left} alt="" />
        <img
          src={play}
          alt="play-button"
          onClick={() =>
            videoRef.current.paused
              ? videoRef.current.play()
              : videoRef.current.pause()
          }
        />
        <img style={{ width: 32, height: 32 }} src={right} alt="" />
      </PlayBox>
      <div
        style={{ height: 20, width: `${width}%`, backgroundColor: "black" }}
      ></div>
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  border: 3px solid red;
`;
const PlayBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
