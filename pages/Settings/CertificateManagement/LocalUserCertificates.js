import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';

// Components
import Button from '../../../components/Button';
import InlineTitle from '../../../components/InlineTitle';
import InputWithIcon from '../../../components/InputWithIcon';
import PaginationContainer from '../../../components/PaginationContainer';
import ConfirmationModalContainer from '../../../components/ConfirmationModalContainer';
import LocalUserCertificatesTable from './LocalUserCertificatesTable';

const defaultModalStatus = {
  resume: {
    status: false,
  },
};

const LocalUserCertificates = () => {
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  return (
    <div>
      <InlineTitle label="LOCAL USER CERTIFICATES"></InlineTitle>
      <div className="d-flex justify-content-between mt-4 mb-2">
        <ButtonGroup>
          <Button
            label="Revoke"
            className="btn-grey"
            onClick={() => console.log('revoke')}
          ></Button>
          <Button
            label="Resume"
            className="btn-grey"
            onClick={() => {
              console.log('resume');
              changeModalStatus('resume', true);
            }}
          ></Button>
          <Button
            label="Download"
            className="btn-grey"
            onClick={() => console.log('download')}
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

      <LocalUserCertificatesTable />

      <PaginationContainer
        total={4}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />

      {/* Open resume modal */}
      <ConfirmationModalContainer
        modalWidthType="modal-400px"
        title="Resume user certificate"
        description="Would you like to resume selected certificate?"
        openModal={modalStatus.resume.status}
        closeModal={() => changeModalStatus('resume', false)}
        onConfirm={() => {
          changeModalStatus('resume', false);
        }}
      />
    </div>
  );
};

export default LocalUserCertificates;
