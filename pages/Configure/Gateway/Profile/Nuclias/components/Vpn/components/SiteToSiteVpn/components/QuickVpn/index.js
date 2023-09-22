import mainStyle from '../../../../../../../config.module.scss';

// Package
import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ReactDOMServer from 'react-dom/server';

// Component
import {
  DropdownWithItem,
  TooltipDialog,
  Icon,
  LinkerWithA,
  TooltipDialogFixed,
  InputWithIcon,
  RadioButton,
  PaginationContainer
} from 'components/';

import Func from '../../../../../Func';

// Context
import { SiteToSiteVpnContext } from '../../Context';

const defaultTopologyList = [
  { id: 0, title: '2612a43bf3', isActive: true, value: 'fullMesh' },   // Full mesh
  { id: 1, title: 'e3c31cc0be', isActive: false, value: 'hubAndSpoke' },  // Hub-and-Spoke
];

const QuickVpn = () => {
  const { t } = useTranslation();
  const { state: {
      quickVpn,
      selectedDeviceModelName
    }
  } = useContext(SiteToSiteVpnContext);
  const [list, setList] = useState([]);

  const [topologyList, setTopologyList] = useState(cloneDeep(defaultTopologyList));
  const selectedTopology = topologyList.filter(topologyItem => topologyItem.isActive)[0];

  const [hubAndSpokeType, setHubAndSpokeType] = useState(true);

  // Side effect
  useEffect(() => {
    if (!quickVpn) {
      return;
    }

    const updatedList = quickVpn.map((quickVpnItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...quickVpnItem,
      }
    });

    setList(updatedList);

  }, [quickVpn]);

  return (
    <>
      <Func title='QUICK VPN'>

        {/* Topology */}
        <div className='d-flex align-item-center form-group'>
          <div className='form-title lh-lg' style={{minWidth: 'auto'}}>Topology</div>
          <TooltipDialog
            className='ms-1 me-4'
            placement='right'
            title={`Quick VPN is a Nuclias auto provisioning site-to-site VPN technology that allows you quickly and easily build VPN tunnels between Nuclias gateway devices without tedious manual VPN configuration.<br><br>• Full mesh: Site-to-site VPN connections will be automatically established between all Site-to-site-enabled peers in the same organization by default.<br><br>• Hub-and-Spoke: Hub-and-Spoke is used when there are multiple gateways sourcing (Spokes), with a central gateway called the 'Hub'.<br>`}
          />
          <DropdownWithItem
            id='topology-dropdown'
            selectedItem={selectedTopology}
            itemList={topologyList}
            onClick={topologyItem => {
              const clonedTopologyList = cloneDeep(topologyList);
              clonedTopologyList.forEach(tmpItem => tmpItem.isActive = tmpItem.value === topologyItem.value);
              setTopologyList(clonedTopologyList);
            }}
          />
        </div>

        {
          selectedTopology.value === 'fullMesh' &&
          <>
            {/* Description */}
            <div className='d-flex align-item-center mt-1 form-group'>
              <div className='form-title' style={{minWidth: 'auto', marginRight: '33px'}}>Description</div>
              <div className='form-field'>Site-to-site VPN connections between Cloud gateway devices will be established when selecting "join member"</div>
            </div>
          </>
        }

        {
          selectedTopology.value === 'hubAndSpoke' &&
          <>
            {/* Hub-and-Spoke type */}
            <div className='d-flex align-item-center form-group'>
              <div className='form-title lh-lg' style={{minWidth: 'auto'}}>Hub-and-Spoke type</div>
              <TooltipDialog
                className='ms-1 me-4'
                placement='right'
                title={`• Hub mode: Establish VPN tunnels with all hubs and dependent spokes.<br><br>• Spoke mode: Establish VPN tunnels with selected hubs.`}
              />
              <div className='d-flex'>
                <RadioButton
                  id={`hub-and-spoke-enable`}
                  name={`hub-and-spoke-enable`}
                  label='Hub'
                  hasRightMargin={true}
                  checked={hubAndSpokeType}
                  onChange={() => setHubAndSpokeType(true)}
                />
                <RadioButton
                  id={`hub-and-spoke-disable`}
                  name={`hub-and-spoke-disable`}
                  label='Spoke'
                  checked={!hubAndSpokeType}
                  onChange={() => setHubAndSpokeType(false)}
                />
              </div>
            </div>
          </>
        }

        {/* Tool bar */}
        <div>
          <div className='d-flex justify-content-between align-items-end'>
            {/* Remote VPN participants */}
            {
              selectedTopology.value === 'fullMesh' &&
              <div className='d-flex align-item-center mt-1 form-group'>
                <div className='form-title lh-lg' style={{minWidth: 'auto'}}>Remote VPN participants</div>
                <TooltipDialog
                  className='ms-1 me-4'
                  placement='right'
                  title={`Available remote VPN participants show up on the list.<br> - DBG-2000 for DBG-2000 <br> - DBG-X1000/DBG-2000(B1) for DBG-X1000/DBG-2000(B1) <br>`}
                />
              </div>
            }

            {/* Exist hubs */}
            {
              selectedTopology.value === 'hubAndSpoke' &&
              <div className='d-flex align-item-center mt-1 form-group'>
                <div className='form-title' style={{minWidth: 'auto'}}>Exist hubs</div>
                <TooltipDialog
                  className='ms-1 me-4'
                  placement='right'
                  title={`This option is only available if the Gateway is configured as a Hub. This option lets you designate the remote device that is to receive all network traffic from the local device.`}
                />
              </div>
            }

            {/* Search */}
            <div className='mb-1'>
              <InputWithIcon
                type='Search'
                iconPosition='left'
                placeholder={t('13348442cc')}
                value={''}
                onChange={e => {}}
                onFocus={() => {}}
                onBlur={() => {}}
                iconClassName='icon-search'
                iconOnClick={() => {}}
              />
            </div>
          </div>

          {/* Table */}
          <div className={mainStyle['table-container-']}>
            <Table responsive striped hover className='table-container'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <LinkerWithA
                      label='Status'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='Device Name'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='IP address'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='Site'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  {
                    ( selectedTopology.value === 'fullMesh' || ( selectedTopology.value === 'hubAndSpoke' && hubAndSpokeType )) &&
                    <th>
                      <LinkerWithA
                        label='Subnet(s)'
                        className='text-decoration-none'
                        onClick={() => {}}
                      />
                    </th>
                  }
                  {
                    selectedTopology.value === 'hubAndSpoke' && hubAndSpokeType &&
                    <th>
                      <LinkerWithA
                        label='Remote VPN peer connection'
                        className='text-decoration-none'
                        onClick={() => {}}
                      />
                    </th>
                  }
                  {
                    selectedTopology.value === 'fullMesh' &&
                    <th>
                      <LinkerWithA
                        label='Join member'
                        className='text-decoration-none'
                        onClick={() => {}}
                      />
                    </th>
                  }
                  {
                    selectedTopology.value === 'hubAndSpoke' &&
                    <th>
                      <LinkerWithA
                        label={hubAndSpokeType ? 'Backup hub' : 'Primary hub'}
                        className='text-decoration-none'
                        onClick={() => {}}
                      />
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                {
                  list.map((item, index) => {
                    return (
                      <tr key={'quick-vpn-tr-' + index}>
                        <td>{index}</td>
                        <td>
                          {item.status === 1 && <Icon className='icon-round online' />}
                          {item.status === 0 && <Icon className='icon-round offline' />}
                          {item.status === -1 && <Icon className='icon-round dormant' />}
                        </td>
                        <td>{item.deviceName}</td>
                        <td>{item.ipAddress}</td>
                        <td>{item.site}</td>

                        {/* Subnet(s) */}
                        {
                          ( selectedTopology.value === 'fullMesh' || ( selectedTopology.value === 'hubAndSpoke' && hubAndSpokeType )) &&
                          <td>
                            <TooltipDialogFixed
                              hideIcon={true}
                              placement='right'
                              tooltipsTitle={item.subnets.length}
                              title={
                                ReactDOMServer.renderToString(
                                  <Table hover>
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Subnet</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.subnets.map((item, index) => (
                                        <tr key={'quick-vpn-subnet-' + index}>
                                          <td>{index + 1}</td>
                                          <td>{item}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                )
                              }
                            />
                          </td>
                        }

                        {/* Remote VPN peer connection */}
                        {
                          selectedTopology.value === 'hubAndSpoke' && hubAndSpokeType &&
                          <td className='input'>
                            <div className='d-flex'>
                              <RadioButton
                                id={`quick-vpn-remove-vpn-peer-enable-${index}`}
                                name={`quick-vpn-remove-vpn-peer-enable-${index}`}
                                label='Enable'
                                hasRightMargin={true}
                                checked={item.joinMember}
                                onChange={() => {}}
                              />
                              <RadioButton
                                id={`quick-vpn-remove-vpn-peer-disable-${index}`}
                                name={`quick-vpn-remove-vpn-peer-disable-${index}`}
                                label='Disable'
                                checked={!item.joinMember}
                                onChange={() => {}}
                              />
                            </div>
                          </td>
                        }

                        {/* Join members */}
                        {
                          selectedTopology.value === 'fullMesh' &&
                          <td className='input' >
                            <div className='d-flex'>
                              <RadioButton
                                id={`quick-vpn-join-member-enable-${index}`}
                                name={`quick-vpn-join-member-enable-${index}`}
                                label='Enable'
                                hasRightMargin={true}
                                checked={item.joinMember}
                                onChange={() => {}}
                              />
                              <RadioButton
                                id={`quick-vpn-join-member-disable-${index}`}
                                name={`quick-vpn-join-member-disable-${index}`}
                                label='Disable'
                                checked={!item.joinMember}
                                onChange={() => {}}
                              />
                            </div>
                          </td>
                        }

                        {/* Back hub & Primary hub */}
                        {
                          selectedTopology.value === 'hubAndSpoke' &&
                          <>
                            {
                              hubAndSpokeType &&
                              <td className='input'>
                                <div className='d-flex'>
                                  <RadioButton
                                    id={`quick-vpn-back-hub-enable-${index}`}
                                    name={`quick-vpn-back-up-hub-enable-${index}`}
                                    label='Enable'
                                    hasRightMargin={true}
                                    checked={item.backUpHub}
                                    onChange={() => {}}
                                  />
                                  <RadioButton
                                    id={`quick-vpn-back-up-hub-disable-${index}`}
                                    name={`quick-vpn-back-up-hub-disable-${index}`}
                                    label='Disable'
                                    checked={!item.backUpHub}
                                    onChange={() => {}}
                                  />
                                </div>
                              </td>
                            }

                            {
                              !hubAndSpokeType &&
                              <td className='input'>
                                <div className='d-flex'>
                                  <RadioButton
                                    id={`quick-vpn-primary-hub-enable-${index}`}
                                    name={`quick-vpn-primary-hub-enable-${index}`}
                                    label='Enable'
                                    hasRightMargin={true}
                                    checked={item.primaryHub}
                                    onChange={() => {}}
                                  />
                                  <RadioButton
                                    id={`quick-vpn-primary-hub-disable-${index}`}
                                    name={`quick-vpn-primary-hub-disable-${index}`}
                                    label='Disable'
                                    checked={!item.primaryHub}
                                    onChange={() => {}}
                                  />
                                </div>
                              </td>
                            }
                          </>
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>

            <PaginationContainer
              total={7}
              onPageChange={currentPageNum => console.log('onPageChange', currentPageNum) }
              onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum) }
            />

          </div>
        </div>

      </Func >
    </>
  )
}

export default QuickVpn;