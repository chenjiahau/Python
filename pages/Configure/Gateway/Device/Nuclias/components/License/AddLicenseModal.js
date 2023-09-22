import mainStyle from './license.module.scss';

import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Components
import {
  ModalContainer, MessageBoxGroup, Button, DropdownWithAdvancedSearch, LinkerWithA
} from 'components/';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const AddLicenseModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    unusedLicenseList
  } = props;

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [licenseKey, setLicenseKey] = useState('');

  return (
    <ModalContainer
      modalWidthType="modal-400px"
      openModal={modalStatus.addLicense.status}
      closeModal={() => {
        setLicenseKey('');
        changeModalStatus(modalStatus.addLicense.self, false)
      }}
    >
      <div className="header">
        <div className="title">Add license</div>
      </div>
      <div className="body">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        <Row className="mb-2">
          <div className="modal-form-title required short-block-margin required">License key</div>
          <div className="modal-form-field">
            <DropdownWithAdvancedSearch
              value={licenseKey}
              noIcon={true}
              alignEnd={true}
              isSelectingItem={true}
              dataBsToggleOnButton={true}
              onChange={e => setLicenseKey(e.target.value)}
            >
              <li>
                <div className={mainStyle['more']}>
                  <div className={mainStyle['more-info']}>
                    Showing first {unusedLicenseList.length} of total {unusedLicenseList.length} licenses.
                  </div>
                  <LinkerWithA
                    label="more"
                    href="#"
                    className="linker-blue show-more text-decoration-underline"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Click on more');
                    }}
                  />
                </div>
              </li>
              {
                unusedLicenseList.map((unusedLicense, index) => {
                  return (
                    <li
                      key={`unused-license-${index}`}
                      className={mainStyle['click-item']}
                    >
                      {unusedLicense.key} ({unusedLicense.days} days)
                    </li>
                  );
                })
              }
            </DropdownWithAdvancedSearch>
          </div>
        </Row>
      </div>
      <div className="footer">
        <Button
          label="Cancel"
          className="btn-cancel"
          onClick={() => {
            setLicenseKey('');
            changeModalStatus(modalStatus.addLicense.self, false)
          }}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => {
            setLicenseKey('');
            changeModalStatus(modalStatus.addLicense.self, false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default AddLicenseModal;
