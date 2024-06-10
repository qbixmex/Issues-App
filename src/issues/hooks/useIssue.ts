import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces";
import { githubAPI } from "../../api";
import { sleep } from "../../helpers";

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubAPI.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssuesComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubAPI.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
};

const useIssue = (issueNumber: number) => {
  
  const issueQuery = useQuery({
    queryKey: [ "issue", issueNumber ],
    queryFn: () => getIssueInfo(issueNumber),
  });

  const commentsQuery = useQuery({
    queryKey: [ "issue", issueNumber, "comments" ],
    queryFn: () => getIssuesComments(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined,
  });

  return {
    issueQuery,
    commentsQuery,
  };
};

export default useIssue;
