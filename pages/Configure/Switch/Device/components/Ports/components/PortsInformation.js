import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  InlineTitle, DropdownWithCheckbox, LinkerWithA, PaginationContainer, TooltipDialogFixed
} from 'components/';

// Dummy data
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState } from 'dummy/utils/checkbox';

const defaultFieldList = [
  { title: 'All', key: 'all', checked: true, isAll: true },
  { title: 'Port #', key: 'portNumber', checked: true },
  { title: 'Aggregate', key: 'aggregate', checked: true },
  { title: 'Link', key: 'link', checked: true },
  { title: 'Current traffic', key: 'currentTraffic', checked: true },
  { title: 'Cumulative sent bytes', key: 'cumulativeSentBytes', checked: true },
  { title: 'Cumulative received bytes', key: 'cumulativeReceivedBytes', checked: true },
  { title: 'Total cumulative bytes', key: 'totalCumulativeBytes', checked: true },
  { title: 'Used power', key: 'usedPower', checked: true },
  { title: 'LLDP', key: 'lldp', checked: true },
  { title: 'VLAN', key: 'vlan', checked: true },
  { title: 'Type', key: 'type', checked: true },
  { title: '802.1x authentication state', key: 'authentication', checked: true },
  { title: 'RSTP state', key: 'rstpState', checked: true },
  { title: 'LBD state', key: 'lbdState', checked: true },
  { title: 'Port name', key: 'portName', checked: true }
];

const PortsInformation = (props) => {
  const { originPorts, originFullPorts } = props;
  const navigate = useNavigate();

  // State
  const [fieldList, setFieldList] = useState(cloneDeep(defaultFieldList));
  const [ports, setPorts] = useState([]);
  const [fullPorts, setFullPorts] = useState([]);

  // Method
  const changeField = (field) => {
    let isCheckedAll = checkedAllState(fieldList);
    const updatedFieldList = cloneDeep(fieldList);

    if (field.key === 'all') {
      for (const f of updatedFieldList) {
        f['checked'] = !isCheckedAll;
      }
    } else {
      for (const f of updatedFieldList) {
        if (f.key === field.key) {
          f.checked = !f.checked;
        }
      }
    }

    updatedFieldList[0].checked = checkedAllState(updatedFieldList);
    setFieldList(updatedFieldList);
  }

  const getVisibleFieldState = (key) => {
    let state = true;
    for (const field of fieldList) {
      if (field.key === key) {
        state = field.checked;
      }
    }

    return state;
  }

  const redirectToAuthentication = () => {
    navigate(`/cloud/configure/switch/device/1?i=0&tab=authenticationSession`);
  }

  const gotoClientPage = (lldp) => {
    navigate(`/cloud/monitor/switch/clients?id=${lldp}`);
  }

  const showMoreLldpContent = (portNumber, lldps) => {
    return (
      <Table>
        <tbody>
          {
            lldps.map((item, index) => (
              <tr key={`${portNumber}-lldp-${item.id}`}>
                <td className='px-2'>
                  <a className='link' href={`/#/monitor/switch/clients?id=${item}`}>{item}</a>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  // Side effect
  useEffect(() => {
    setPorts(originPorts);
    setFullPorts(originFullPorts);
  }, [originPorts, originFullPorts]);

  return (
    <>
      <InlineTitle label='PORTS INFORMATION' />
      <div className='d-flex  justify-content-end mb-2'>
        <DropdownWithCheckbox
          id='port-information-table-dropdown'
          type='checkbox'
          isJiugonggeLabel={true}
          isLastElement={true}
          itemList={fieldList}
          onChange={item => changeField(item)}
        />
      </div>

      <Table responsive striped hover className="table-container" id="port-information-table" style={{ position: 'relative' }}>
        <thead>
          <tr>
            <th>#</th>
            {
              getVisibleFieldState('portNumber') && (
                <th>
                  <LinkerWithA
                    label='PortNumber'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'portNumber', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('aggregate') && (
                <th>
                  <LinkerWithA
                    label='aggregate'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'aggregate', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('link') && (
                <th>
                  <LinkerWithA
                    label='Link'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'link', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('currentTraffic') && (
                <th>
                  <LinkerWithA
                    label='Current traffic'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'currentTraffic.totalNumber', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('cumulativeSentBytes') && (
                <th>
                  <LinkerWithA
                    label='Cumulative sent bytes'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'cumulativeBytes.sendNumber', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('cumulativeReceivedBytes') && (
                <th>
                  <LinkerWithA
                    label='Cumulative received bytes'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'cumulativeBytes.receiveNumber', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('totalCumulativeBytes') && (
                <th>
                  <LinkerWithA
                    label='Total cumulative bytes'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'cumulativeBytes.totalNumber', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('usedPower') && (
                <th>
                  <LinkerWithA
                    label='Used power'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'usedPower', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('lldp') && (
                <th>
                  <LinkerWithA
                    label='LLDP'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'lldp', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('vlan') && (
                <th>
                  <LinkerWithA
                    label='VLAN'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'vlan', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('type') && (
                <th>
                  <LinkerWithA
                    label='Type'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'type', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('authentication') && (
                <th>
                  <LinkerWithA
                    label='802.1x authentication state'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'authentication', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('rstpState') && (
                <th>
                  <LinkerWithA
                    label='RSTP state'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'rstpState', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('lbdState') && (
                <th>
                  <LinkerWithA
                    label='LBD state'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'lbdState', setPorts)}
                  />
                </th>
              )
            }
            {
              getVisibleFieldState('portName') && (
                <th>
                  <LinkerWithA
                    label='Port name'
                    className="text-decoration-none"
                    onClick={e => sorting(e, ports, 'portName', setPorts)}
                  />
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            ports.map((port, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {
                    getVisibleFieldState('portNumber') && (
                      <td>{port.portNumber}</td>
                    )
                  }
                  {
                    getVisibleFieldState('aggregate') && (
                      <td>{port.aggregate}</td>
                    )
                  }
                  {
                    getVisibleFieldState('link') && (
                      <td>{port.link}</td>
                    )
                  }
                  {
                    getVisibleFieldState('currentTraffic') && (
                      <td>
                        {port.currentTraffic.total} (
                        <span className='upload-text'>{port.currentTraffic.up} ↑</span>
                        <span className='download-text'>{port.currentTraffic.down} ↓</span>
                        )
                      </td>
                    )
                  }
                  {
                    getVisibleFieldState('cumulativeSentBytes') && (
                      <td>{port.cumulativeBytes.send}</td>
                    )
                  }
                  {
                    getVisibleFieldState('cumulativeReceivedBytes') && (
                      <td>{port.cumulativeBytes.receive}</td>
                    )
                  }
                  {
                    getVisibleFieldState('totalCumulativeBytes') && (
                      <td>{port.cumulativeBytes.total}</td>
                    )
                  }
                  {
                    getVisibleFieldState('usedPower') && (
                      <td>{port.usedPower}</td>
                    )
                  }
                  {
                    getVisibleFieldState('lldp') && (
                      <td>
                        {port.lldp.length === 0 && '-'}
                        {
                          port.lldp.length === 1 && (
                            <span className='link' onClick={() => gotoClientPage(port.lldp[0])}>
                              {port.lldp[0]}
                            </span>
                          )}
                        {
                          port.lldp.length > 1 && (
                            <div>
                              <span className='link' onClick={() => gotoClientPage(port.lldp[0])}>
                                {port.lldp[0]}
                              </span>
                              <span className='space'></span>
                              <TooltipDialogFixed
                                placement='auto'
                                title={ReactDOMServer.renderToString(showMoreLldpContent(port.portNumber, port.lldp.slice(1)))}
                                hideIcon={true}
                                tooltipsTitle={`${port.lldp.length - 1} More >`}
                              />
                            </div>
                          )
                        }
                      </td>
                    )
                  }
                  {
                    getVisibleFieldState('vlan') && (
                      <td>{port.vlan}</td>
                    )
                  }
                  {
                    getVisibleFieldState('type') && (
                      <td>{port.type}</td>
                    )
                  }
                  {
                    getVisibleFieldState('authentication') && (
                      <td>
                        {
                          port.authenticationState === 'Disabled' ? (
                            <span>Disabled / -</span>
                          ) : (
                            <>
                              <span>{port.authenticationState} / </span>
                              <a className='link' href='#' onClick={() => redirectToAuthentication()}>View the detail information</a>
                            </>
                          )
                        }
                      </td>
                    )
                  }
                  {
                    getVisibleFieldState('rstpState') && (
                      <td>{port.rstp} / {port.rstpState}</td>
                    )
                  }
                  {
                    getVisibleFieldState('lbdState') && (
                      <td>{port.lbd} / {port.lbdState}</td>
                    )
                  }
                  {
                    getVisibleFieldState('portName') && (
                      <td>{port.portName}</td>
                    )
                  }
                </tr>
              )

            })
          }
        </tbody>
      </Table >

      <PaginationContainer
        total={ports.length}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />
    </>
  )
}

export default PortsInformation;