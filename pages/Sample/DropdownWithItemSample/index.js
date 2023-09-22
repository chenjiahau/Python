import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// component
import DropdownWithItem from 'components/DropdownWithItem';

const defaultLongList = [
  { title: 'long wordddddddddddddddddddddd 11111', isActive: false },
  { title: 'long wordddddddddddddddddddddd 2', isActive: false },
  { title: 'long wordddddddddddddddddddddd 3333333333333333333', isActive: false }
];

const defaultShortList = [
  { title: 'short word 1', isActive: false },
  { title: 'short word 2', isActive: false },
  { title: 'short word 3', isActive: false }
];

const DropdownWithItemSample = () => {
  const { t } = useTranslation();

  return (
    <div className='mb-5'>
      <h3>DropdownWithItem</h3>
      <Row>
        <Col className='mb-5'>
          <h5>Normal dropdown</h5>
          <DropdownWithItem
            id="dropdown-1"
            type="normal"
            selectedItem={defaultShortList[1]}
            itemList={defaultShortList}
            onClick={() => {}}
          />
        </Col>
        <Col className='mb-5'>
          <h5>IsInvalid dropdown</h5>
          <DropdownWithItem
            id="dropdown-2"
            type="normal"
            selectedItem={defaultShortList[1]}
            itemList={defaultShortList}
            onClick={() => {}}
            isInvalid
          />
        </Col>
        <Col className='mb-5'>
          <h5>Disabled dropdown</h5>
          <DropdownWithItem
            id="dropdown-2"
            type="normal"
            selectedItem={defaultShortList[1]}
            itemList={defaultShortList}
            disabled
          />
        </Col>
        <Col className='mb-5'>
          <h5>Truncate dropdown</h5>
          <DropdownWithItem
            id="dropdown-2"
            type="normal"
            selectedItem={defaultLongList[1]}
            itemList={defaultLongList}
            isTruncate
            style={{width: '150px'}}
            onClick={() => {}}
          />
        </Col>
      </Row>
    </div>
  )
};

export default DropdownWithItemSample;
