import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { getIssueInfo, getIssuesComments } from '../hooks/useIssue';

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
            queryKey: [ "issue", issueNumber ],
            queryFn: () => getIssueInfo(issueNumber),
        });

        queryClient.prefetchQuery({
            queryKey: [ "issue", issueNumber, "comments" ],
            queryFn: () => getIssuesComments(issueNumber),
        });
    };

    const presetData = () => {
        queryClient.setQueryData(
            [ "issue", issueNumber ],
            issue
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
                    <span>{ issue.title } ...</span>
                    <span className="issue-subinfo">#{issue.number} opened {`2`} days ago by <span className='fw-bold'>{ issue.user.login }</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{ issue.comments }</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    );

};
