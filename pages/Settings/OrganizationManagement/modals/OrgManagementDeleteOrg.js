import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Components
import ConfirmationModalContainer from 'components/ConfirmationModalContainer';
import { t } from 'i18next';

const OrgManagementDeleteOrg = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <ConfirmationModalContainer
      modalWidthType="modal-400px"
      title={modalStatus.deleteOrg.label} // Delete organizaiton
      description={`${t('d8ca9a3256')} <br/> ${t('9089dd4fa4')} <br/> ${t('d2850dcdad')}`} // All devices and licenses under this organization...
      openModal={modalStatus.deleteOrg.status}
      closeModal={() => changeModalStatus('deleteOrg', false)}
      onConfirm={() => {}}
    />
  );
};

export default OrgManagementDeleteOrg;
