import mainStyle from '../ports.module.scss';

import { useState, useEffect } from 'react';

// Component
import { Button, ModalContainer, RadioButton } from 'components/';

const AggregatePortModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    selectedPortList = []
  } = props;

  // State
  const [deviceName, setDeviceName] = useState(null);
  const [type, setType] = useState(true);

  // Side effect
  useEffect(() => {
    if (selectedPortList.length === 0) {
      return;
    }

    setDeviceName(selectedPortList[0].deviceName);
  }, [selectedPortList]);

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.aggregatePort.status}
      closeModal={() => changeModalStatus(modalStatus.aggregatePort.self, false)}
    >
      <div className="header">
        <div className="title">Link aggregation setting</div>
      </div>
      <div className={`body ${mainStyle['aggregate-port-modal-body']}`}>
        <div className='form-group'>
          <div className={`form-title short-block-margin ${mainStyle['form-title']}`}>Switch:</div>
          <div className='form-field'>
            {deviceName}
          </div>
        </div>

        <div className='form-group'>
          <div className={`form-title short-block-margin ${mainStyle['form-title']}`}>Select aggregate type:</div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="type-lacp"
              name="lacp"
              label="LACP"
              checked={type}
              onChange={() => setType(true)}
            />
            <div style={{ width: '20px' }}></div>
            <RadioButton
              id="type-static"
              name="static"
              label="Static"
              checked={!type}
              onChange={() => setType(false)}
            />
          </div>
        </div>

        <div className='form-group form-group--align-top'>
          <div className={`form-title short-block-margin ${mainStyle['form-title']}`}>Member ports:</div>
          <div className='form-field'>
            {
              selectedPortList.map((port, index) => {
                return (
                  <div
                    key={index}
                    className={mainStyle['member-port-block']}
                  >
                    <div className={mainStyle['item']}>
                      <div className={mainStyle['port']}></div>
                    </div>
                    <div className={mainStyle['item']}>
                      Port {port.port}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>

        <div className='form-group'>
          <div className={`form-title short-block-margin ${mainStyle['form-title']}`}></div>
          <div className={`form-field ${mainStyle['action-block']}`}>
            <Button
              label="Cancel"
              className="btn-cancel"
              onClick={() => changeModalStatus(modalStatus.aggregatePort.self, false)}
            />
            <Button
              label="Aggregate"
              className="btn-submit"
              onClick={() => changeModalStatus(modalStatus.aggregatePort.self, false)}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AggregatePortModal;
