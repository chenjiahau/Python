import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';


// Components
import ModalContainer from 'components/ModalContainer';
import LinkerWithA from 'components/LinkerWithA';
import PaginationContainer from 'components/PaginationContainer';

const deviceModal = props => {
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
      openModal={modalStatus.device.status}
      closeModal={() => changeModalStatus('device', false)}
      style={{ height: '300px' }}
    >
      <div className="header">
        <div className="title">Devices</div>
      </div>
      <div className="body">
        <Table responsive striped hover className="table-container">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="Firmware availability"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="site"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Product category"
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
                  label="Device name"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Device current FW version"
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Up to date</td>
              <td>Taipei</td>
              <td>Gateway</td>
              <td>DBG-X1000</td>
              <td><Link to="/cloud/configurate/gateway/device/12345">Damon_X1000</Link></td>
              <td>1.00.021</td>
              <td>1.00.021 (Latest)</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Up to date</td>
              <td>Taipei</td>
              <td>Gateway</td>
              <td>DBG-X1000</td>
              <td><Link to="/cloud/configurate/gateway/device/12345">Edward</Link></td>
              <td>1.00.021</td>
              <td>1.00.021 (Latest)</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Up to date</td>
              <td>Taipei</td>
              <td>Gateway</td>
              <td>DBG-X1000</td>
              <td><Link to="/cloud/configurate/gateway/device/12345">RCX1000</Link></td>
              <td>1.00.021</td>
              <td>1.00.021 (Latest)</td>
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

export default deviceModal;
