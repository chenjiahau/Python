import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';

// Table & Modal
import TrustedIdentityProviderTable from './TrustedIdentityProviderTable';
import AddTrustedIdentityProviderModal from './modals/AddTrustedIdentityProviderModal';
import EditTrustedIdentityProviderModal from './modals/EditTrustedIdentityProviderModal';

// Components
import Button from '../../../../components/Button';
import InlineTitle from '../../../../components/InlineTitle';
import ConfirmationModalContainer from '../../../../components/ConfirmationModalContainer';

const defaultModalStatus = {
  add: {
    status: false,
    disabled: false,
  },
  delete: {
    status: false,
    disabled: true,
  },
  edit: {
    status: false,
    disabled: false,
  },
};

const TrustedIdentityProvider = () => {
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  return (
    <div className="mb-5">
      <InlineTitle label="TRUSTED IDENTITY PROVIDER ( IDP )" isNonUnderline />
      <div className="d-flex justify-content-between mt-3 mb-2">
        <ButtonGroup>
          <Button
            label="Add"
            className="btn-grey"
            onClick={() => {
              console.log('add');
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
      </div>

      <TrustedIdentityProviderTable changeModalStatus={changeModalStatus} />

      {/* Add modal */}
      <AddTrustedIdentityProviderModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType="modal-400px"
        title="Delete trusted identity provider"
        description="Do you want to delete selected trusted identity provider?"
        openModal={modalStatus.delete.status}
        closeModal={() => changeModalStatus('delete', false)}
        onConfirm={() => changeModalStatus('delete', false)}
      />

      {/* Edit modal */}
      <EditTrustedIdentityProviderModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default TrustedIdentityProvider;
