/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactElement,
} from "react";
import { enGB } from "date-fns/locale";
import {
  DateRangePicker,
  START_DATE,
  END_DATE,
  Modifiers,
} from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { HStack, Input } from "@chakra-ui/react";

import { RangeProps } from "./BookingCard";
import { checkDisableDate, dateRanges } from "@/utils/dateUtils";
import { Wrapper } from "./common";

export function DateRangePickerComponent({
  setRange,
}: {
  setRange: Dispatch<SetStateAction<RangeProps>>;
}): ReactElement {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const modifier: Modifiers = {
    disabled: (date) => checkDisableDate(date, dateRanges),
  };
  useEffect(() => {
    if (startDate && endDate) {
      setRange((prev) => ({ ...prev, start: startDate, end: endDate }));
    }
  }, [startDate, endDate]);

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
              flex="1"
              minW="0"
              focusBorderColor="primary"
              className={"input" + (focus === START_DATE ? " -focused" : "")}
              {...startDateInputProps}
              placeholder="Check In"
            />

            <Input
              flex="1"
              minW="0"
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
