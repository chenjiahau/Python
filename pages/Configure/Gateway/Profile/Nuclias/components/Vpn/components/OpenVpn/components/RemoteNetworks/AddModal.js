import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  Button,
  ModalContainer,
  Input,
} from 'components';

import { getAddRemoteNetworks } from 'dummy/data/gateway/data/vpn/open-vpn/remote-networks';

const AddModal = ({
  modalStatus,
  changeModalStatus,
  selectedDeviceModelName
}) => {
  const [remoteNetworks, setRemoteNetworks] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedRemoteNetworks = cloneDeep(remoteNetworks);
    clonedRemoteNetworks[key] = value;
    setRemoteNetworks(clonedRemoteNetworks);
  }

  useEffect(() => {
    const tmpRemoteNetworks = getAddRemoteNetworks();
    setRemoteNetworks(tmpRemoteNetworks);
  }, [modalStatus.addRemoteNetworks.status])

  if(!remoteNetworks) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addRemoteNetworks.status}
      closeModal={() => changeModalStatus('addRemoteNetworks', false)}
    >
      <div className='header'>
        <div className='title'>Add openVPN remote network configuration</div>
      </div>
      <div className='body'>
        <Row className='mt-3'>
          <Col sm={12}>
            <div className='modal-form-title required'>Common name</div>
            <Input
              type='text'
              value={remoteNetworks.commonName}
              isInvalid={remoteNetworks.commonName === ''}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'commonName', value: e.target.value })}
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Remote network</div>
            <Input
              type='text'
              value={remoteNetworks.remoteIPAddress}
              isInvalid={remoteNetworks.remoteIPAddress === ''}
              placeholder='e.g. 192.168.100.0'
              onChange={e => changeValue({ key: 'remoteIPAddress', value: e.target.value })}
            />
          </Col>

          <Col sm={6}>
            <div className='modal-form-title required'>Subnet mask</div>
            <Input
              type='text'
              value={remoteNetworks.remoteNetmask}
              isInvalid={remoteNetworks.remoteNetmask === ''}
              placeholder='e.g. 255.255.255.0'
              onChange={e => changeValue({ key: 'remoteNetmask', value: e.target.value })}
            />
          </Col>
        </Row>

      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('addRemoteNetworks', false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus('addRemoteNetworks', false)}
        />
      </div>

    </ModalContainer >
  );
};

export default AddModal;
