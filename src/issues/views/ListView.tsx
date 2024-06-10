import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../shared';


export const ListView = () => {

  const [ selectedLabels, setSelectedLabels ] = useState<string[]>([]);
  const { issuesQuery } = useIssues();
  const { isLoading, isError, isFetching, data } = issuesQuery;

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
            : ( <IssueList issues={ data ?? [] } /> )
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
