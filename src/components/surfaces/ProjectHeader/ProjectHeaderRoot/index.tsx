import { useEffect } from "react";
import { Container } from "./styles";

import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { roboto } from "~/app/fonts";
import { type ProjectDates } from "~/server/types/Clickup.type";

type ProjectHeaderRoot = {
  inProjectPage?: boolean;
  projectDates?: ProjectDates;
  children?: React.ReactNode;
};

export function ProjectHeaderRoot({
  projectDates,
  inProjectPage,
  children,
}: ProjectHeaderRoot) {
  const [, setRanges] = useAtom(rangesAtom);
  const minStartDateObj = projectDates?.minStartDateObj;
  const maxEndDateObj = projectDates?.maxEndDateObj;

  useEffect(() => {
    if (!inProjectPage) return;

    setRanges((prevRanges) => ({
      ...prevRanges,
      "global-project-data": {
        ...prevRanges["global-project-data"],
        startDate: minStartDateObj,
        endDate: maxEndDateObj,
      },
    }));
  }, [minStartDateObj, maxEndDateObj, setRanges, inProjectPage]);

  return (
    <Container className={roboto.className}>
      <div>{children}</div>
    </Container>
  );
}
