import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../shared';
import { State } from '../interfaces';

export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery: { isLoading, data } } = useIssues();

  const onLabelChange = (labelName: string) => {
    (selectedLabels.includes(labelName))
      ? setSelectedLabels( prev => prev.filter(label => label !== labelName) )
      : setSelectedLabels([ ...selectedLabels, labelName ]);
  };

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          isLoading
            ? ( <LoadingIcon /> )
            : (
              <IssueList
                issues={ data ?? [] }
                state={state}
                onStateChange={(newState) => setState(newState)}
              />
            )
        }
      </div>
      
      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  )
}
