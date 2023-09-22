import mainStyle from '../../../../../../../config.module.scss';

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

// Dummy data
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const QuickVpnSettings = () => {
  const { t } = useTranslation();
  const { state: {
      quickVpnSettings,
      selectedDeviceModelName
    }
  } = useContext(SiteToSiteVpnContext);
  const [list, setList] = useState([]);

  // Side effect
  useEffect(() => {
    if (!quickVpnSettings) {
      return;
    }

    const updatedList = quickVpnSettings.map((quickVpnSettingsItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...quickVpnSettingsItem,
      }
    });

    setList(updatedList);

  }, [quickVpnSettings]);

  return (
    <>
      <Func title='QUICK VPN SETTINGS'>

        {/* IP address */}
        <div className='d-flex align-item-center mt-1 mb-2 form-group'>
          <div className='form-title' style={{minWidth: 'auto', marginRight: '33px'}}>IP address</div>
          <div className='form-field'>118.163.108.246</div>
        </div>

        {/* Tool bar box */}
        <div className='d-flex justify-content-between align-items-end'>
          {/* Local networks */}
          <div className='d-flex align-item-center mt-1 form-group'>
            <div className='form-title' style={{minWidth: 'auto'}}>Local networks</div>
            <TooltipDialog
              className='ms-1 me-4'
              placement='right'
              title={` • If you have multiple LAN subnets, you have the option to specify which one subnet participates in the VPN.<br><br> • All local subnets must be unique within the VPN topology.`}
            />
          </div>

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
        <div>
          <Table responsive striped hover className='table-container'>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <LinkerWithA
                    label='Name'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Subnet'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Use VPN'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {
                list.map((item, index) => {
                  return (
                    <tr key={'quick-vpn-settings-tr-' + index}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.subnet}</td>
                      <td className='input'>
                        <div className='d-flex'>
                          <RadioButton
                            id={`quick-vpn-settings-enable-${index}`}
                            name={`quick-vpn-settings-enable-${index}`}
                            label='Enable'
                            hasRightMargin={true}
                            checked={item.useVpn}
                            onChange={() => {}}
                          />
                          <RadioButton
                            id={`quick-vpn-settings-disable-${index}`}
                            name={`quick-vpn-settings-disable-${index}`}
                            label='Disable'
                            checked={!item.useVpn}
                            onChange={() => {}}
                          />
                        </div>
                      </td>
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

      </Func >
    </>
  )
}

export default QuickVpnSettings;