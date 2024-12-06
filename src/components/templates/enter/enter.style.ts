import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  width: 500px;

  margin: 20px 0 60px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const EnterTemplateStyle = {
  Container,
  Form,
};

export default EnterTemplateStyle;
