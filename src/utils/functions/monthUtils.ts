export const getMonthName = (month?: string): string => {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const [monthNumber] = (month || "").split("-").map(Number);

    if (typeof monthNumber === "number" && monthNumber >= 1 && monthNumber <= 12) {
        return monthNames[monthNumber - 1] ?? "";
    }

    return "";
};