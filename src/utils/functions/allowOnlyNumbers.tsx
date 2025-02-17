export const allowOnlyNumbers = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (
    !/[0-9]/.test(event.key) &&
    !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(
      event.key
    )
  ) {
    event.preventDefault();
  }
};
