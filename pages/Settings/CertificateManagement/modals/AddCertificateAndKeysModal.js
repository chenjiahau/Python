import certificateStyle from '../certificate-management.module.scss';

import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Components
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import RadioButton from '../../../../components/RadioButton';
import ModalContainer from '../../../../components/ModalContainer';
import DropdownWithItem from '../../../../components/DropdownWithItem';
import InputWithUploadButton from '../../../../components/InputWithUploadButton';
import AccessPrivilege from '../../../../components/AccessPrivilege';

const dropdownIssueSignedByList = [
  { title: 'Nuclias (Expires at 2023/12/25 17:20:01)', isActive: true },
];

const dropdownUploadCsrSignedByList = [
  { title: 'Nuclias (Expires at 2023/12/25 17:20:01)', isActive: true },
];

const dropdownKeyTypeList = [
  { title: 'DH key', isActive: true },
  { title: 'TLS key', isActive: false },
];

const dropdownKeySizeList = [{ title: '2048 bits', isActive: true }];

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

const AddCertificateAndKeysModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [addMode, setAddMode] = useState('issueCertificate');
  const [inputSearchValue, setInputSearchValue] = useState(null);

  return (
    <ModalContainer
      modalWidthType="modal-550px"
      openModal={modalStatus.add.status}
      closeModal={() => changeModalStatus('add', false)}
    >
      <div className="header">
        <div className="title">Add certificate or key</div>
      </div>
      <div className="body">
        {/* Issue certificate signing request */}
        <div>
          <div className="modal-form-title">
            <RadioButton
              id="issueCertificate"
              name="issueCertificate"
              label="Issue certificate signing request"
              checked={addMode === 'issueCertificate'}
              labelClassName="form-title"
              onChange={() => setAddMode('issueCertificate')}
            />
          </div>
        </div>
        {/* Issue certificate signing request content */}
        <div
          className={`mb-1 ms-4 ${
            addMode === 'issueCertificate' ? 'd-block' : 'd-none'
          }`}
        >
          <Row>
            <Col sm={6}>
              <div className="modal-form-title">Common name</div>
              <div>
                <Input
                  type="text"
                  value=""
                  placeholder="1-64 characters"
                  minLength={1}
                  maxLength={64}
                  onChange={e => {}}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </div>
            </Col>
            <Col sm={6}>
              <div className="modal-form-title">Alternative name</div>
              <div>
                <Input
                  type="text"
                  value=""
                  placeholder="1-64 characters"
                  minLength={1}
                  maxLength={64}
                  onChange={e => {}}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
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
              checked={addMode === 'uploadCSR'}
              labelClassName="form-title"
              onChange={() => setAddMode('uploadCSR')}
            />
          </div>
        </div>
        {/* Upload CSR content */}
        <div
          className={`mb-1 ms-4 ${
            addMode === 'uploadCSR' ? 'd-block' : 'd-none'
          }`}
        >
          <Row>
            <Col sm={12}>
              <div className="modal-form-title">Signed by</div>
              <div>
                <DropdownWithItem
                  id="signed-by-dropdown"
                  type="normal"
                  selectedItem={dropdownUploadCsrSignedByList[0]}
                  itemList={dropdownUploadCsrSignedByList}
                  onClick={() => {}}
                />
              </div>
            </Col>
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
              checked={addMode === 'importCertificate'}
              labelClassName="form-title"
              onChange={() => setAddMode('importCertificate')}
            />
          </div>
        </div>
        {/* Import certificate content */}
        <div
          className={`mb-1 ms-4 ${
            addMode === 'importCertificate' ? 'd-block' : 'd-none'
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
          </Row>
          <Row>
            <Col sm={12}>
              <div className="modal-form-title required">
                Upload PEM-encoded certificate
              </div>
              <div>
                <InputWithUploadButton value={''} onChange={() => {}} />
              </div>
            </Col>
          </Row>
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

        {/* Generate private key (DH, TLS) */}
        <div className="mt-3">
          <div className="modal-form-title">
            <RadioButton
              id="generatePrivateKey"
              name="generatePrivateKey"
              label="Generate private key (DH, TLS)"
              checked={addMode === 'generatePrivateKey'}
              labelClassName="form-title"
              onChange={() => setAddMode('generatePrivateKey')}
            />
          </div>
        </div>
        {/* Generate private key (DH, TLS) content */}
        <div
          className={`mb-1 ms-4 ${
            addMode === 'generatePrivateKey' ? 'd-block' : 'd-none'
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
            <Col sm={6}>
              <div className="modal-form-title">Key type</div>
              <div>
                <DropdownWithItem
                  id="key-type-dropdown"
                  type="normal"
                  selectedItem={dropdownKeyTypeList[0]}
                  itemList={dropdownKeyTypeList}
                  onClick={() => {}}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={6}>
              <div className="modal-form-title">Key size</div>
              <div>
                <DropdownWithItem
                  id="key-size-dropdown"
                  type="normal"
                  selectedItem={dropdownKeySizeList[0]}
                  itemList={dropdownKeySizeList}
                  onClick={() => {}}
                />
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
              checked={addMode === 'importPrivateKey'}
              labelClassName="form-title"
              onChange={() => setAddMode('importPrivateKey')}
            />
          </div>
        </div>
        {/* Import private key (DH, TLS) content */}
        <div
          className={`mb-1 ms-4 ${
            addMode === 'importPrivateKey' ? 'd-block' : 'd-none'
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

        {/* Access privilege */}
        {addMode === 'issueCertificate' || addMode === 'uploadCSR' ? (
          <>
            <div className={'sub-title mt-3 mb-3'}>Access privilege</div>
            <div className="mb-3">
              <div className={certificateStyle['ca-modal-text']}>
                Access level
                <div
                  className={certificateStyle['ca-modal-access-level-label']}
                >
                  Organization
                </div>
              </div>
            </div>
          </>
        ) : (
          <AccessPrivilege
            id="cert-key-access-privilege-dropdown"
            onChangeSearch={e => setInputSearchValue(e.target.value)}
            inputSearchValue={inputSearchValue}
            siteTagList={dropdownSiteTagList}
            siteList={dropdownSiteList}
          />
        )}
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click save');
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

export default AddCertificateAndKeysModal;
