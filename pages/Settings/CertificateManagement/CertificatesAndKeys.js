import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';

// Table & Modal
import CertificatesAndKeysTable from './CertificatesAndKeysTable';
import AddCertificateAndKeysModal from './modals/AddCertificateAndKeysModal';
import ViewCertificateAndKeysModal from './modals/ViewCertificateAndKeysModal';
import UpdateCertificateAndKeysModal from './modals/UpdateCertificateAndKeysModal';

// Components
import Button from '../../../components/Button';
import InlineTitle from '../../../components/InlineTitle';
import InputWithIcon from '../../../components/InputWithIcon';
import PaginationContainer from '../../../components/PaginationContainer';
import ConfirmationModalContainer from '../../../components/ConfirmationModalContainer';

const defaultModalStatus = {
  add: {
    status: false,
    disabled: false,
  },
  delete: {
    status: false,
    disabled: true,
  },
  view: {
    status: false,
    disabled: false,
  },
  update: {
    status: false,
    disabled: false,
  },
};

const CertificatesAndKeys = () => {
  const [dataName, setDataName] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  return (
    <div className="mb-5">
      <InlineTitle label="CERTIFICATES AND KEYS"></InlineTitle>
      <div className="d-flex justify-content-between mt-4 mb-2">
        <ButtonGroup>
          <Button
            label="Add"
            className="btn-grey"
            onClick={() => {
              console.log('add CA');
              changeModalStatus('add', true);
            }}
          ></Button>
          <Button
            label="Delete"
            className="btn-grey"
            onClick={() => {
              console.log('delete');
              changeModalStatus('delete', true);
            }}
            disabled
          ></Button>
        </ButtonGroup>

        <InputWithIcon
          type="search"
          placeholder="Search"
          iconPosition="left"
          iconClassName="icon-search"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </div>

      <CertificatesAndKeysTable
        changeModalStatus={changeModalStatus}
        getName={name => setDataName(name)}
        getType={type => setDataType(type)}
      />

      <PaginationContainer
        total={7}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />

      {/* Add modal */}
      <AddCertificateAndKeysModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType="modal-400px"
        title="Delete certificate"
        description="Would you like to delete selected certificate?"
        openModal={modalStatus.delete.status}
        closeModal={() => changeModalStatus('delete', false)}
        onConfirm={() => {
          changeModalStatus('delete', false);
        }}
      />

      {/* View modal */}
      <ViewCertificateAndKeysModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        dataName={dataName}
        dataType={dataType}
      />

      {/* Update modal */}
      <UpdateCertificateAndKeysModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        dataName={dataName}
        dataType={dataType}
      />
    </div>
  );
};

export default CertificatesAndKeys;
