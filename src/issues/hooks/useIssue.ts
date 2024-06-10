import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces";
import { githubAPI } from "../../api";
import { sleep } from "../../helpers";

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubAPI.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const useIssue = (issueNumber: number) => {
  sleep(2);
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  });

  return {
    issueQuery
  };
};

export default useIssue;
