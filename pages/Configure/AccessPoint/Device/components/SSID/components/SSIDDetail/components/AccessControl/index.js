import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import Button from 'components/Button';

import MacFiltering from './components/MacFiltering';
import IpFiltering from './components/IpFiltering';

const AccessControl = (props) => {
  const {
    originMacFilteringData,
    setOriginMacFilteringData,
    syncMacFilteringData,
    originIpFilteringData,
    setOriginIpFilteringData,
    syncIpFilteringData,
    modalStatus,
    changeModalStatus,
    selectedSsid,
    pushToDevice
  } = props;

  return (
    <>
      <div className="tab-container-border">
        <div className="row-block">
          <MacFiltering
            originMacFilteringData={originMacFilteringData}
            setOriginMacFilteringData={setOriginMacFilteringData}
            syncMacFilteringData={syncMacFilteringData}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
          />

          <IpFiltering
            originIpFilteringData={originIpFilteringData}
            setOriginIpFilteringData={setOriginIpFilteringData}
            syncIpFilteringData={syncIpFilteringData}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
          />
        </div>

        <div className='apply-btn-group'>
          <Button
            label='Cancel'
            className='btn-cancel me-3'
            onClick={() => { console.log('Click on Cancel') }}
          />
          <Button
            label='Apply'
            className='btn-submit'
            onClick={() => pushToDevice()}
          />
        </div>
      </div>
    </>
  );
}

export default AccessControl;