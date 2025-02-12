type RowSpanTypes = {
  taskCustomField: string | number | string[];
  checked?: boolean;
  centralized?: boolean;
};

import { Span, Container } from "./styles";
export function RowSpan({
  taskCustomField,
  checked,
  centralized,
}: RowSpanTypes) {
  return (
    <Container checked={checked}>
      <Span centralized={centralized}>{taskCustomField}</Span>
    </Container>
  );
}
