import React from "react";
import styled from "styled-components";
import MovieItem from "../Movie/Item";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import Comment from "./Comment";
import { v4 as uuidv4 } from "uuid";

interface IProps {}

const WatchedList: React.FC<IProps> = ({ }) => {
  const { watchedList } = useSelector((state: RootState) => state.movie);
  
  return (
    <Wrapper>
      <List>
        {watchedList.length > 0 &&
          watchedList.map((data: any) => (
            <MovieItem movie={data} key={uuidv4()}>
              <Comment movie={data} comment={data.comment} />
            </MovieItem>
          ))}
      </List>
    </Wrapper>
  );
};
export default WatchedList;
const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`;
const NextNoti = styled.div``;
const List = styled.ul`
  border: 1px solid black;
`;
