import { FC } from 'react';
import { IssueItem } from './IssueItem';
import { Issue, State } from '../interfaces';

type Props = {
  issues: Issue[];
  state?: State;
  onStateChange: (state?: State) => void;
};

export const IssueList: FC<Props> = ({ issues, state, onStateChange }) => {

  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          {/* ALL */}
          <li className="nav-item">
            <a
              className={`nav-link ${!state ? 'active' : ''}`}
              onClick={() => onStateChange(undefined)}
            >
              All
            </a>
          </li>
          {/* OPEN */}
          <li className="nav-item">
            <a
              className={`nav-link ${(state === State.Open) ? 'active' : ''}`}
              onClick={() => onStateChange(State.Open)}
            >
              Open
            </a>
          </li>
          {/* CLOSED */}
          <li className="nav-item">
            <a
              className={`nav-link ${(state === State.Closed) ? 'active' : ''}`}
              onClick={() => onStateChange(State.Closed)}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map(issue => (<IssueItem key={issue.id} issue={issue} />))}
      </div>
    </div>
  );

};
