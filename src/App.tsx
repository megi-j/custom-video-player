import styled from "styled-components";
import play from "./images/play-button.png";
import left from "./images/rewind.png";
import right from "./images/forward.png";
import setting from "./images/settings.png";
import pause from "./images/pause.png";
import { useEffect, useRef, useState } from "react";
import video360 from "./videos/360.mp4";
import video720 from "./videos/720.mp4";
const videoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f3/Big_Buck_Bunny_first_23_seconds_1080p.ogv/Big_Buck_Bunny_first_23_seconds_1080p.ogv.1080p.vp9.webm";

function App() {
  const [width, setWidth] = useState(0);
  const [currentWami, setCurrentWami] = useState<any>(0);
  const [currentWuti, setCurrentWuti] = useState<any>();
  const [settingClicked, setSettingClicked] = useState<boolean>(false);
  const [totalWami, setTotalWami] = useState<any>(0);
  const [totalWuti, setTotalWuti] = useState<any>();
  const [chosenVideoQuality, setChosenVideoQuality] = useState(360);
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef<any>(null);
  let minutes;
  let extraSeconds;
  function convertSeconds(seconds: any) {
    minutes = Math.floor(seconds / 60);
    extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    setCurrentWami(extraSeconds);
    setCurrentWuti(minutes);
  }
  useEffect(() => {
    videoRef.current.addEventListener("timeupdate", (e: any) => {
      convertSeconds(videoRef.current.currentTime.toFixed(0));
      if (Number((videoRef.current.duration.toFixed(0) / 60).toFixed(2)) < 10) {
        setTotalWuti(
          "0" + (videoRef.current.duration.toFixed(0) / 60).toFixed(0)
        );
      } else {
        setTotalWuti((videoRef.current.duration.toFixed(0) / 60).toFixed(0));
      }
      setTotalWami(
        (videoRef.current.duration.toFixed(0) / 60)
          .toString()
          .split(".")[1]
          .slice(0, 2)
      );

      setWidth(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    });
  }, []);

  function handleChange(e: any) {
    setChosenVideoQuality(e.target.value);
  }
  function backSecond() {
    setCurrentWami(Number(currentWami) - 10);
    console.log(currentWami - 10);
  }
  function forwardSecond() {
    setCurrentWami(Number(currentWami) + 10);
    console.log(currentWami + 10);
  }
  const videoHandler = (control: any) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    }
  };
  return (
    <Container>
      <MainDiv>
        {chosenVideoQuality == 360 ? (
          <Video ref={videoRef}>
            <source src={videoUrl} type="video/webm" />
          </Video>
        ) : (
          <Video ref={videoRef}>
            <source src={videoUrl} type="video/webm" />
          </Video>
        )}

        <select
          onChange={(e) => handleChange(e)}
          // value={chosenVideoQuality}
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
            {currentWuti} :<StartSecond>{currentWami}</StartSecond>
          </StartMinute>

          <BackDiv
            style={{
              width: "80%",
              height: 6,
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: 20,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${width}%`,
                backgroundColor: "#fff",
                borderRadius: 20,
              }}
            ></div>
          </BackDiv>
          <RemainMinute>
            {totalWuti} :<RemainSecond>{totalWami}</RemainSecond>
          </RemainMinute>
        </div>
        <PlayBox>
          <img
            onClick={backSecond}
            style={{ width: 32, height: 32 }}
            src={left}
            alt=""
          />
          {playing ? (
            <img onClick={() => videoHandler("pause")} src={pause} alt="" />
          ) : (
            <img
              style={{ cursor: "pointer" }}
              src={play}
              alt="play-button"
              onClick={
                () => videoHandler("play")
                // videoRef.current.paused
                //   ? videoRef.current.play()
                //   : videoRef.current.pause()
              }
            />
          )}

          <img
            onClick={forwardSecond}
            style={{ width: 32, height: 32 }}
            src={right}
            alt=""
          />
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
const RemainMinute = styled.span`
  font-size: 24px;
  font-waight: 700;
  margin-raight: 10px;
  color: #fff;
`;
const RemainSecond = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 0;
  color: #fff;
`;
