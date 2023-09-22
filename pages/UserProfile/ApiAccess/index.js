import apiAccessStyle from './api-access.module.scss';

import { useState } from 'react';
import { Container, Table, ButtonGroup } from 'react-bootstrap';
import MessageBox from '../../../components/MessageBox';
import InlineTitle from '../../../components/InlineTitle';
import LinkerWithA from '../../../components/LinkerWithA';
import Checkbox from '../../../components/Checkbox';
import PaginationContainer from '../../../components/PaginationContainer';
import Button from '../../../components/Button';
import ModalContainer from '../../../components/ModalContainer';
import Input from '../../../components/Input';
import EditableNameBox from '../../../components/EditableNameBox';

const ApiAccess = () => {
  const defaultMessages = {
    success: null,
    error: null,
    warning: null,
  };

  const messageWordings = {
    tester: '',
  };

  const [apiKeyNameName, setApiKeyNameName] = useState('Purple');
  const [originApiKeyNameName, setOriginApiKeyNameName] = useState('Purple');
  const [isOpenGenerateModal, setOpenGenerateModal] = useState(false);
  const [isOpenDownloadModal, setIsOpenDownloadModal] = useState(false);
  const [isOpenRevokeModal, setOpenRevokeModal] = useState(false);

  const [messages, setMessages] = useState({ ...defaultMessages });
  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  const referApiKeyNameName = value => {
    setApiKeyNameName(value);
    setOriginApiKeyNameName(value);
  };

  return (
    <div className="layout-container layout-container--column layout-container--fluid">
      <MessageBox
        show={!!messages.success}
        label={messages.success}
        variant="success"
        dismissible
        onClose={() => {}}
      />
      <MessageBox
        show={!!messages.danger}
        label={messages.danger}
        variant="danger"
        dismissible
        onClose={() => {}}
      />
      <MessageBox
        show={!!messages.warning}
        label={messages.warning}
        variant="warning"
        dismissible
        onClose={() => {}}
      />

      <InlineTitle label="API ACCESS" />
      <div className="lh-lg">
        <span>
          The Nuclias Cloud API is an interface for software to interact
          directly with the Nuclias Cloud platform and Nuclias Cloud-managed
          devices.&nbsp;The API contains a set of tools known as endpoints for
          building software and applications that communicate with the Nuclias
          Cloud for use cases such as provisioning, external captive portal,
          monitoring, and report. The Nuclias Cloud API is a RESTful API using
          HTTPS&nbsp;requests to a URL&nbsp;and JSON as a human-readable format.
          Please contact
        </span>
        <span>
          {' '}
          <a
            href="mailto:Nuclias_ts@dlinkcorp.com"
            style={{ color: '#22b7db' }}
          >
            Nuclias_ts@dlinkcorp.com
          </a>{' '}
          for our dedicated API documentation.
        </span>
        <div className="mt-3">
          Use the following API endpoint URL as the BASE URL for accessing the
          Nuclias Cloud API.
        </div>
      </div>
      <div className="form-group my-3">
        <div className="form-title">API endpoint URL</div>
        <div className="form-field">https://jp.nuclius.com</div>
      </div>

      <ButtonGroup className="d-inline-flex mb-2">
        <Button
          label="Generate API key"
          className=""
          onClick={() => setOpenGenerateModal(true)}
        ></Button>
        <Button
          label="Revoke"
          className=""
          onClick={() => setOpenRevokeModal(true)}
        ></Button>
      </ButtonGroup>

      <Table responsive striped hover className="table-container">
        <thead>
          <tr>
            <th>
              <Checkbox
                id="rl-th-cb1"
                onChange={e => console.log(e.target.checked)}
              />
            </th>
            <th>#</th>
            <th>
              <LinkerWithA
                label="API key name"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="API key"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Last access IP address"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Last access location"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Last access date / time"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Status"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Created by"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Created at"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Checkbox
                id="rl-cb1"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>1</td>
            <td>
              <EditableNameBox
                onClickCancelIcon={() =>
                  setOriginApiKeyNameName(apiKeyNameName)
                }
                inputFieldOnKeyDown={e => setApiKeyNameName(e.target.value)}
                inputFieldOnChange={e =>
                  setOriginApiKeyNameName(e.target.value)
                }
                value={originApiKeyNameName}
              />
            </td>
            <td>55****eo3k</td>
            <td>220.130.164.120</td>
            <td>Taipei / Taiwan</td>
            <td>12/12/2019 18:01</td>
            <td>Normal</td>
            <td>Peter Lai</td>
            <td>12/12/2019 18:01</td>
          </tr>
        </tbody>
      </Table>

      <PaginationContainer
        total={10}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />

      <ModalContainer
        modalWidthType="modal-500px"
        openModal={isOpenGenerateModal}
        closeModal={() => setOpenGenerateModal(false)}
      >
        <div className="header">
          <div className="title">Generate API key</div>
        </div>
        <div className="body">
          <div className="modal-form-title required">API key name</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="1-64 characters"
              autoComplete="new-email1"
              onChange={e => {
                console.log(e.target.value);
              }}
              onFocus={() => {}}
              onBlur={() => {}}
            />
            <span>
              Please note that generate a new API key may take a while.
            </span>
          </div>
        </div>
        <div className="footer non-border-top-footer">
          <Button
            label="Generate"
            className="btn-submit"
            onClick={() => {
              console.log('Click on generate');
              setOpenGenerateModal(false);
              setIsOpenDownloadModal(true);
            }}
          />
        </div>
      </ModalContainer>

      <ModalContainer
        modalWidthType="modal-500px"
        openModal={isOpenDownloadModal}
        closeModal={() => setIsOpenDownloadModal(false)}
      >
        <div className="header">
          <div className="title">Generate API key</div>
        </div>
        <div className="body">
          <div className="modal-form-title required">API key name</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="xxx_api_name"
              autoComplete="new-email1"
              disabled
            />
            <div className="modal-form-title mb-3">Your API key is</div>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <div className="mb-5">SKRETRYREGFDddddddddd3333333sfsgfdgdg</div>
              <span
                style={{
                  fontSize: 18,
                  color: ' #172664',
                  fontWeight: 'bolder',
                }}
              >
                Download and store your API key in a safe place
              </span>
            </div>
            <div>
              Nuclias Cloud does not store API keys in plaintext for security
              reasons, so this is the only time you will be able to download
              this generated API key. If you lose or forget your API key, you
              will have to revoke it and generate a new one.
            </div>
          </div>
        </div>
        <div className="footer non-border-top-footer">
          <Button
            label="Download API key"
            className="btn-submit"
            onClick={() => {
              console.log('Click on download');
            }}
          />
        </div>
      </ModalContainer>

      <ModalContainer
        modalWidthType="modal-500px"
        openModal={isOpenRevokeModal}
        closeModal={() => setOpenRevokeModal(false)}
      >
        <div className="header">
          <div className="title">Revoke API key</div>
        </div>
        <div className="body">
          <div>
            This action is permanent. Do you want to revoke the selected API
            key?
          </div>
        </div>
        <div className="footer non-border-top-footer">
          <Button
            label="Cancel"
            className="btn-cancel"
            onClick={() => setOpenRevokeModal(false)}
          />
          <Button
            label="Revoke"
            className="btn-delete"
            onClick={() => {
              console.log('Click on revoke');
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default ApiAccess;
