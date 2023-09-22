import floorplansStyle from './floor-plans.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Table, ButtonGroup } from 'react-bootstrap';
import Breadcrumb from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import InlineTitle from '../../../components/InlineTitle';
import MessageBoxGroup from 'components/MessageBoxGroup';
import Input from '../../../components/Input';
import Icon from 'components/Icon';

import UploadModal from './modals/UploadModal';
import RemoveModal from './modals/RemoveModal';

const defaultPathList = [
  { label: '6ba872551f', isLink: false },
  { label: '52600791cd', isLink: false },
  { label: '7dce122004', isLink: false },
];
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const FloorPlans = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState({ ...defaultMessages });
  const [floorname, setFloorName] = useState('2F floor map');
  const changeFloorName = e => {
    let text = e;
    setFloorName(text);
  }
  const defaultModalStatus = {
    upload: {
      status: false,
      disabled: false,
    },
    remove: {
      status: false,
      disabled: false,
    }
  };
  const changeFloorImage = useCallback((value) => {
    setFloorImageUrl(value);
  }, []);
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const [floorImageUrl, setFloorImageUrl] = useState('../img/v2/default-floorplan.jpg');
  const [floorImageName, setFloorImageName] = useState('default-floorplan.jpg');

  let FloorDeviceSample = [
    {
      id: '01', type: 'Unplaced Devices', expand: true,
      devicelist: [
        { id: '1', name: 'AP_a', status: 'offline' },
        { id: '2', name: 'SW_c93', status: 'offline' },
        { id: '3', name: 'B0:C5:54:25:B1:66', status: 'disabled' }
      ]
    },
    {
      id: '02', type: 'AP', expand: true,
      devicelist: [
        { id: '1', name: 'AP01', status: 'online' },
        { id: '2', name: 'AP003', status: 'online' },
        { id: '3', name: 'AP_99', status: 'online' }
      ]
    },
    {
      id: '03', type: 'Switch', expand: true,
      devicelist: [
        { id: '1', name: 'SW_057', status: 'online' },
        { id: '2', name: 'SW_a', status: 'online' }
      ]
    },
    {
      id: '04', type: 'Gateway', expand: true,
      devicelist: [
        { id: '1', name: 'GW_01', status: 'online' }
      ]
    }
  ]
  const [FloorDevicelist, setFloorDevicelist] = useState(FloorDeviceSample);
  const clickDevice = (index, item) => {
    console.log(item)
    let expendItem = { id: item.id, type: item.type, expand: !item.expand, devicelist: item.devicelist };
    let updateItem = FloorDevicelist.map((element) => {
      if (element.id === expendItem.id)
        return expendItem;
      else return element;
    });
    setFloorDevicelist(updateItem);
  }

  function checkArrow(expand) {
    let result = '';
    if (expand === true) {
      result = 'icon-up-arrow';
    } else {
      result = 'icon-down-arrow'
    }
    return result;
  }
  function checkStatus(status) {
    let result = '';
    switch (status) {
      case 'online':
        result = 'online';
        break;
      case 'offline':
        result = 'offline';
        break;
      default:
        result = 'dormant';
        break;
    }
    return result;
  }

  return (
    <div className='layout-container layout-container--column layout-container--fluid'>
      <Breadcrumb pathList={defaultPathList}>
      </Breadcrumb>
      <MessageBoxGroup
        messages={messages}
        changeMessages={setMessages}
        onClose={type => setMessages({ ...messages, [type]: null })}
      />
      <div className={floorplansStyle['right-menu']}>
        {
          FloorDevicelist.map((item, index) => {
            return <div key={index}>
              <div id={item.id} className={`d-flex justify-content-between ${floorplansStyle['colbox-title']}`} onClick={() => clickDevice(index, item)} >
                <InlineTitle isNonUnderline>
                  <span>{item.type} </span>
                  <span className={`${checkArrow(item.expand)} ${floorplansStyle['icon-arrow']}`}></span>
                </InlineTitle>
              </div>
              <div className={`${item.expand === true ? 'd-block' : 'd-none'}`}>
                {
                  item.devicelist.map((list, index) => {
                    return <div key={index} className={`d-flex justify-content-between ${floorplansStyle['colbox-devicelist']}`}>
                      <InlineTitle isNonUnderline>
                        <Icon className={`icon-round ${checkStatus(list.status)} ${floorplansStyle['colbox-status']}`} />
                        <span>{list.name}</span>
                        {item.type === 'Unplaced Devices' && <Icon iconTitle="drug" className={`${floorplansStyle['icon-drug']} ${floorplansStyle['icon-devicelist']}`}
                          onClick={() => { console.log('Click drug') }} />}
                        {item.type !== 'Unplaced Devices' && <Icon iconTitle="delete" className={`icon-close ${floorplansStyle['icon-devicelist']}`}
                          onClick={() => { console.log('Click delete') }} />}
                      </InlineTitle>
                    </div>
                  })
                }
              </div>
            </div>
          })
        }
      </div>
      <div className={floorplansStyle['left-image']}>
        <div className='d-flex justify-content-between'>
          <InlineTitle isNonUnderline>
            <span className='form-title'>{t('a3f6dd3a1d')} : </span>
            <Input
              type="text"
              value={floorname}
              placeholder={t('a3f6dd3a1d')}
              onChange={e => {
                changeFloorName(e.target.value);
              }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </InlineTitle>
          <InlineTitle isNonUnderline>
            <ButtonGroup>
              <Button
                label={t('fc35ec973f')}
                onClick={() => changeModalStatus('remove', true)}
              ></Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                label={t('1f98842c35')}
                onClick={() => changeModalStatus('upload', true)}
              ></Button>
            </ButtonGroup>
          </InlineTitle>
        </div>
        <div className={floorplansStyle['floor-plan-box']}>
          <div className={floorplansStyle['floor-plan-container']}>
            <div id="floor-plan-container-image">
              <img src={floorImageUrl} draggable="false" alt=""></img>
            </div>
            <div id="floor-plan-container-device">
              <span>
                <div style={{ left: '400px', top: '400px' }} className={`ui-draggable ${floorplansStyle['draggable-container']}`}>
                  <div className={`${floorplansStyle['draggable-point']}`}></div>
                  <div className={`${floorplansStyle['tip-top']}`}>AP01</div>
                </div>
              </span>
              <span>
                <div style={{ left: '60px', top: '280px' }} className={`ui-draggable ${floorplansStyle['draggable-container']}`}>
                  <div className={`${floorplansStyle['draggable-point']}`}></div>
                  <div className={`${floorplansStyle['tip-right']}`}>AP003</div>
                </div>
              </span>
              <span>
                <div style={{ left: '520px', top: '60px' }} className={`ui-draggable ${floorplansStyle['draggable-container']}`}>
                  <div className={`${floorplansStyle['draggable-point']}`}></div>
                  <div className={`${floorplansStyle['tip-bottom']}`}>AP99</div>
                </div>
              </span>
              <span>
                <div style={{ left: '380px', top: '240px' }} className={`ui-draggable ${floorplansStyle['draggable-container']}`}>
                  <div className={`${floorplansStyle['draggable-point']}`}></div>
                  <div className={`${floorplansStyle['tip-top']}`}>SW_057</div>
                </div>
              </span>
              <span>
                <div style={{ left: '500px', top: '250px' }} className={`ui-draggable ${floorplansStyle['draggable-container']}`}>
                  <div className={`${floorplansStyle['draggable-point']}`}></div>
                  <div className={`${floorplansStyle['tip-top']}`}>SW_a</div>
                </div>
              </span>
              <span>
                <div style={{ left: '720px', top: '200px' }} className={`ui-draggable ${floorplansStyle['draggable-container']}`}>
                  <div className={`${floorplansStyle['draggable-point']}`}></div>
                  <div className={`${floorplansStyle['tip-left']}`}>GW_01</div>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className={floorplansStyle['apply-btn-group']}>
          <Button
            label={t('ea4788705e')}
            className='btn-cancel me-3'
            onClick={() => { console.log('Click on Cancel') }}
          />
          <Button
            label={t('c9cc8cce24')}
            className='btn-submit'
            onClick={() => { console.log('Click on Save') }}
          />
        </div>

      </div>
      {/* Edit modal */}
      <UploadModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        changeFloorImage={changeFloorImage}
      />
      <RemoveModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        changeFloorImage={changeFloorImage}
        floorImageName={floorImageName}
      />
    </div>
  );
};

export default FloorPlans;
