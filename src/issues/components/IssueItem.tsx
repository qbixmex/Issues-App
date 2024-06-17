import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { timeSince } from '../../helpers';
import { getIssueInfo, getIssuesComments } from '../hooks/useIssue';
import { Issue, State } from '../interfaces';

type Props = {
  issue: Issue;
};

export const IssueItem: FC<Props> = ({ issue }) => {

  const { number: issueNumber } = issue;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /** Prefetches the data for the issue and its comments */
  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issue", issueNumber],
      queryFn: () => getIssueInfo(issueNumber),
    });

    queryClient.prefetchQuery({
      queryKey: ["issue", issueNumber, "comments"],
      queryFn: () => getIssuesComments(issueNumber),
    });
  };

  const presetData = () => {
    queryClient.setQueryData(
      ["issue", issueNumber],
      issue,
      {
        updatedAt: new Date().getTime() + 1000 * 60 * 5, // 5 minutes
      }
    );
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={presetData}
    >
      <div className="card-body d-flex align-items-center">
        {
          (issue.state === State.Open)
            ? <FiInfo size={30} color="red" />
            : <FiCheckCircle size={30} color="green" />
        }

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title} ...</span>
          <span className="issue-subinfo">
            #{issue.number} opened { timeSince(`${issue.created_at}`) } ago by <span className='fw-bold'>{issue.user.login}</span>
          </span>
          <div>
            { issue.labels.map(label => (
              <p
                key={label.id}
                className="badge rounded-pill m-1 px-2 py-1 fst-italic fw-normal"
                style={{
                  backgroundColor: `#${label.color}`,
                  border: `2px solid #${label.color}`,
                  color: (label.name === 'React 19') ? 'white' : 'black',
                  fontSize: '0.75rem',
                }}
              >
                {label.name}
              </p>
            ))}
          </div>
        </div>


        <div className='d-flex align-items-center'>
          <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
          <span className='px-2'>{issue.comments}</span>
          <FiMessageSquare />
        </div>

      </div>
    </div>
  );

};
