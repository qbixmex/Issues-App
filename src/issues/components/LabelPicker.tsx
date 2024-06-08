import { LoadingIcon } from "../../shared";
import { useLabels } from "../hooks";

export const LabelPicker = () => {

  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <div>
      {labelsQuery.data?.map(({ id, name, color }) => (
        <span
          key={id}
          className="badge rounded-pill m-1 label-picker"
          style={{ border: `1px solid #${color}`, color: `#${color}` }}
        >{name}</span>
      ))}
    </div>
  );
};
