import styled from "styled-components";
import play from "./images/play-button.png";
import left from "./images/left.png";
import right from "./images/fast-forward.png";
import setting from "./images/settings.png";
import { useEffect, useRef, useState } from "react";
import video360 from "./videos/360.mp4";
import video720 from "./videos/720.mp4";
import { ProgressDiv } from "./components/ProgressDiv";
// const videoUrl =
//   "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f3/Big_Buck_Bunny_first_23_seconds_1080p.ogv/Big_Buck_Bunny_first_23_seconds_1080p.ogv.1080p.vp9.webm";

function App() {
  const [width, setWidth] = useState<any>(0);
  const [currentWami, setCurrentWami] = useState<any>("00");
  const [currentWuti, setCurrentWuti] = useState<any>("00");
  const [settingClicked, setSettingClicked] = useState<boolean>(false);
  const [leftWami, setLeftWami] = useState("00");
  const [value, setValue] = useState(360);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    videoRef.current.addEventListener("timeupdate", (e: any) => {
      setCurrentWami(videoRef.current.currentTime.toFixed(0));
      // console.log(videoRef.current.duration);
      if (videoRef.current.duration > 60) {
        console.log(videoRef.current.duration);
        let time = videoRef.current.duration / 60;
        console.log(time);
        let wami = time.toString().split(".")[1].slice(0, 2);
        setLeftWami(wami);
      }
      setWidth(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    });
  }, []);
  function handleChange(e: any) {
    if (e.target.value === 720) {
      setValue(720);
      console.log(value);
    }
  }
  return (
    <Container>
      <MainDiv>
        <Video ref={videoRef}>
          <source src={video360} type="video/webm" />
        </Video>
        <select
          onChange={(e) => handleChange(e)}
          value={value}
          style={{
            width: 200,
            height: 30,
            backgroundColor: "rgba(255,255,255,0.5)",
            display: settingClicked ? "block" : "none",
            bottom: 180,
            left: "50%",
            transform: "translate(50%)",
            position: "absolute",
          }}
        >
          <option value="360">360p</option>
          <option value="720">720p</option>
        </select>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: "100px",
          }}
        >
          <StartMinute>
            {Number(currentWuti)} :
            <StartSecond>
              {currentWami < 10 ? `0${currentWami}` : currentWami}
            </StartSecond>
          </StartMinute>

          <BackDiv
            style={{
              width: "80%",
              height: 6,
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: 20,
            }}
          >
            <ProgressDiv width={width} />
          </BackDiv>
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginRight: 10,
              color: "#fff",
            }}
          >
            {currentWuti} :
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginLeft: 0,
                color: "#fff",
              }}
            >
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
          <img
            src={setting}
            alt=""
            onClick={() => setSettingClicked(!settingClicked)}
          />
        </PlayBox>
      </MainDiv>
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
const MainDiv = styled.div`
  width: 100%;
  position: relative;
`;
const Video = styled.video`
  width: 100%;
`;
const StartMinute = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 10px;
  color: #fff;
`;
const StartSecond = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 0;
  color: #fff;
`;
const BackDiv = styled.div`
  width: 80%;
  height: 6px;
  background-color: rgba(255, 255, 255.7);
  border-radius: 20px;
`;
