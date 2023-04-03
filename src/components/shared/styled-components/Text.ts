import styled from "styled-components";

type Props = {
  bgColor?: string;
  fontWeight?: string | number;
  height?: string;
};

export const Text = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3em;
  height: ${(props) => (props.height ? props.height : "10px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
`;
