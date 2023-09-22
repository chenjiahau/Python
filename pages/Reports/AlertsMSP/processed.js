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
    type: '1th', id: 1, checked: false, severity: 'Warning', time: '2018/02/01 06:12:05',
    device: 'Switch', name: 'SW_a', MAC: '10:BE:F5:CB:0F:E0', description: 'SW_a was disconnected'
  },
  {
    type: '2th', id: 2, checked: false, severity: 'Warning', time: '2018/02/01 06:05:11',
    device: 'Access point', name: 'AP01', MAC: 'A4:5E:60:C4:71:13', description: 'A4:5E:60:C4:71:14 was disconnected'
  },
  {
    type: '3th', id: 3, checked: false, severity: 'Information', time: '2018/02/01 05:10:18',
    device: 'Switch', name: 'SWITCH-67', MAC: '20:18:62:22:02:14', description: 'SWITCH-67\'s port 3 was link-down'
  },
  {
    type: '4th', id: 4, checked: false, severity: 'Warning', time: '2018/02/01 04:55:34',
    device: 'Switch', name: 'SW057', MAC: '20:18:62:22:02:14', description: 'SW057 was disconnected'
  },
  {
    type: '5th', id: 5, checked: false, severity: 'Critical', time: '2018/02/01 03:05:55',
    device: 'Access point', name: 'AP_zzu', MAC: '2C:1F:23:5E:E0:92', description: '2C:1F:23:5E:E0:93 was disconnected'
  },
  {
    type: '6th', id: 6, checked: false, severity: 'Warning', time: '2018/02/01 02:15:28',
    device: 'Gateway', name: 'HQGW01', MAC: '00:18:0A:C8:95:EF', description: 'HQGW01 disconnected to Nuclias'
  },
  {
    type: '7th', id: 7, checked: false, severity: 'Warning', time: '2018/02/01 01:30:58',
    device: 'Gateway', name: 'FRAGW01', MAC: '00:18:0A:C8:98:D5', description: 'FRAGW01 disconnected to Nuclias'
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

const Processed = () => {
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

  return (
    <div className='layout-container layout-container--column layout-container--fluid'>
      <div className='d-flex justify-content-between'>
        <ButtonGroup>
          <Button
            label={t('f2a6c498fb')}
            disabled={CheckBtn}
            onClick={() => { }}
          ></Button>
        </ButtonGroup>
        <InlineTitle isNonUnderline>
          <span className='form-title'>{t('a056c9a163')} : </span>
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
                label={t('84e3936623')}
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

export default Processed;