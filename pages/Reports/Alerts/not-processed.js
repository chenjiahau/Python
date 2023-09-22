import reportAlertsStyle from './reports-alerts.module.scss';

import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Table, ButtonGroup } from 'react-bootstrap';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import InlineTitle from '../../../components/InlineTitle';
import LinkerWithA from '../../../components/LinkerWithA';
import PaginationContainer from '../../../components/PaginationContainer';

import DropdownWithTimeframe, { getTimeFrameSetting, getTimeFrameKey } from '../../../components/DropdownWithTimeframe';
import DropdownWithAdvancedSearch from '../../../components/DropdownWithAdvancedSearch';
import DropdownWithItem from '../../../components/DropdownWithItem';


const defaultDeviceTypeList = [
  { title: 'All', isActive: true },
  { title: 'Access point', isActive: false },
  { title: 'Switch', isActive: false },
  { title: 'Gateway', isActive: false }
]
const defaultSeverityList = [
  { title: 'All', isActive: true },
  { title: 'Critical', isActive: false },
  { title: 'Warning', isActive: false },
  { title: 'INformation', isActive: false }
]
const defaultCheckboxlist = [
  { type: 'all', id: 0, checked: false, severity: '', time: '', device: '', name: '', MAC: '', description: '' },
  {
    type: '1th', id: 1, checked: false, severity: 'Warning', time: '2018/02/01 06:12:21',
    device: 'Switch', name: 'SW_c93', MAC: '10:BE:F5:C6:5C:04', description: 'SW_c93 was disconnected'
  },
  {
    type: '2th', id: 2, checked: false, severity: 'Warning', time: '2018/02/01 06:01:00',
    device: 'Access point', name: 'AP_a', MAC: 'A8:66:7F:89:5F:FB', description: 'A8:66:7F:89:5F:FA was disconnected'
  },
  {
    type: '3th', id: 3, checked: false, severity: 'Information', time: '2018/02/01 05:10:38',
    device: 'Switch', name: 'SW057', MAC: '20:18:62:22:02:14', description: 'SW057\'s port 3 was link-down'
  },
  {
    type: '4th', id: 4, checked: false, severity: 'Warning', time: '2018/02/01 04:55:50',
    device: 'Switch', name: 'B0:C5:54:25:B1:66', MAC: 'B0:C5:54:25:B1:66', description: 'B0:C5:54:25:B1:66 was disconnected'
  },
  {
    type: '5th', id: 5, checked: false, severity: 'Critical', time: '2018/02/01 03:05:22',
    device: 'Access point', name: 'AP003', MAC: 'A4:5E:60:BD:76:0D', description: 'A4:5E:60:BD:76:0D was disconnected'
  },
  {
    type: '6th', id: 6, checked: false, severity: 'Warning', time: '2018/02/01 02:30:55',
    device: 'Gateway', name: 'Gateway001', MAC: '00:18:0A:C8:93:D5', description: 'Gateway001 disconnected to Nuclias'
  },
  {
    type: '7th', id: 7, checked: false, severity: 'Warning', time: '2018/02/01 02:15:33',
    device: 'Gateway', name: 'Gateway002', MAC: '00:A1:12:03:04:05', description: 'Gateway001 disconnected to Nuclias'
  }
];

const SetAlertList = (props) => {
  function checkStatus (severity) {
    let result = '';
    switch (severity) {
      case 'Warning':
        result = reportAlertsStyle['col-major'];
        break;
      case 'Critical':
        result = reportAlertsStyle['col-critical'];
        break;
      default:
        result = reportAlertsStyle['col-minor'];
        break;
    }
    return result;
  }

  return (
    <tbody>
      {
        props.list.map((item, index) => {
          return <>
            {item.type !== 'all' && (<tr key={item.id}>
              <td>
                <Checkbox
                  id={'td-cb' + index}
                  type='checkbox'
                  checked={item.checked === true}
                  onChange={e => {
                    props.changeCheckbox(item.type, e.target.checked);
                    console.log(item)
                  }} />
              </td>
              <td>{index}</td>
              <td><span className={`${checkStatus(item.severity)}`}>{item.severity}</span></td>
              <td>{item.time}</td>
              <td>{item.device}</td>
              <td><Link to="/cloud/configure/access-point/device/123445">{item.name}</Link></td>
              <td>{item.MAC}</td>
              <td>{item.description}</td>
            </tr>)}
          </>
        })
      }
    </tbody>
  )
}

const NotProcessed = () => {
  const { t } = useTranslation();
  const [checkboxlist, setCheckboxlist] = useState(defaultCheckboxlist);
  const changeCheckbox = (type, value) => {
    const newCheckboxlist = [...checkboxlist]
    if (type === 'all') {
      for (let item of newCheckboxlist) {
        item.checked = value;
      }
      setCheckboxlist(newCheckboxlist);
    }
    else {
      for (let item of newCheckboxlist) {
        if (item.type === type) {
          item.checked = value;
        }
      }
      let ifAllchecked = true;
      for (let i = 1; i < newCheckboxlist.length; i++) {
        if (!newCheckboxlist[i].checked) {
          ifAllchecked = false;
        }
      }
      newCheckboxlist[0].checked = ifAllchecked;
      setCheckboxlist(newCheckboxlist);
    }
    // checkbox
    if (value) { //enable
      setCheckBtn(false);
    } else { //disable
      setCheckBtn(true);
      for (let item of newCheckboxlist) {
        if (item.checked === true) {
          setCheckBtn(false);
          break;
        }
      }
    }
  }
  const sorting = e => {
    console.log('sorting event')
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  }
  const [CheckBtn, setCheckBtn] = useState(true);
  // const checkBtnDisabeled = true;
  const AcknowledgeEvt = e => {
    console.log('AcknowledgeEvt')
  }

  return (
    <div className='layout-container layout-container--column layout-container--fluid'>
      <div className='d-flex justify-content-between mb-1'>
        <ButtonGroup>
          <Button
            label={t('797c3f63b8')}
            disabled={CheckBtn}
            onClick={() => {
              AcknowledgeEvt();
            }}
          ></Button>
          <Button
            label={t('f2a6c498fb')}
            disabled={CheckBtn}
            onClick={() => { }}
          ></Button>
        </ButtonGroup>
        <InlineTitle isNonUnderline>
          <span className='form-title' style={{ paddingTop: '4px', minWidth: 'auto' }}>{t('a056c9a163')} : </span>
          <DropdownWithTimeframe
            // customTimeFrameDay={'365'}
            // customDefaultTimeframe={resultTimeFrame}
            customHideItem={['last60days', 'customRange']}
            alignEnd={true}
            onInit={initTimeFrame => console.log('initTimeFrame-', initTimeFrame)}
            onChange={selectedTimeframe => console.log('selectedTimeframe-', selectedTimeframe)}
          />
          <DropdownWithAdvancedSearch
            value={''}
            alignEnd={true}
            dataBsToggleOnButton={true}
            dropdownMenuStyle={{ minWidth: 371 }}
            onChange={e => console.log(e.target.value)}
          >
            <li>
              <div className='form-title'>{t('84e3936623')}</div>
              <DropdownWithItem
                id="action-dropdown"
                type="normal"
                selectedItem={defaultDeviceTypeList[0]}
                itemList={defaultDeviceTypeList}
                onClick={() => { }}
              />
            </li>
            <li>
              <div className='form-title'>{t('92394ac496')}</div>
              <div className='form-field'>
                <Input
                  type='text'
                  value={''}
                  placeholder=''
                  onChange={e => { console.log(e.target.value) }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </div>
            </li>
            <li>
              <div className='form-title'>{t('007cc9547a')}</div>
              <DropdownWithItem
                id="action-dropdown"
                type="normal"
                selectedItem={defaultSeverityList[0]}
                itemList={defaultSeverityList}
                onClick={() => { }}
              />
            </li>
          </DropdownWithAdvancedSearch>
        </InlineTitle>
      </div>
      <Table responsive striped hover className='table-container'>
        <thead>
          <tr>
            <th>
              <Checkbox
                id="rl-th-cb1"
                type='checkbox'
                checked={checkboxlist[0].checked === true}
                onChange={e => changeCheckbox('all', e.target.checked)}
              />
            </th>
            <th>#</th>
            <th>
              <LinkerWithA
                label={t('007cc9547a')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('33ecc8b866')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                llabel={t('84e3936623')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('92394ac496')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('e7f4b6ea50')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('b5a7adde1a')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
          </tr>
        </thead>
        <SetAlertList list={checkboxlist} changeCheckbox={changeCheckbox} />
      </Table>
      <div className='d-flex justify-content-between'>
        <div className={`pagination-container  form-field ${reportAlertsStyle['align-place-fpc']}`}>
          {t('8301d01641', { number: checkboxlist.length - 1, date: '2018/01/23' })}
        </div>
        <PaginationContainer
          total={10}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />
      </div>

    </div>
  )
}

export default NotProcessed;