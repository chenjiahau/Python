import mainStyle from '../switch-ports.module.scss';

import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { Button, ModalContainer, RadioButton, DropdownWithItem, Input } from 'components/';

// Default variable
const defaultDirectionList = [
  { title: 'Both', isActive: true },
  { title: 'RX', isActive: false },
  { title: 'TX', isActive: false },
]

const MirrorPortModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    selectedPortList = [],
    mirroredPortList = [],
    mirrorDestinationPort = null,
    isUnmirror,
    setIsUnmirror,
    pushToDevice = () => { }
  } = props;

  // State
  const [deviceName, setDeviceName] = useState(null);
  const [directionList, setDirectionList] = useState(cloneDeep(defaultDirectionList));
  const [destinationPort, setDestinationPort] = useState('');

  // Method
  const getSubmitBtnLabel = () => {
    if (mirroredPortList.length === 0) {
      return 'Create port mirror';
    }

    if (mirroredPortList.length !== 0 && !isUnmirror) {
      return 'Update port mirror';
    } else {
      return 'Delete port mirror';
    }
  }

  // Side effect
  useEffect(() => {
    if (selectedPortList.length === 0) {
      return;
    }

    setDeviceName(selectedPortList[0].deviceName);
  }, [selectedPortList]);

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.mirrorPort.status}
      closeModal={() => {
        setIsUnmirror(false);
        changeModalStatus(modalStatus.mirrorPort.self, false)
      }}
    >
      <div className='header'>
        <div className='title'>
          {mirroredPortList.length === 0 && 'Create port mirror'}
          {mirroredPortList.length !== 0 && !isUnmirror && 'Update port mirror'}
          {mirroredPortList.length !== 0 && isUnmirror && 'Delete port mirror'}
        </div>
      </div>
      <div className={`body ${mainStyle['mirror-port-modal-body']}`}>
        <div className='form-group'>
          <div className={`form-title short-block-margin ${mainStyle['form-title']}`}>Switch:</div>
          <div className='form-field'>
            {deviceName}
          </div>
        </div>

        {
          mirroredPortList.length === 0 && (
            <>
              <div className='form-group form-group--align-top'>
                <div className={`form-title short-block-margin ${mainStyle['form-title']}`}>Source ports:</div>
                <div className='form-field'>
                  {
                    selectedPortList.map((port, index) => {
                      return (
                        <div
                          key={index}
                          className={mainStyle['source-port-block']}
                        >
                          <div className={mainStyle['item']}>
                            <div className={mainStyle['port']}></div>
                          </div>
                          <div className={mainStyle['item']}>Port {port.port}</div>
                          <DropdownWithItem
                            id='direction'
                            type='normal'
                            style={{ width: '100%' }}
                            selectedItem={directionList.find(item => item.isActive)}
                            itemList={directionList}
                            onClick={direction => { }}
                          />
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              <div className='form-group'>
                <div className={`form-title short-block-margin ${mainStyle['form-title']}`}>Destination port :</div>
                <div className='form-field'>
                  <Input
                    type='text'
                    autoComplete='new-email'
                    value={destinationPort}
                    onChange={e => { }}
                  />
                </div>
              </div>

              <div className='form-group'>
                <div className={`form-title short-block-margin ${mainStyle['form-title']}`}></div>
                <div className={`form-field ${mainStyle['action-block']}`}>
                  <Button
                    label='Cancel'
                    className='btn-cancel'
                    onClick={() => changeModalStatus(modalStatus.mirrorPort.self, false)}
                  />
                  <Button
                    label='Create port mirror'
                    className='btn-submit'
                    onClick={() => pushToDevice()}
                  />
                </div>
              </div>
            </>
          )
        }

        {
          mirroredPortList.length !== 0 && (
            <>
              <div className='form-group'>
                <div className={`form-title short-block-margin ${mainStyle['form-title']} `}>Existing source ports:</div>
                <div className='form-field'>
                  {
                    mirroredPortList.map((port, index) => {
                      return (
                        <div
                          key={index}
                          className={mainStyle['existing-port-block']}
                        >
                          <div className={mainStyle['item']}>
                            <div className={mainStyle['port']}></div>
                          </div>
                          <div className={mainStyle['item']}>Port {port.port}</div>
                          <div className={mainStyle['item']}>{port.mirrorType}</div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>

              <div className='form-group form-group--align-top'>
                <div className={`form-title short-block-margin ${mainStyle['form-title']} `}>Source ports:</div>
                <div className='form-field'>
                  {
                    selectedPortList.map((port, index) => {
                      return (
                        <div
                          key={index}
                          className={mainStyle['source-port-block']}
                        >
                          <div className={mainStyle['item']}>
                            <div className={mainStyle['port']}></div>
                          </div>
                          <div className={mainStyle['item']}>Port {port.port}</div>
                          {
                            !isUnmirror && (
                              <>
                                <DropdownWithItem
                                  id='direction'
                                  type='normal'
                                  style={{ width: '100%' }}
                                  selectedItem={directionList.find(item => item.isActive)}
                                  itemList={directionList}
                                  onClick={direction => { }}
                                />
                              </>
                            )
                          }
                        </div>
                      );
                    })
                  }
                </div>
              </div>

              <div className='form-group form-group--align-top'>
                <div className={`form-title short-block-margin ${mainStyle['form-title']} `}>Destination port:</div>
                <div className='form-field'>
                  <div className={mainStyle['destination-port-block']}>
                    <div className={mainStyle['item']}>
                      <div className={mainStyle['port-white']}></div>
                    </div>
                    <div className={mainStyle['item']}>
                      Port {mirrorDestinationPort.port}
                    </div>
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <div className={`form-title short-block-margin ${mainStyle['form-title']} `}></div>
                <div className={`form-field ${mainStyle['action-block']} `}>
                  <Button
                    label='Cancel'
                    className='btn-cancel'
                    onClick={() => {
                      setIsUnmirror(false);
                      changeModalStatus(modalStatus.mirrorPort.self, false)
                    }}
                  />
                  <Button
                    label={getSubmitBtnLabel()}
                    className='btn-submit'
                    onClick={() => {
                      setIsUnmirror(false);
                      pushToDevice();
                    }}
                  />
                </div>
              </div>
            </>
          )
        }

      </div>
    </ModalContainer>
  );
};

export default MirrorPortModal;
