import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';

const SummaryBox = styled.div`
    font-family: AbeeZee;
    border-radius: 4px;
    margin-top: 60px;
    margin-left: 50px;
    margin-right: 100px;
    width:80%;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border: none ;
`;

const TodayLine = styled.div`
    border: none;
    border-radius: 6px;
    margin: 20px 30px;
    padding: 10px 30px;
    background: #d6d5fb;
    &:nth-child(2n){
        background: #e0dfdf;
    }
`;

function TodayLines({summaryData}){
  const [numOfDates, setNumOfDays] = useState('');
  const [curDate, setCurDate] = useState(new window.Date());
  //const arrOfDates = [1,2,3,4,5,6,7];
  moment.locale('ko');

  //현재 날짜가 속한 달의 일수를 구함
  const getNumOfDates = () =>{
    setNumOfDays(moment(curDate).daysInMonth());
  }
  // const setTodayLines = () =>{
  //   for(var i=0; i<numOfDates; i++){
  //     //arrOfDates.push({date: i+1 , text: null})
  //   }
  //   console.log(arrOfDates);
  // }

  return(
    <>
      <SummaryBox>
        {summaryData.map(it =>(
          <TodayLine>
            <div>{it.dataList}</div>
            <div>{it.summaryList}</div>
          </TodayLine>
        ))}
      </SummaryBox>
    </>
  );
}

export default TodayLines;