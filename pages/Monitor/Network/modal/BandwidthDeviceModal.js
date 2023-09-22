import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';

// Component
import { ModalContainer, PaginationContainer } from "components/";

const BandwidthDeviceModal = props => {
  const {
    modalStatus,
    changeModalStatus
  } = props;

  const { t } = useTranslation();

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus?.bandwidthDevice?.status}
      closeModal={() => changeModalStatus(modalStatus.bandwidthDevice.self, false)}
    >
      <div className="header">
        <div className="title">Devices</div>
      </div>
      <div className='body'>
        <div className='pb-5'>
          <Table responsive striped hover className='table-container'>
            <thead>
              <tr>
                <th>#</th>
                <th >Device name</th>
                <th >Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr  >
                <td>{1}</td>
                <td>DBG-X1000</td>
                <td>145.40 MB</td>
              </tr>
              <tr  >
                <td>{2}</td>
                <td>AP02</td>
                <td>0 Byte</td>
              </tr>
            </tbody>
          </Table>
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


    </ModalContainer >
  );
};

export default BandwidthDeviceModal;
