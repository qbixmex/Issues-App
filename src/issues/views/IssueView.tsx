import { Link, Navigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../hooks';
import { LoadingIcon } from '../../shared';

export const IssueView = () => {

  const params = useParams();
  const { id = "0" } = params;

  const { issueQuery, commentsQuery } = useIssue( +id );

  if (issueQuery.isLoading) {
    return (
      <LoadingIcon />
    );
  }

  if (!issueQuery.data) {
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
      <IssueComment issue={ issueQuery.data } />

      { commentsQuery.isLoading && ( <LoadingIcon className="mt-3" /> ) }

      {!commentsQuery.isLoading && (commentsQuery.data?.length as number) > 0 && (
        <>
          <h2 className="mt-5 mb-3 fst-italic" style={{ fontSize: "2rem" }}>Comments</h2>
          {commentsQuery.data?.map(issue => (
            <IssueComment key={issue.id} issue={ issue } />
          ))}
        </>
      )}
    </div>
  )
}
