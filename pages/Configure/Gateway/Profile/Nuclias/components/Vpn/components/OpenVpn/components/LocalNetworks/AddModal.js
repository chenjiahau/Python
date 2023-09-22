import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  Button,
  ModalContainer,
  Input,
} from 'components';

import { getAddLocalNetworks } from 'dummy/data/gateway/data/vpn/open-vpn/local-networks';

const AddModal = ({
  modalStatus,
  changeModalStatus,
  selectedDeviceModelName
}) => {
  const [localNetworks, setLocalNetworks] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedLocalNetworks = cloneDeep(localNetworks);
    clonedLocalNetworks[key] = value;
    setLocalNetworks(clonedLocalNetworks);
  }

  useEffect(() => {
    const tmpLocalNetworks = getAddLocalNetworks();
    setLocalNetworks(tmpLocalNetworks);
  }, [modalStatus.addLocalNetworks.status])

  if(!localNetworks) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addLocalNetworks.status}
      closeModal={() => changeModalStatus('addLocalNetworks', false)}
    >
      <div className='header'>
        <div className='title'>Add openVPN local network configuration</div>
      </div>
      <div className='body'>
        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Local network</div>
            <Input
              type='text'
              value={localNetworks.localIPAddress}
              isInvalid={localNetworks.localIPAddress === ''}
              placeholder='e.g. 192.168.100.0'
              onChange={e => changeValue({ key: 'localIPAddress', value: e.target.value })}
            />
          </Col>

          <Col sm={6}>
            <div className='modal-form-title required'>Subnet mask</div>
            <Input
              type='text'
              value={localNetworks.localSubnetmask}
              isInvalid={localNetworks.localSubnetmask === ''}
              placeholder='e.g. 255.255.255.0'
              onChange={e => changeValue({ key: 'localSubnetmask', value: e.target.value })}
            />
          </Col>
        </Row>

      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('addLocalNetworks', false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus('addLocalNetworks', false)}
        />
      </div>

    </ModalContainer >
  );
};

export default AddModal;
