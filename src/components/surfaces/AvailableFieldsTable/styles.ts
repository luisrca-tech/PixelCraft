import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 13rem;
`;

export const TableTitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    color: ${theme.COLORS.DARK};
    font-size: 1rem;
    font-weight: 600;
    line-height: 28px;
    width: 33%;
    
    @media(min-width: 1024px){
    font-size: 1.2rem;
  }
  }
  > span:nth-of-type(2) {
    text-align: center;
  }
  > span:nth-of-type(3) {
    text-align: center;
  }
`;

export const Separate = styled.div`
  border: 1px solid #dadada;
  width: 100%;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.COLORS.PRIMARY};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.COLORS.DARK};
  }
`;

export const LoadingCustomFields = styled.p`
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1rem;
`;

export const TableFields = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;

  strong {
    width: 33%;
    color: ${theme.COLORS.DARK};
    font-size: 1rem;
    line-height: 28px;
    font-weight: 400;

    @media(min-width: 1024px){
    font-size: 1.2rem;
  }
  }

  span {
    width: 33%;
    text-align: center;
    color: ${theme.COLORS.DARK};
    font-size: 1rem;
    line-height: 28px;

     @media(min-width: 1024px){
      font-size: 1.2rem;
    }
  }
`;

export const IsAvailable = styled.div`
  position: absolute;
  right: 0;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 100px;
  background-color: #3cb31e;
  margin-right: 1rem;
`;

export const TableFooterCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;

  span {
    color: ${theme.COLORS.DARK};
    font-size: 1rem;
    line-height: 28px;
    font-weight: 600;
    @media(min-width: 1024px){
      font-size: 1.2rem;
    }
  }
`;
