export function getMonthsForTask(task: { start_date?: string; due_date?: string; startDate?: Date; endDate?: Date }) {
    const taskStartDate = task.start_date ? new Date(parseInt(task.start_date)) : task.startDate;
    const taskDueDate = task.due_date ? new Date(parseInt(task.due_date)) : task.endDate;

    if (!taskStartDate || !taskDueDate) return [];

    const startMonth = taskStartDate.getMonth();
    const endMonth = taskDueDate.getMonth();
    const startYear = taskStartDate.getFullYear();
    const endYear = taskDueDate.getFullYear();
    const months = [];

    for (let year = startYear; year <= endYear; year++) {
        const start = year === startYear ? startMonth : 0;
        const end = year === endYear ? endMonth : 11;

        for (let month = start; month <= end; month++) {
            const formattedMonth = String(month + 1).padStart(2, "0");
            months.push(`${formattedMonth}-${year}`);
        }
    }

    return [...new Set(months)];
}
