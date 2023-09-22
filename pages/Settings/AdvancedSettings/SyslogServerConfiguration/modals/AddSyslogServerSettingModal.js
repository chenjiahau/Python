import { Row, Col } from 'react-bootstrap';

import { useState } from 'react';
import { cloneDeep } from 'lodash';

// Components
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ModalContainer from '../../../../../components/ModalContainer';
import DropdownWithItem from '../../../../../components/DropdownWithItem';
import DropdownWithCheckbox from '../../../../../components/DropdownWithCheckbox';

const dropdownProtocolList = [
  { title: 'UDP', isActive: true },
  { title: 'TCP', isActive: false },
];

const defaultSiteList = [
  { title: 'All', checked: false, isAll: true },
  { title: 'Japan', checked: false },
  { title: 'Test_site_1', checked: false },
  { title: 'Singapore', checked: false },
  { title: 'Taiwan', checked: false },
];

const AddSyslogServerSettingModal = props => {
  const { modalStatus, changeModalStatus } = props;

  const [siteList, setSiteList] = useState(cloneDeep(defaultSiteList));

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.add.status}
      closeModal={() => changeModalStatus('add', false)}
    >
      <div className="header">
        <div className="title">Add syslog server setting</div>
      </div>
      <div className="body">
        <Row className="mb-2">
          <Col sm={6}>
            {/* Name */}
            <div className="modal-form-title required">Name</div>
            <Input
              type="text"
              value=""
              placeholder="1-64 Characters"
              minLength={1}
              maxLength={64}
              onChange={e => {}}
              onFocus={() => {}}
              onBlur={() => {}}
            />
          </Col>
          <Col sm={6}>
            {/* Syslog server */}
            <div className="modal-form-title required">Syslog server</div>
            <Input
              type="text"
              value=""
              placeholder="192.168.200.1 or FQDN"
              onChange={e => {}}
              onFocus={() => {}}
              onBlur={() => {}}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm={6}>
            {/* Syslog server port */}
            <div className="modal-form-title required">Syslog server port</div>
            <Input
              type="number"
              value="514"
              placeholder="1-65535"
              min={1}
              max={65535}
              onChange={e => {}}
              onFocus={() => {}}
              onBlur={() => {}}
            />
          </Col>
          <Col sm={6}>
            {/* Protocol */}
            <div className="modal-form-title required">Protocol</div>
            <DropdownWithItem
              id="protocol-dropdown"
              type="normal"
              selectedItem={dropdownProtocolList[0]}
              itemList={dropdownProtocolList}
              onClick={() => {}}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            {/* Select site */}
            <div className="modal-form-title">Select site</div>
            <DropdownWithCheckbox
              // allMode={true}
              id="site-list-dropdown"
              label="c7d0b2bf4f"
              type="checkbox"
              itemList={siteList}
              onChange={item => {
                const tmpSiteList = cloneDeep(siteList);
                if (item.isAll) {
                  tmpSiteList.forEach(siteItem => {
                    siteItem.checked = !item.checked;
                  });
                } else {
                  let allItem = null;
                  tmpSiteList.forEach(siteItem => {
                    if (siteItem.isAll) {
                      allItem = siteItem;
                    }

                    if (siteItem.title === item.title) {
                      siteItem.checked = !siteItem.checked;
                    }
                  });

                  if (!!allItem) {
                    const checkedLen = tmpSiteList.filter(
                      item => !item.isAll && item.checked
                    ).length;
                    allItem.checked = checkedLen === tmpSiteList.length - 1;
                  }
                }
                setSiteList(tmpSiteList);
              }}
            />
          </Col>
        </Row>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click close');
            changeModalStatus('add', false);
          }}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('add', false);
          }}
          disabled
        />
      </div>
    </ModalContainer>
  );
};

export default AddSyslogServerSettingModal;
