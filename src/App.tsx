import styled from "styled-components";
import play from "./images/play-button.png";
import left from "./images/left.png";
import right from "./images/fast-forward.png";
import { useEffect, useRef, useState } from "react";
const videoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f3/Big_Buck_Bunny_first_23_seconds_1080p.ogv/Big_Buck_Bunny_first_23_seconds_1080p.ogv.1080p.vp9.webm";

function App() {
  const [width, setWidth] = useState(0);
  const [currentWami, setCurrentWami] = useState<any>("00");
  const [currentWuti, setCurrentWuti] = useState<any>("00");

  const videoRef = useRef<any>(null);

  useEffect(() => {
    videoRef.current.addEventListener("timeupdate", (e: any) => {
      setCurrentWami(videoRef.current.currentTime.toFixed(0));

      setWidth(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
      // setInterval(() => {
      //   setWidth(growWidth);
      // }, 1000);
      // console.log("%: " + growWidth);
    });
  }, []);

  return (
    <Container>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: "100%",
          }}
        >
          <source src={videoUrl} type="video/webm" />
        </video>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: "100px",
            border: "2px solid red",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 700 }}>
            {currentWuti} :
            <span style={{ fontSize: 24, fontWeight: 700, marginLeft: 0 }}>
              {currentWami < 10 ? `0${currentWami}` : currentWami}
            </span>
          </span>

          <div
            style={{
              width: "80%",
              height: 6,
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${width}%`,
                backgroundColor: "#fff",
              }}
            ></div>
          </div>
          <span style={{ fontSize: 24, fontWeight: 700 }}>
            {currentWuti} :
            <span style={{ fontSize: 24, fontWeight: 700, marginLeft: 0 }}>
              {Number((videoRef.current?.duration - currentWami).toFixed(0)) <
              10
                ? `0${(videoRef.current?.duration - currentWami).toFixed(0)}`
                : (videoRef.current?.duration - currentWami).toFixed(0)}
            </span>
          </span>
        </div>
        <PlayBox>
          <img style={{ width: 32, height: 32 }} src={left} alt="" />
          <img
            style={{ cursor: "pointer" }}
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
      </div>
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;
const PlayBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  border: 3px solid green;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
`;
