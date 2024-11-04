import {
  addMonths,
  differenceInMonths,
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

      const fullMonthValue = Number((hoursNumber * valueByHourNumber).toFixed(2));

      const fullMonths = differenceInMonths(taskDueDate, taskStartDate);
      
      for (let i = 0; i <= fullMonths; i++) {
        const currentMonth = addMonths(startMonth, i);
        const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`;
        const daysInCurrentMonth = getDaysInMonth(currentMonth);

        if (i === 0) {
          const remainingDays = daysInCurrentMonth - taskStartDate.getDate() + 1;
          const percentage = Number((remainingDays / daysInCurrentMonth).toFixed(4));
          const monthValue = Number((fullMonthValue * percentage).toFixed(2));
          monthlyForecasts[monthKey] = Number(((monthlyForecasts[monthKey] || 0) + monthValue).toFixed(2));
          continue;
        }

        if (i === fullMonths && !isSameMonth(taskStartDate, taskDueDate)) {
          const percentage = Number((taskDueDate.getDate() / daysInCurrentMonth).toFixed(4));
          const monthValue = Number((fullMonthValue * percentage).toFixed(2));
          monthlyForecasts[monthKey] = Number(((monthlyForecasts[monthKey] || 0) + monthValue).toFixed(2));
          continue;
        }

        if (!isSameMonth(currentMonth, taskStartDate) && !isSameMonth(currentMonth, taskDueDate)) {
          monthlyForecasts[monthKey] = Number(((monthlyForecasts[monthKey] || 0) + fullMonthValue).toFixed(2));
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
