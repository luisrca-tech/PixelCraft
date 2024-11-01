import {
  addMonths,
  differenceInDays,
  differenceInMonths,
  endOfMonth,
  getDaysInMonth,
  isSameMonth,
  startOfMonth,
} from "date-fns";
import { type TasksInfosType } from "~/server/types/Clickup.type";

export function useForecast() {
  function findEarliestAndLatestDates(tasks: TasksInfosType) {
    if (!tasks || tasks.length === 0) {
      return { earliestStartDate: new Date(), latestDueDate: new Date() };
    }
    let earliestStartDate = new Date(tasks[0]?.taskStartDate || new Date());
    let latestDueDate = new Date(tasks[0]?.taskDueDate || new Date());

    tasks.forEach((task) => {
      const taskStartDate = new Date(task.taskStartDate);
      const taskDueDate = new Date(task.taskDueDate);

      if (taskStartDate < earliestStartDate) {
        earliestStartDate = taskStartDate;
      }

      if (taskDueDate > latestDueDate) {
        latestDueDate = taskDueDate;
      }
    });

    return { earliestStartDate, latestDueDate };
  }

  function calculateTotalMonths(earliestStartDate: Date, latestDueDate: Date) {
    return differenceInMonths(latestDueDate, earliestStartDate);
  }

  function calculateMonthlyForecasts(tasks: TasksInfosType) {
    if (!tasks || tasks.length === 0) return [];

    const monthlyForecasts: { [key: string]: number } = {};

    tasks.forEach((task) => {
      const hoursNumber = Array.isArray(task.hours)
        ? parseFloat(task.hours[0]?.toString() || "0")
        : parseFloat(task.hours?.toString() || "0");
      const valueByHourNumber = Array.isArray(task.valueByHour)
        ? parseFloat(task.valueByHour[0]?.toString() || "0")
        : parseFloat(task.valueByHour?.toString() || "0");

      const taskStartDate = new Date(task.taskStartDate);
      const taskDueDate = new Date(task.taskDueDate);
      const startMonth = startOfMonth(taskStartDate);
      const endMonth = endOfMonth(taskDueDate);

      const fullMonths = differenceInMonths(taskDueDate, taskStartDate);
      for (let i = 0; i <= fullMonths; i++) {
        const currentMonth = addMonths(startMonth, i);
        const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`;

        if (isSameMonth(taskStartDate, taskDueDate)) {
          const daysWorked = differenceInDays(taskDueDate, taskStartDate);
          const daysInMonth = getDaysInMonth(taskStartDate);
          const monthlyValue =
            (daysWorked / daysInMonth) * hoursNumber * valueByHourNumber;

          monthlyForecasts[monthKey] =
            (monthlyForecasts[monthKey] || 0) + monthlyValue;
        } else if (taskStartDate.getDate() > 1 && i === 0) {
          const daysInMonth = getDaysInMonth(taskStartDate);
          const monthlyValueStart =
            ((daysInMonth - taskStartDate.getDate()) / daysInMonth) *
            hoursNumber *
            valueByHourNumber;

          monthlyForecasts[monthKey] =
            (monthlyForecasts[monthKey] || 0) + monthlyValueStart;
        } else if (taskDueDate.getDate() < 31 && i === fullMonths) {
          const daysInMonth = getDaysInMonth(endMonth);
          const daysWorked = daysInMonth - taskDueDate.getDate();
          const monthlyValueEnd =
            (daysWorked / daysInMonth) * hoursNumber * valueByHourNumber;

          monthlyForecasts[monthKey] =
            (monthlyForecasts[monthKey] || 0) + monthlyValueEnd;
        } else {
          // Para meses completos entre a data de início e a data de término
          monthlyForecasts[monthKey] =
            (monthlyForecasts[monthKey] || 0) + hoursNumber * valueByHourNumber;
        }
      }
    });

    return monthlyForecasts;
  }

  return {
    calculateMonthlyForecasts,
    findEarliestAndLatestDates,
    calculateTotalMonths,
  };
}
