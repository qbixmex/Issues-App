import { FC } from "react";
import { LoadingIcon } from "../../shared";
import { useLabels } from "../hooks";
import styles from './LabelPicker.module.css';

type Props = {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
};

export const LabelPicker: FC<Readonly<Props>> = ({ selectedLabels, onChange }) => {

  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <div>
      {labelsQuery.data?.map(({ id, name: labelName, color }) => (
        <span
          key={id}
          className={`badge rounded-pill m-1 label-picker ${ selectedLabels.includes(labelName) ? styles['label-active'] : ''}`}
          style={{ border: `1px solid #${color}`, color: `#${color}` }}
          onClick={() => onChange(labelName)}
        >{labelName}</span>
      ))}
    </div>
  );
};
