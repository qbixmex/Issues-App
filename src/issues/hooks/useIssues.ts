import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api";
import { Issue } from "../interfaces";

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubAPI.get<Issue[]>("/issues");
  // console.log(data);
  return data;
};

const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  return {
    issuesQuery,
  };
};

export default useIssues;
