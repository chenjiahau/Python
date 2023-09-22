import certificateStyle from '../certificate-management.module.scss';

import { useState } from 'react';

// Components
import Button from '../../../../components/Button';
import ModalContainer from '../../../../components/ModalContainer';
import InputWithUploadButton from '../../../../components/InputWithUploadButton';
import AccessPrivilege from '../../../../components/AccessPrivilege';

const dropdownSiteTagList = [
  { id: 1100, title: 'Hsinchu', isActive: true },
  { id: 1101, title: 'Kaohsiung', isActive: false },
  { id: 1102, title: 'Taipei', isActive: false },
];

const dropdownSiteList = [
  { id: 110000, title: 'Daliao', isActive: true },
  { id: 110001, title: 'Dream Mail', isActive: false },
  { id: 110002, title: 'HQ', isActive: false },
  { id: 110003, title: 'Neihu', isActive: false },
  { id: 110004, title: 'Songshan', isActive: false },
];

const AddCertificateAuthorityModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [inputSearchValue, setInputSearchValue] = useState(null);

  return (
    <ModalContainer
      modalWidthType="modal-550px"
      openModal={modalStatus.add.status}
      closeModal={() => changeModalStatus('add', false)}
    >
      <div className="header">
        <div className="title">Add certificate authority</div>
      </div>
      <div className="body">
        {/* Access privilege */}
        <div className="mb-3">
          <AccessPrivilege
            id="ca-access-privilege-dropdown"
            onChangeSearch={e => setInputSearchValue(e.target.value)}
            inputSearchValue={inputSearchValue}
            siteTagList={dropdownSiteTagList}
            siteList={dropdownSiteList}
          />
        </div>
        {/* Upload CA */}
        <div className={'sub-title mb-3'}>Upload CA</div>
        <div>
          <div className={certificateStyle['ca-modal-text']}>
            Upload your unencrypted PEM format RSA private key of the
            certificate authority (CA)
            <span className={certificateStyle['ca-modal-icon-required']}>
              *
            </span>
            <InputWithUploadButton value={''} onChange={() => {}} />
          </div>
          <div className={certificateStyle['ca-modal-text']}>
            Upload your PEM format X.509 certificate of the certificate
            authority (CA)
            <span className={certificateStyle['ca-modal-icon-required']}>
              *
            </span>
            <InputWithUploadButton value={''} onChange={() => {}} />
          </div>
        </div>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click close');
            changeModalStatus('add', false);
          }}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('add', false);
          }}
          disabled
        />
      </div>
    </ModalContainer>
  );
};

export default AddCertificateAuthorityModal;
