import { useQuery } from "@tanstack/react-query";
import { Label } from "../../interfaces";
import { githubAPI } from "../../api";

const fetchLabels = async (): Promise<Label[]> => {
  const { data } = await githubAPI.get<Label[]>("/labels");
  return data;
};

export const LabelPicker = () => {

  const labelQuery = useQuery({
    queryKey: ['labels'],
    queryFn: fetchLabels,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <span
        className="badge rounded-pill m-1 label-picker"
        style={{ border: `1px solid #ffccd3`, color: '#ffccd3' }}
      >
        Primary
      </span>
    </div>
  )
}
