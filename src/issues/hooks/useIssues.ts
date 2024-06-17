import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers";

type UseIssuesOptions = {
  selectedLabels: string[];
  selectedState?: State;
};

const getIssues = async (options: UseIssuesOptions): Promise<Issue[]> => {
  const { selectedLabels, selectedState } = options;

  await sleep(2);

  const urlParams = new URLSearchParams();

  if (selectedState !== undefined) {
    urlParams.append('state', selectedState);
  }

  const { data } = await githubAPI.get<Issue[]>('/issues', {
    params: urlParams,
  });

  return data;
};

const useIssues = (options: UseIssuesOptions) => {
  const { selectedLabels, selectedState } = options;

  const issuesQuery = useQuery({
    queryKey: [
      'issues',
      {
        state: selectedState,
        labels: selectedLabels
      },
    ],
    queryFn: () => getIssues({ selectedLabels, selectedState }),
  });

  return {
    issuesQuery,
  };
};

export default useIssues;
