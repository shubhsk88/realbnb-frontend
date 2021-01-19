/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from "react";
import { enGB } from "date-fns/locale";
import {
  DateRangePicker,
  START_DATE,
  END_DATE,
  Modifiers,
} from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { Box, HStack, Input } from "@chakra-ui/react";
import { checkDisableDate, dateRanges } from "../utils/dateUtils";
import { Wrapper } from "./common";
export function DateRangePickerComponent() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const modifier: Modifiers = {
    disabled: (date) => checkDisableDate(date, dateRanges),
  };

  return (
    <Wrapper>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minimumDate={new Date()}
        minimumLength={1}
        format="dd MMM yyyy"
        locale={enGB}
        modifiers={modifier}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <HStack className="date-range" spacing={2}>
            <Input
              focusBorderColor="primary"
              className={"input" + (focus === START_DATE ? " -focused" : "")}
              {...startDateInputProps}
              placeholder="Check In"
            />
            <span className="date-range_arrow" />
            <Input
              focusBorderColor="primary"
              className={"input" + (focus === END_DATE ? " -focused" : "")}
              {...endDateInputProps}
              placeholder="Check Out"
            />
          </HStack>
        )}
      </DateRangePicker>
    </Wrapper>
  );
}
