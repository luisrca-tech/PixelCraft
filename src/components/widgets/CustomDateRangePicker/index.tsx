import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, type RangeKeyDict } from "react-date-range";
import { ptBR } from "date-fns/locale";
import { Container } from "./styles";
import "./DateRangePicker.css";
import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { stringRowAtom } from "~/@atom/ProjectStates/stringRowAtom";
import { endOfDay, startOfDay, subYears, addYears } from "date-fns";

export function CustomDateRangePicker({}) {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [stringRow] = useAtom(stringRowAtom);

  const currentRange = ranges[stringRow] || {
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
    key: `selection-${stringRow}`,
  };

  const handleSelectDate = (ranges: RangeKeyDict) => {
    if (`selection-${stringRow}` in ranges) {
      const selection = ranges[`selection-${stringRow}`];

      setRanges((prevState) => ({
        ...prevState,
        [stringRow]: {
          ...selection,
          isSelected: true,
        },
      }));
    }
  };

  const minDate = subYears(new Date(), 2);

  const maxDate = addYears(new Date(), 3);

  return (
    <Container>
      <DateRangePicker
        onChange={handleSelectDate}
        moveRangeOnFirstSelection={false}
        months={12}
        ranges={[currentRange]}
        direction="vertical"
        locale={ptBR}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Container>
  );
}
