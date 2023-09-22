import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';


// Components
import ModalContainer from 'components/ModalContainer';
import LinkerWithA from 'components/LinkerWithA';
import PaginationContainer from 'components/PaginationContainer';

const ViewModal = props => {
  const { modalStatus, changeModalStatus } = props;

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
    <ModalContainer
      modalWidthType="modal-750x"
      openModal={modalStatus.view.status}
      closeModal={() => changeModalStatus('view', false)}
      style={{ height: '300px' }}
    >
      <div className="header">
        <div className="title">Schedule policy details</div>
      </div>
      <div className="body">
        <Table responsive striped hover className="table-container">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="Site"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Model name"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Device"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Current FW version"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Target FW version"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Auto-upgrade"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Upgrade schedule ( Site local time )"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Last upgrade time ( Site local time )"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Last upgraded by"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>DBA-1510P BASE</td>
              <td>DBA-1510P</td>
              <td>1</td>
              <td>2.02.004</td>
              <td>2.02.004 (Latest)</td>
              <td>Disabled</td>
              <td>2023/03/03 11:01</td>
              <td>2023/03/03 11:01</td>
              <td>cctseng1538+nttrdorgadmin@gmail.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>DBA-1510P BASE</td>
              <td>DBA-1510P</td>
              <td>1</td>
              <td>2.02.004</td>
              <td>2.02.004 (Latest)</td>
              <td>Disabled</td>
              <td>2023/03/03 11:01</td>
              <td>2023/03/03 11:01</td>
              <td>cctseng1538+nttrdorgadmin@gmail.com</td>
            </tr>
            <tr>
              <td>3</td>
              <td>DBA-1510P BASE</td>
              <td>DBA-1510P</td>
              <td>1</td>
              <td>2.02.004</td>
              <td>2.02.004 (Latest)</td>
              <td>Disabled</td>
              <td>2023/03/03 11:01</td>
              <td>2023/03/03 11:01</td>
              <td>cctseng1538+nttrdorgadmin@gmail.com</td>
            </tr>
          </tbody>
        </Table>
        <div style={{ height: '50px' }}>
          <PaginationContainer
            total={7}
            onPageChange={currentPageNum =>
              console.log('onPageChange', currentPageNum)
            }
            onEntryLimitChange={currentPageNum =>
              console.log('onEntryLimitChange', currentPageNum)
            }
          />
        </div>
      </div>
    </ModalContainer>
  );
};

export default ViewModal;
