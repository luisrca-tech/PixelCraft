import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useKeenSlider } from "keen-slider/react";
import { poppins } from "~/app/fonts";
import { Separate } from "~/components/surfaces/AvailableFieldsTable/styles";
import { useForecast } from "~/hooks/useForecast";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { type TasksInfosType } from "~/server/types/Clickup.type";
import { ForecastContainer, ForecastGrid, ForecastItem } from "./styles";

import "keen-slider/keen-slider.min.css";

export function MonthlyForecastTable() {
  const { getTasksInfos } = useTasksOfProject();
  const tasksCustomFields: TasksInfosType = getTasksInfos();
  const {
    calculateMonthlyForecasts,
    findEarliestAndLatestDates,
    calculateTotalMonths,
  } = useForecast();
  const monthlyForecasts = calculateMonthlyForecasts(tasksCustomFields);
  const { earliestStartDate, latestDueDate } =
  findEarliestAndLatestDates(tasksCustomFields);
  const totalMonths = calculateTotalMonths(earliestStartDate, latestDueDate) + 1
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      number: totalMonths,
      spacing: 16,
    },
  });

  return (
    <ForecastContainer>
      <ForecastGrid ref={sliderRef} className="keen-slider">
        {Array.from({ length: totalMonths + 1 }).map((_, idx) => {
          const currentMonth = addMonths(earliestStartDate, idx);
          const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1
            }`;
          return (
            <ForecastItem className="keen-slider__slide" key={idx}>
              <span>
                {format(currentMonth, "MMMM yyyy", {
                  locale: ptBR,
                })}
              </span>
              <span className={poppins.className}>
                {(monthlyForecasts as { [key: string]: number })[
                  monthKey
                ]?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || ""}
              </span>
            </ForecastItem>
          );
        })}
      </ForecastGrid>
      <Separate />
    </ForecastContainer>
  );
}
