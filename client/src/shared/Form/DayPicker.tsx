import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import styled from "styled-components";

export const DatePicker = styled(DayPicker)`
  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff;
    color: #4a90e2;
  }
  .DayPicker-Day {
    border-radius: 0;
  }
  .DayPicker-Day--start {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }
  .DayPicker-Day--end {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }
`;
