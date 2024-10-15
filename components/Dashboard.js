import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
  color: white;
  min-height: 100vh;
  padding: 20px;
`;

export const Header = styled.h1`
  font-size: 36px;
  margin: 20px 0;
`;

export const BottleContainer = styled.div`
  position: relative;
  width: 150px;
  height: 350px;
  margin: 20px 0;
  border: 5px solid #fff;
  border-radius: 75px;
  overflow: hidden;
  background-color: #4a90e2;
`;

export const WaterLevel = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ percentage }) => `${percentage}%`};
  background-color: #00bfff;
  transition: height 0.5s ease;
`;

export const ProgressText = styled.div`
  text-align: center;
  margin: 10px 0;
`;

export const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;
