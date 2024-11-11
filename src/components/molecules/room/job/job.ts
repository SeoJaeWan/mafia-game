import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${toRem(10)};

  width: 100%;
  height: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${toRem(10)};
  flex: 1;

  font-size: ${toRem(14)};
`;

const MoodBox = styled.div`
  display: flex;
  gap: ${toRem(5)};

  width: 100%;
  height: ${toRem(40)};
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
