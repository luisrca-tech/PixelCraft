import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 4rem;
  margin-top: 10rem;
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  > p {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 600;
    color: ${theme.COLORS.PRIMARY};
  }

  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;
