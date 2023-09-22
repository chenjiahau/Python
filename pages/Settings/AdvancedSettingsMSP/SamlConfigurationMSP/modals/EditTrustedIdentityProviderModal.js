import samlConfigurationStyle from '../saml-configuration.module.scss';

import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Components
import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import RadioButton from '../../../../../components/RadioButton';
import ModalContainer from '../../../../../components/ModalContainer';
import MessageBoxGroup from '../../../../../components/MessageBoxGroup';
import InputWithUploadButton from '../../../../../components/InputWithUploadButton';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const EditTrustedIdentityProviderModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [editMode, setEditMode] = useState('manualConfiguration');
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.edit.status}
      closeModal={() => changeModalStatus('edit', false)}
    >
      <div className="header">
        <div className="title">Update a trusted Identity Provider ( IdP )</div>
      </div>
      <div className="body">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        {/* Name */}
        <div className="mb-3">
          <div className="modal-form-title required">Name</div>
          <Input
            type="text"
            value="IdP1"
            placeholder="1-64 Characters"
            minLength={1}
            maxLength={64}
            onChange={e => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </div>
        {/* Manual configuration */}
        <div>
          <div className="modal-form-title">
            <RadioButton
              id="manualConfiguration"
              name="manualConfiguration"
              label="Manual configuration"
              checked={editMode === 'manualConfiguration'}
              labelClassName="form-title"
              onChange={() => setEditMode('manualConfiguration')}
            />
          </div>
        </div>
        {/* Manual configuration content */}
        <div
          className={`ms-4 ${
            editMode === 'manualConfiguration' ? 'd-block' : 'd-none'
          }`}
        >
          <Row>
            <Col sm={12}>
              <div className="modal-form-title">URL</div>
              <div>
                <Input
                  type="text"
                  style={{ paddingLeft: 15 }}
                  value="https://Bigip-idp/saml/idp/xxx"
                  placeholder="URL that will do the authentication"
                  onChange={e => {}}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </div>
            </Col>
            <Col sm={12}>
              <div className="modal-form-title">Issuer</div>
              <div>
                <Input
                  type="text"
                  style={{ paddingLeft: 15 }}
                  value="https://Bigip-idp/saml/idp/xxx"
                  placeholder="The identity of the issuer or the URL of the detail of the issuer"
                  onChange={e => {}}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </div>
            </Col>
            <Col sm={12}>
              <div className="modal-form-title required">Certificate</div>
              <div>
                <InputWithUploadButton
                  style={{ paddingLeft: 15 }}
                  accept=".pem"
                  placeholder={'Upload a PEM format of certificate'}
                  value={'FSIDPCertificate.pem'}
                  onChange={() => {}}
                />
              </div>
            </Col>
            <Col sm={12}>
              <div className="modal-form-title">Logout URL</div>
              <div>
                <Input
                  type="text"
                  style={{ paddingLeft: 15 }}
                  value="43:51:43:a1:b5:fc:8b:b7:0a:3a:a9:b1:0f:66:73:a8"
                  placeholder="Redirect to the URL of web page when user logout"
                  onChange={e => {}}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </div>
            </Col>
            <Col sm={12}>
              <div className="modal-form-title">
                X.509 cert SHA1 fingerprint
              </div>
              <div>
                <textarea style={{ height: 60, paddingLeft: 23 }}>
                  43:51:43:a1:b5:fc:8b:b7:0a:3a:a9:b1:0f:66:73:a8
                </textarea>
              </div>
            </Col>
          </Row>
        </div>

        {/* Import a IdP metadata */}
        <div className="mt-3">
          <div className="modal-form-title">
            <RadioButton
              id="importIdPMetadata"
              name="importIdPMetadata"
              label="Import a IdP metadata"
              checked={editMode === 'importIdPMetadata'}
              labelClassName="form-title"
              onChange={() => setEditMode('importIdPMetadata')}
            />
          </div>
        </div>
        {/* Import a IdP metadata content */}
        <div
          className={`mb-3 ms-4 ${
            editMode === 'importIdPMetadata' ? 'd-block' : 'd-none'
          }`}
        >
          <Row>
            <Col sm={12}>
              <div>
                <InputWithUploadButton
                  accept=".xml"
                  value={''}
                  onChange={() => {}}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click close');
            changeModalStatus('edit', false);
          }}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('edit', false);
          }}
          disabled
        />
      </div>
    </ModalContainer>
  );
};

export default EditTrustedIdentityProviderModal;
