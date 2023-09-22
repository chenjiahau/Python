import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// component
import DropdownWithCheckbox from 'components/DropdownWithCheckbox';

const defaultLicenseKeyList = [
  { title: 'LICDBG000000000001', suffix: '34 days', checked: false },
  { title: 'LICDBG000000000002', suffix: '312 days', checked: false },
  { title: 'LICDBG000000000003', suffix: '1300 days', checked: false }
];

const defaultMspList = [
  { title: 'All', checked: false, isAll: true },
  { title: 'MSP-1', checked: false },
  { title: 'MSp-2', checked: false }
];

const defaultPortList = [
  { title: 'Port 1', checked: false },
  { title: 'Port 2', checked: false },
  { title: 'Port 3', checked: false }
];

const DropdownWithCheckboxSample = () => {
  const { t } = useTranslation();
  const [licenseKeyList1, setLicenseKeyList1] = useState(cloneDeep(defaultLicenseKeyList));
  const [mspList, setMspList] = useState(cloneDeep(defaultMspList));
  const [portList1, setPortList1] = useState(cloneDeep(defaultPortList));
  const [portList2, setPortList2] = useState(cloneDeep(defaultPortList));

  return (
    <div className='mb-5'>
      <h3>DropdownWithCheckbox</h3>
      <Row className='mb-5'>
        <Col>
          <h6>沒給label</h6>
          <h6>可參考License management &gt; Licenses &gt; Assign to</h6>
          <div>
            <DropdownWithCheckbox
              id='license-key-dropdown-1'
              type='checkbox'
              itemList={licenseKeyList1}
              onChange={item => {
                const tmpLicenseKeyList1 = cloneDeep(licenseKeyList1);
                tmpLicenseKeyList1.forEach(licenseItem => {
                  if (licenseItem.title === item.title) {
                    licenseItem.checked = !licenseItem.checked;
                  }
                });
                setLicenseKeyList1(tmpLicenseKeyList1);
              }}
            />
          </div>
        </Col>
        <Col>
          <h6>有給label</h6>
          <h6>可參考Switch Ports &gt; Edit port &gt; Forward port(s)</h6>
          <div>
            <DropdownWithCheckbox
              label='f3f6dbdba3'
              id='port-list-dropdown-2'
              type='checkbox'
              itemList={portList1}
              onChangeAll={isToggleAll => {
                const tmpPortList1 = cloneDeep(portList1);
                tmpPortList1.forEach(portItem => {
                  portItem.checked = isToggleAll;
                });
                setPortList1(tmpPortList1);
              }}
              onChange={item => {
                const tmpPortList1 = cloneDeep(portList1);
                tmpPortList1.forEach(portItem => {
                  if (portItem.title === item.title) {
                    portItem.checked = !portItem.checked;
                  }
                });
                setPortList1(tmpPortList1);
              }}
            />
          </div>
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col>
          <h6>設定list裡的某item的isAll為true</h6>
          <h6>可參考SP level &gt; Account management</h6>
          <div>
            <DropdownWithCheckbox
              id='msp-dropdown-1'
              label='f3f6dbdba3'
              type='checkbox'
              itemList={mspList}
              onChange={item => {
                const tmpMspList = cloneDeep(mspList);
                if (item.isAll) {
                  tmpMspList.forEach(mspItem => {
                    mspItem.checked = !item.checked;
                  });
                } else {
                  let allItem = null;
                  tmpMspList.forEach(mspItem => {
                    if (mspItem.isAll) {
                      allItem = mspItem;
                    }

                    if (mspItem.title === item.title) {
                      mspItem.checked = !mspItem.checked;
                    }
                  });

                  if (!!allItem) {
                    const checkedLen = tmpMspList.filter(item => !item.isAll && item.checked).length;
                    allItem.checked = checkedLen === tmpMspList.length - 1;
                  }
                }
                setMspList(tmpMspList);
              }}
            />
          </div>
        </Col>
        <Col>
          <h6>秀出All選項 + label</h6>
          <h6>可參考Switch Ports &gt; Edit port &gt; Forward port(s)</h6>
          <div>
            <DropdownWithCheckbox
              allMode={true}
              label='f3f6dbdba3'
              id='port-list-dropdown-3'
              type='checkbox'
              itemList={portList2}
              onChangeAll={isToggleAll => {
                const tmpPortList2 = cloneDeep(portList2);
                tmpPortList2.forEach(portItem => {
                  portItem.checked = isToggleAll;
                });
                setPortList2(tmpPortList2);
              }}
              onChange={item => {
                const tmpPortList2 = cloneDeep(portList2);
                tmpPortList2.forEach(portItem => {
                  if (portItem.title === item.title) {
                    portItem.checked = !portItem.checked;
                  }
                });
                setPortList2(tmpPortList2);
              }}
            />
          </div>
        </Col>
        <Col>
          <h6>秀出All選項 + label + IsInvalid + 子選項右移 </h6>
          <h6>可參考Switch Ports &gt; Edit port &gt; Forward port(s)</h6>
          <div>
            <DropdownWithCheckbox
              allMode={true}
              label='f3f6dbdba3'
              id='port-list-dropdown-3'
              type='checkbox'
              extendLiClassName="ms-4"
              isInvalid={true}
              itemList={portList2}
              onChangeAll={isToggleAll => {
                const tmpPortList2 = cloneDeep(portList2);
                tmpPortList2.forEach(portItem => {
                  portItem.checked = isToggleAll;
                });
                setPortList2(tmpPortList2);
              }}
              onChange={item => {
                const tmpPortList2 = cloneDeep(portList2);
                tmpPortList2.forEach(portItem => {
                  if (portItem.title === item.title) {
                    portItem.checked = !portItem.checked;
                  }
                });
                setPortList2(tmpPortList2);
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
};

export default DropdownWithCheckboxSample;
