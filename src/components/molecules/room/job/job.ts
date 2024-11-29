import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;

  font-size: ${toRem(14)};
`;

const MoodBox = styled.div`
  display: flex;
  gap: 5px;

  width: 100%;
  height: 40px;
`;

const Mood = styled.button`
  width: auto;
  height: 100%;
  aspect-ratio: 1;

  border: none;
  background-color: none;
`;

const JobStyle = {
  Container,
  Info,
  MoodBox,
  Mood,
};

export default JobStyle;
