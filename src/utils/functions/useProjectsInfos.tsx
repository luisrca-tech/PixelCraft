export const useProjectsInfos = (filteredTasksByProject: any[]) => {
  const currentDate = Date.now();

  const completedProjects = filteredTasksByProject.filter((item) => {
    return (
      item.dates.maxEndDate !== null && item.dates.maxEndDate < currentDate
    );
  });

  const ongoingProjects = filteredTasksByProject.filter((item) => {
    return (
      item.dates.maxEndDate !== null && item.dates.maxEndDate >= currentDate
    );
  });

  return {
    completedCount: completedProjects.length,
    ongoingCount: ongoingProjects.length,
    totalCount: filteredTasksByProject.length,
  };
};
