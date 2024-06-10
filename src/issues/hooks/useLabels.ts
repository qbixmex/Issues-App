import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api";
import { Label } from "../interfaces";
import { sleep } from "../../helpers";

const fetchLabels = async (): Promise<Label[]> => {
  await sleep(3);
  const { data } = await githubAPI.get<Label[]>("/labels");
  return data;
};

const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: fetchLabels,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 60, // 1 hour
    // initialData: [],
    placeholderData: [
      {
        id: 52079258,
        node_id: "MDU6TGFiZWw1MjA3OTI1OA==",
        url: "https://api.github.com/repos/facebook/react/labels/Difficulty:%20starter",
        name: "Difficulty: starter",
        color: "94ce52",
        default: false,
      },
      {
        id: 6344006318,
        node_id: "LA_kwDOAJy2Ks8AAAABeiHarg",
        url: "https://api.github.com/repos/facebook/react/labels/fb-exported",
        name: "fb-exported",
        color: "ededed",
        default: false,
      }
    ]
  });


  return {
    labelsQuery
  };
};

export default useLabels;
