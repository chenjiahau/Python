import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Component
import {
  Button,
  ModalContainer,
  Input,
  Textarea
} from 'components';

import { getViewClientList } from 'dummy/data/gateway/data/vpn/open-vpn/client-list';

const ViewModal = ({
  modalStatus,
  changeModalStatus,
  selectedClientList,
  selectedDeviceModelName
}) => {
  const { t } = useTranslation();
  const [clientList, setClientList] = useState(null);

  useEffect(() => {
    const tmpClientList = getViewClientList(selectedClientList);
    setClientList(tmpClientList);
  }, [modalStatus.viewClientList.status])

  if(!clientList) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.viewClientList.status}
      closeModal={() => changeModalStatus('viewClientList', false)}
    >
      <div className='header'>
        <div className='title'>Client details</div>
      </div>
      <div className='body'>
        <div className='modal-form-title'>Content</div>
        <Textarea
          style={{height: '236px'}}
          value={selectedClientList?.content}
          placeholder={t('0c55b5f5f0')} // 8-63 characters
          readOnly
        />
      </div>

      <div className='footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => changeModalStatus('viewClientList', false)}
        />
      </div>

    </ModalContainer >
  );
};

export default ViewModal;
