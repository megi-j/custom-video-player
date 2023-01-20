import styled from "styled-components";
import play from "./images/play-button.png";
import left from "./images/left.png";
import right from "./images/fast-forward.png";
import { useRef } from "react";
const videoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f3/Big_Buck_Bunny_first_23_seconds_1080p.ogv/Big_Buck_Bunny_first_23_seconds_1080p.ogv.1080p.vp9.webm";

function App() {
  const videoRef = useRef<any>(null);

  return (
    <Container>
      <video ref={videoRef}>
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
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
`;
const PlayBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
