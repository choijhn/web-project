import styled from "styled-components";

const Button = styled.button`
  background-color: #37B7C3;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #088395;
  }
  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

export default Button;