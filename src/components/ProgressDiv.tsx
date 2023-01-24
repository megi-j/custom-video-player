import styled from "styled-components";
interface ProgressDivProps {
  width: any;
}
export const ProgressDiv = styled.div<ProgressDivProps>`
  height: 100%;
  width: ${(props) => props.width}
  background-color: #fff;
  border-radius: 20px;
`;
