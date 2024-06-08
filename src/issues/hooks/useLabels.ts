import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api";
import { Label } from "../interfaces";
import { sleep } from "../../helpers";

const fetchLabels = async (): Promise<Label[]> => {
  await sleep(3);
  const { data } = await githubAPI.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: fetchLabels,
    refetchOnWindowFocus: true,
  });


  return {
    labelsQuery
  };
};