import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  Button,
  ModalContainer,
  Input,
  DropdownWithItem
} from 'components';

import { getAddOmniSslPortalLayoutConfiguration } from 'dummy/data/gateway/data/vpn/open-vpn/omni-ssl-portal-layout';

const AddModal = ({
  modalStatus,
  changeModalStatus,
  selectedDeviceModelName
}) => {
  const [omniSSLPortalLayout, setOmniSSLPortalLayout] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedOmniSSLPortalLayout = cloneDeep(omniSSLPortalLayout);
    clonedOmniSSLPortalLayout[key] = value;
    setOmniSSLPortalLayout(clonedOmniSSLPortalLayout);
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey
  }) => {
    const clonedOmniSSLPortalLayout = cloneDeep(omniSSLPortalLayout);
    clonedOmniSSLPortalLayout[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if(tmpItem.isActive) clonedOmniSSLPortalLayout[selectedKey] = tmpItem;
    });

    setOmniSSLPortalLayout(clonedOmniSSLPortalLayout);
  }

  useEffect(() => {
    const tmpOmniSSLPortalLayout = getAddOmniSslPortalLayoutConfiguration();
    setOmniSSLPortalLayout(tmpOmniSSLPortalLayout);
  }, [modalStatus.addOmniSSLPortalLayout.status])

  if(!omniSSLPortalLayout) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addOmniSSLPortalLayout.status}
      closeModal={() => changeModalStatus('addOmniSSLPortalLayout', false)}
    >
      <div className='header'>
        <div className='title'>Add portal layout configuration</div>
      </div>
      <div className='body'>
        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Name</div>
            <Input
              type='text'
              value={omniSSLPortalLayout.name}
              isInvalid={omniSSLPortalLayout.name === ''}
              placeholder='1 - 64 Characters'
              onChange={e => changeValue({ key: 'name', value: e.target.value })}
            />
          </Col>

          <Col sm={6}>
            <div className='modal-form-title'>Login page</div>
            <DropdownWithItem
              type='normal'
              selectedItem={omniSSLPortalLayout.selectedLoginPage}
              itemList={omniSSLPortalLayout.loginPageList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'loginPageList',
                  selectedKey: 'selectedLoginPage'
                })
              }
            />
          </Col>
        </Row>

      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('addOmniSSLPortalLayout', false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus('addOmniSSLPortalLayout', false)}
        />
      </div>

    </ModalContainer >
  );
};

export default AddModal;
