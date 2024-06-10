import { Link, Navigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../hooks';
import { LoadingIcon } from '../../shared';

export const IssueView = () => {

  const params = useParams();
  const { id = "0" } = params;

  const { issueQuery } = useIssue( +id );
  const { isLoading, data } = issueQuery;

  if (isLoading) {
    return (
      <LoadingIcon />
    );
  }

  if (!data) {
    return (
      <Navigate to="./issues/list" />
    );
  }

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>

      {/* First Comment */}
      <IssueComment issue={ data } />

      {/* Other Comments */}
      {/* <IssueComment body={ comment2 } /> */}
      {/* <IssueComment body={ comment3 } /> */}
    </div>
  )
}
