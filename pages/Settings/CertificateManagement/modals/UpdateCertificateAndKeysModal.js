import certificateStyle from '../certificate-management.module.scss';

import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Components
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import RadioButton from '../../../../components/RadioButton';
import ModalContainer from '../../../../components/ModalContainer';
import DropdownWithItem from '../../../../components/DropdownWithItem';
import InputWithUploadButton from '../../../../components/InputWithUploadButton';

const dropdownIssueSignedByList = [
  { title: 'Nuclias (Expires at 2023/12/25 17:20:01)', isActive: true },
];

const dropdownUploadCsrSignedByList = [
  { title: 'Nuclias (Expires at 2023/12/25 17:20:01)', isActive: true },
];

const UpdateCertificateAndKeysModal = props => {
  const { modalStatus, changeModalStatus, dataName, dataType } = props;
  const [updateMode, setUpdateMode] = useState('issueCertificate');

  useEffect(() => {
    if (dataType === 'KEY') {
      setUpdateMode('generatePrivateKey');
    } else {
      setUpdateMode('issueCertificate');
    }
  }, [modalStatus]);

  return (
    <ModalContainer
      modalWidthType="modal-550px"
      openModal={modalStatus.update.status}
      closeModal={() => changeModalStatus('update', false)}
    >
      <div className="header">
        <div className="title">Update certificate or key</div>
      </div>
      <div className="body">
        {/* CERT mode */}
        <div style={{ display: dataType === 'KEY' && 'none' }}>
          {/* Issue certificate signing request */}
          <div>
            <div className="modal-form-title">
              <RadioButton
                id="issueCertificate"
                name="issueCertificate"
                label="Issue certificate signing request"
                checked={updateMode === 'issueCertificate'}
                labelClassName="form-title"
                onChange={() => setUpdateMode('issueCertificate')}
              />
            </div>
          </div>
          {/* Issue certificate signing request content */}
          <div
            className={`mb-1 ms-4 ${
              updateMode === 'issueCertificate' ? 'd-block' : 'd-none'
            }`}
          >
            <Row>
              <Col sm={6}>
                <div className="modal-form-title">Common name</div>
                <div className={certificateStyle['ca-modal-access-level-label']}>
                  {dataName}
                </div>
              </Col>
              <Col sm={6}>
                <div className="modal-form-title">Alternative name</div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="modal-form-title">Signed by</div>
                <div>
                  <DropdownWithItem
                    id="signed-by-dropdown"
                    type="normal"
                    selectedItem={dropdownIssueSignedByList[0]}
                    itemList={dropdownIssueSignedByList}
                    onClick={() => {}}
                  />
                </div>
              </Col>
            </Row>
          </div>

          {/* Upload CSR */}
          <div className="mt-3">
            <div className="modal-form-title">
              <RadioButton
                id="uploadCSR"
                name="uploadCSR"
                label="Upload CSR"
                checked={updateMode === 'uploadCSR'}
                labelClassName="form-title"
                onChange={() => setUpdateMode('uploadCSR')}
              />
            </div>
          </div>
          {/* Upload CSR content */}
          <div
            className={`mb-1 ms-4 ${
              updateMode === 'uploadCSR' ? 'd-block' : 'd-none'
            }`}
          >
            <Row>
              <Col sm={12}>
                <div className="modal-form-title">Signed by</div>
                <div>
                  <DropdownWithItem
                    id="upload-csr-signed-by-dropdown"
                    type="normal"
                    selectedItem={dropdownUploadCsrSignedByList[0]}
                    itemList={dropdownUploadCsrSignedByList}
                    onClick={() => {}}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="modal-form-title mt-2">
                  Upload certificate signing request (CSR)
                </div>
                <div>
                  <InputWithUploadButton value={''} onChange={() => {}} />
                </div>
              </Col>
            </Row>
          </div>

          {/* Import certificate */}
          <div className="mt-3">
            <div className="modal-form-title">
              <RadioButton
                id="importCertificate"
                name="importCertificate"
                label="Import certificate"
                checked={updateMode === 'importCertificate'}
                labelClassName="form-title"
                onChange={() => setUpdateMode('importCertificate')}
              />
            </div>
          </div>
          {/* Import certificate content */}
          <div
            className={`mb-1 ms-4 ${
              updateMode === 'importCertificate' ? 'd-block' : 'd-none'
            }`}
          >
            <Row>
              <Col sm={12}>
                <div className="modal-form-title">
                  Upload PEM-encoded private key
                </div>
                <div>
                  <InputWithUploadButton value={''} onChange={() => {}} />
                </div>
              </Col>
            </Row>{' '}
            <Row>
              <Col sm={12}>
                <div className="modal-form-title required">
                  Upload PEM-encoded certificate
                </div>
                <div>
                  <InputWithUploadButton value={''} onChange={() => {}} />
                </div>
              </Col>
            </Row>{' '}
            <Row>
              <Col sm={12}>
                <div className="modal-form-title">
                  Upload PEM-encoded certificate chain
                </div>
                <div>
                  <InputWithUploadButton value={''} onChange={() => {}} />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Key mode */}
        <div style={{ display: dataType !== 'KEY' && 'none' }}>
          {/* Generate private key (DH, TLS) */}
          <div className="mt-3">
            <div className="modal-form-title">
              <RadioButton
                id="generatePrivateKey"
                name="generatePrivateKey"
                label="Generate private key (DH, TLS)"
                checked={updateMode === 'generatePrivateKey'}
                labelClassName="form-title"
                onChange={() => setUpdateMode('generatePrivateKey')}
              />
            </div>
          </div>
          {/* Generate private key (DH, TLS) content */}
          <div
            className={`mb-1 ms-4 ${
              updateMode === 'generatePrivateKey' ? 'd-block' : 'd-none'
            }`}
          >
            <Row>
              <Col sm={6}>
                <div className="modal-form-title">Key name</div>
                <div>
                  <Input
                    type="text"
                    value={dataName}
                    placeholder="1-32 characters"
                    minLength={1}
                    maxLength={32}
                    onChange={e => {}}
                    onFocus={() => {}}
                    onBlur={() => {}}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="modal-form-title">Key type</div>
                <div className={certificateStyle['ca-modal-access-level-label']}>
                  DH key
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={6}>
                <div className="modal-form-title">Key size</div>
                <div className={certificateStyle['ca-modal-access-level-label']}>
                  2048 bits
                </div>
              </Col>
            </Row>
          </div>

          {/* Import private key (DH, TLS) */}
          <div className="mt-3">
            <div className="modal-form-title">
              <RadioButton
                id="AddDevice"
                name="AddDevice"
                label="Import private key (DH, TLS)"
                checked={updateMode === 'importPrivateKey'}
                labelClassName="form-title"
                onChange={() => setUpdateMode('importPrivateKey')}
              />
            </div>
          </div>
          {/* Import private key (DH, TLS) content */}
          <div
            className={`mb-1 ms-4 ${
              updateMode === 'importPrivateKey' ? 'd-block' : 'd-none'
            }`}
          >
            <Row>
              <Col sm={6}>
                <div className="modal-form-title">Key name</div>
                <div>
                  <Input
                    type="text"
                    value=""
                    placeholder="1-32 characters"
                    minLength={1}
                    maxLength={32}
                    onChange={e => {}}
                    onFocus={() => {}}
                    onBlur={() => {}}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12}>
                <div className="modal-form-title">Upload your private key</div>
                <div>
                  <InputWithUploadButton value={''} onChange={() => {}} />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Access privilege */}
        <div className={'sub-title mt-3 mb-3'}>Access privilege</div>
        <div className="mb-3">
          <div className={certificateStyle['ca-modal-text']}>
            Access level
            <div className={certificateStyle['ca-modal-access-level-label']}>
              Organization
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click save');
            changeModalStatus('update', false);
          }}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('update', false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default UpdateCertificateAndKeysModal;
