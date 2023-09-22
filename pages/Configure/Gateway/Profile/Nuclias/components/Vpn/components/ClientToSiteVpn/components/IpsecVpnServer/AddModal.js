import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem,
  Button,
  ModalContainer,
  Input,
  RadioButton
} from 'components';

import { generateAddIpsecVpnServer } from 'dummy/data/gateway/data/vpn/client-to-site-vpn/ip-sec-vpn-server';

const AddModal = ({
  modalStatus,
  changeModalStatus,
  selectedDeviceModelName
}) => {
  const [ipsecVpnServer, setIpsecVpnServer] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedIpsecVpnServer = cloneDeep(ipsecVpnServer);
    clonedIpsecVpnServer[key] = value;
    setIpsecVpnServer(clonedIpsecVpnServer);
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey
  }) => {
    const clonedIpsecVpnServer = cloneDeep(ipsecVpnServer);
    clonedIpsecVpnServer[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if(tmpItem.isActive) clonedIpsecVpnServer[selectedKey] = tmpItem;
    });

    setIpsecVpnServer(clonedIpsecVpnServer);
  }

  useEffect(() => {
    const tmpIke = generateAddIpsecVpnServer();
    setIpsecVpnServer(tmpIke);
  }, [modalStatus.addIpSecVpnServer.status])

  if(!ipsecVpnServer) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addIpSecVpnServer.status}
      closeModal={() => changeModalStatus('addIpSecVpnServer', false)}
    >
      <div className='header'>
        <div className='title'>Add IPsec VPN server</div>
      </div>
      <div className='body'>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Connection name</div>
            <Input
              type='text'
              value={ipsecVpnServer.name}
              isInvalid={ipsecVpnServer.name === ''}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'name', value: e.target.value })}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>IKE profile</div>
            <DropdownWithItem
              type='normal'
              selectedItem={ipsecVpnServer.selectedIkeProfile}
              itemList={ipsecVpnServer.ikeProfileList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'ikeProfileList',
                  selectedKey: 'selectedIkeProfile'
                })
              }
            />
          </Col>
        </Row>

        <div className='mt-4 modal-subtitle'>Local site setup</div>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Local network</div>
            <DropdownWithItem
              type='normal'
              selectedItem={ipsecVpnServer.selectedLocalNetwork}
              itemList={ipsecVpnServer.localNetworkList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'localNetworkList',
                  selectedKey: 'selectedLocalNetwork'
                })
              }
            />
          </Col>

          {
            ipsecVpnServer.selectedLocalNetwork.value === 'subnet' &&
            <Col sm={6}>
              <div className='modal-form-title required'>IP address</div>
              <Input
                type='text'
                value={ipsecVpnServer.name}
                isInvalid={ipsecVpnServer.name === ''}
                placeholder='1-64 characters'
                onChange={e => changeValue({ key: 'name', value: e.target.value })}
              />
            </Col>
          }
        </Row>

        <Row className='mt-5'>
          <Col sm={6}>
            <div className='modal-form-title'>DHCP relay</div>
            <div className='d-flex'>
              <RadioButton
                id={`ipsec-vpn-server-dhcp-relay-enable`}
                name={`ike-profiles-ike-version-enable`}
                label='Enable'
                hasRightMargin={true}
                checked={ipsecVpnServer.dhcpRelay}
                onChange={() => changeValue({ key: 'dhcpRelay', value: true})}
              />
              <RadioButton
                id={`ike-profiles-ike-version-disable`}
                name={`ike-profiles-ike-version-disable`}
                label='Disable'
                checked={!ipsecVpnServer.dhcpRelay}
                onChange={() => changeValue({ key: 'dhcpRelay', value: false})}
              />
            </div>
          </Col>
        </Row>

        {
          ipsecVpnServer.dhcpRelay &&
          <Row className='mt-3'>
            <Col sm={12}>
              <div className='modal-form-title required'>Relay gateway</div>
              <Input
                type='text'
                value={ipsecVpnServer.relayGateway}
                isInvalid={ipsecVpnServer.relayGateway === ''}
                placeholder='1-64 characters'
                onChange={e => changeValue({ key: 'relayGateway', value: e.target.value })}
              />
            </Col>
          </Row>
        }

        {
          !ipsecVpnServer.dhcpRelay &&
          <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Starting IP address</div>
            <Input
              type='text'
              value={ipsecVpnServer.primaryWinServer}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'primaryWinServer', value: e.target.value })}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>Ending IP address</div>
            <Input
              type='text'
              value={ipsecVpnServer.secondaryWinServer}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'secondaryWinServer', value: e.target.value })}
            />
          </Col>
        </Row>
        }

        <Row className='mt-3'>
          <Col sm={6}>
            { ipsecVpnServer.dhcpRelay && <div className='modal-form-title'>Primary DNS (Optional)</div> }
            { !ipsecVpnServer.dhcpRelay && <div className='modal-form-title required'>Primary DNS</div> }
            <Input
              type='text'
              value={ipsecVpnServer.primaryDNS}
              isInvalid={!ipsecVpnServer.dhcpRelay && ipsecVpnServer.primaryDNS === ''}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'primaryDNS', value: e.target.value })}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Secondary DNS (Optional)</div>
            <Input
              type='text'
              value={ipsecVpnServer.secondaryDNS}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'secondaryDNS', value: e.target.value })}
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Primary WINS server (Optional)</div>
            <Input
              type='text'
              value={ipsecVpnServer.primaryWinServer}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'primaryWinServer', value: e.target.value })}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Secondary WINS server (Optional)</div>
            <Input
              type='text'
              value={ipsecVpnServer.secondaryWinServer}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'secondaryWinServer', value: e.target.value })}
            />
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col sm={6}>
            <div className='modal-form-title'>Outgoing interface</div>
            <DropdownWithItem
              type='normal'
              selectedItem={ipsecVpnServer.selectedOutgoingInterface}
              itemList={ipsecVpnServer.outgoingInterfaceList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'outgoingInterfaceList',
                  selectedKey: 'selectedOutgoingInterface'
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
          onClick={() => changeModalStatus('addIpSecVpnServer', false)}
        />

        <Button
          label='Save'
          className='btn-submit'
          style={{marginLeft: '10px'}}
          onClick={() => changeModalStatus('addIpSecVpnServer', false)}
        />

      </div>

    </ModalContainer >
  );
};

export default AddModal;
