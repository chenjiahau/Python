import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';

// Table & Modal
import SamlRolesTable from './SamlRolesTable';
import AddSamlRoleModal from './modals/AddSamlRoleModal';
import EditSamlRoleModal from './modals/EditSamlRoleModal';

// Components
import Button from '../../../../components/Button';
import InlineTitle from '../../../../components/InlineTitle';
import PaginationContainer from '../../../../components//PaginationContainer';
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

const SamlRoles = () => {
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  return (
    <div className="mb-5">
      <InlineTitle label="SAML ROLES" isNonUnderline />
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

      <SamlRolesTable changeModalStatus={changeModalStatus} />

      <PaginationContainer
        total={1}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />

      {/* Add modal */}
      <AddSamlRoleModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType="modal-400px"
        title="Delete SAML roles"
        description="Do you want to delete selected SAML roles?"
        openModal={modalStatus.delete.status}
        closeModal={() => changeModalStatus('delete', false)}
        onConfirm={() => changeModalStatus('delete', false)}
      />

      {/* Edit modal */}
      <EditSamlRoleModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default SamlRoles;
