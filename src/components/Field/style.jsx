import styled from "styled-components";

export const FieldStyle = styled.div`
  &.error {
    .form-control {
      border-color: red;
      color: red;
      ::placeholder {
        color: red;
      }
    }
  }
`;

export const ErrorText = styled.span`
  position: absolute;
  color: red;
  font-size: 0.875rem;
  font-style: italic;
  left: 0;
  top: 100%;
`;
