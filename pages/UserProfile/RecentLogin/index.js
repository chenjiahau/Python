import recentLoginStyle from './recent-login.module.scss';

import { useState } from 'react';

import { Container, Table } from 'react-bootstrap';
import MessageBox from '../../../components/MessageBox';
import InlineTitle from '../../../components/InlineTitle';
import LinkerWithA from '../../../components/LinkerWithA';
import Checkbox from '../../../components/Checkbox';
import PaginationContainer from '../../../components/PaginationContainer';

const RecentLogin = () => {
  const defaultMessages = {
    success: null,
    error: null,
    warning: null,
  };

  const messageWordings = {
    tester: '',
  };

  const [messages, setMessages] = useState({ ...defaultMessages });
  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
    <div className="layout-container layout-container--column layout-container--fluid">
      <MessageBox
        show={!!messages.success}
        label={messages.success}
        variant="success"
        dismissible
        onClose={() => {}}
      />
      <MessageBox
        show={!!messages.danger}
        label={messages.danger}
        variant="danger"
        dismissible
        onClose={() => {}}
      />
      <MessageBox
        show={!!messages.warning}
        label={messages.warning}
        variant="warning"
        dismissible
        onClose={() => {}}
      />

      <InlineTitle label="YOUR RECENT LOGINS" />
      <Table responsive striped hover className="table-container">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <LinkerWithA
                label="Ip Address"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Location"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Date / Time"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>122.146.2.131</td>
            <td>Taipei / Taiwan</td>
            <td>11/05/2019 17:40</td>
          </tr>
          <tr>
            <td>2</td>
            <td>122.146.2.131</td>
            <td>Taipei / Taiwan</td>
            <td>11/05/2019 17:40</td>
          </tr>
        </tbody>
      </Table>

      <PaginationContainer
        total={10}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />
    </div>
  );
};

export default RecentLogin;
