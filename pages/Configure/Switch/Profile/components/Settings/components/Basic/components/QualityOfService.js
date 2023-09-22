import mainStyle from '../../../settings.module.scss';

import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { TooltipDialog, DropdownWithItem, Input, Button } from 'components/';

import ChangeQueueIdModal from './modals/ChangeQueueIdModal';
import ChangeCosModal from './modals/ChangeCosIdModal';

// Fake data
import { generateQualityOfServiceData } from 'dummy/data/switch/basic/quality-of-service';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  changeQueueId: {
    self: 'changeQueueId',
    status: false,
  },
  changeCosId: {
    self: 'changeCosId',
    status: false,
  },
};

const defaultTrustStateList = [
  { title: 'CoS/802.1p', isActive: false },
  { title: 'DSCP', isActive: false }
];

const defaultSchedulingMethodList = [
  { title: 'SP', isActive: false },
  { title: 'WRR', isActive: false }
];

const defaultQueueIdList = Array.from({ length: 8 }).map((item, index) => {
  return {
    title: index,
    isActive: false
  };
});

const defaultCosIdList = Array.from({ length: 8 }).map((item, index) => {
  return {
    title: index,
    isActive: false
  };
});

const QualityOfService = () => {
  // Fake data
  const fakeQualityOfServerData = generateQualityOfServiceData();

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [form, setForm] = useState(null);
  const [selectedQueueId, setSelectedQueueId] = useState({
    index: 0,
    queueId: null
  });
  const [selectedCosId, setSelectedCosId] = useState({
    index: 0,
    cosId: null
  });

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    const trustStateList = cloneDeep(defaultTrustStateList);
    trustStateList.forEach((item) => {
      if (item.title === fakeQualityOfServerData.trustState) {
        item.isActive = true;
      }
    });

    const schedulingMethodList = cloneDeep(defaultSchedulingMethodList);
    schedulingMethodList.forEach((item) => {
      if (item.title === fakeQualityOfServerData.schedulingMethod) {
        item.isActive = true;
      }
    });

    for (const cosToQueueMapping of fakeQualityOfServerData.cosToQueueMappingList) {
      const queueIdList = cloneDeep(defaultQueueIdList);
      queueIdList.forEach((item) => {
        if (item.title === cosToQueueMapping.queueId) {
          item.isActive = true;
        }
      });
      cosToQueueMapping.queueId = {
        selected: queueIdList.find((item) => item.isActive),
        list: queueIdList
      }
    }

    for (const dscpToCosMapping of fakeQualityOfServerData.dscpToCosMappingList) {
      const cosIdList = cloneDeep(defaultCosIdList);
      cosIdList.dscp = dscpToCosMapping.dscp;
      cosIdList.name = dscpToCosMapping.name;

      cosIdList.forEach((item) => {
        if (item.title === dscpToCosMapping.cos) {
          item.isActive = true;
        }
      });
      dscpToCosMapping.cosId = {
        selected: cosIdList.find((item) => item.isActive),
        list: cosIdList
      };
    }

    const updatedForm = {
      trustState: {
        selected: trustStateList.find((item) => item.isActive),
        list: trustStateList
      },
      schedulingMethod: {
        selected: schedulingMethodList.find((item) => item.isActive),
        list: schedulingMethodList
      },
      cosToQueueMappingList: fakeQualityOfServerData.cosToQueueMappingList,
      dscpToCosMappingList: fakeQualityOfServerData.dscpToCosMappingList
    };

    setForm(updatedForm);
  }, []);

  if (!form) {
    return;
  }

  return (
    <>
      <div className='text-title'>QUALITY OF SERVICE</div>
      <div className={mainStyle['detail']} >
        {/* Trust state */}
        <div>
          <div className='form-title'>
            Trust state
            <TooltipDialog
              className='ms-1 me-1'
              placement='bottom'
              title="All packets have a Class of Service (CoS) number assigned to them once they arrive at the incoming port. The CoS determines the transmission priority at the output port.<br>If the trust state of all ports is set to CoS/802.1p then the CoS will be based on the packet's Queue ID. If the trust state of all ports is set to DSCP then the CoS will be based on the DSCP of all IP packets."
            />
          </div>
        </div>
        <div className={`${mainStyle['two-column-block']}`}>
          <DropdownWithItem
            id="action-dropdown"
            type="normal"
            selectedItem={form.trustState.selected}
            itemList={form.trustState.list}
            onClick={() => { }}
          />
        </div>

        {/* Scheduling method */}
        <div>
          <div className='form-title'>
            Scheduling method
          </div>
        </div>
        <div className={` ${mainStyle['two-column-block']}`}>
          <DropdownWithItem
            id="action-dropdown"
            type="normal"
            selectedItem={form.schedulingMethod.selected}
            itemList={form.schedulingMethod.list}
            onClick={() => { }}
          />
        </div>

        {/* CoS to queue mapping */}
        <div>
          <div className='form-title'>
            CoS to queue mapping
          </div>
        </div>
        <div className={`${mainStyle['block']}`}>
          <div className="table-responsive" style={{ maxHeight: '300px' }}>
            <Table
              striped
              hover
              className="table-container table-container--disable-sort"
              style={{ overflowY: 'auto' }}
            >
              <thead>
                <tr>
                  <th style={{ display: 'none' }}></th>
                  <th width='70%'>Cos</th>
                  <th width='30%'>Queue ID</th>
                </tr>
              </thead>
              <tbody>
                {
                  form.cosToQueueMappingList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ display: 'none' }}></td>
                        <td>{item.cos}</td>
                        <td>
                          <Button
                            label={item.queueId.selected.title}
                            className='btn-grey-blue'
                            style={{ width: '100%' }}
                            onClick={() => {
                              setSelectedQueueId({
                                index,
                                queueId: item.queueId
                              });
                              changeModalStatus(modalStatus.changeQueueId.self, true)
                            }}
                          />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>

        {/* DSCP to CoS mapping */}
        <div>
          <div className='form-title'>
            DSCP to CoS mapping
          </div>
        </div>
        <div className={`${mainStyle['block']}`}>
          <div className="table-responsive" style={{ maxHeight: '300px' }}>
            <Table
              striped
              hover
              className="table-container table-container--disable-sort"
              style={{ overflowY: 'auto' }}
            >
              <thead>
                <tr>
                  <th style={{ display: 'none' }}></th>
                  <th width='25%'>DSCP</th>
                  <th width='25%'>Cos</th>
                  <th width='50%'>Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  form.dscpToCosMappingList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ display: 'none' }}></td>
                        <td>{item.dscp}</td>
                        <td>
                          <Button
                            label={item.cosId.selected.title}
                            className='btn-grey-blue'
                            style={{ width: '100%' }}
                            onClick={() => {
                              setSelectedCosId({
                                index,
                                cosId: item.cosId
                              });
                              changeModalStatus(modalStatus.changeCosId.self, true)
                            }}
                          />
                        </td>
                        <td>
                          <Input
                            type='text'
                            autoComplete='new-password'
                            value={item.name}
                            onChange={e => { }}
                          />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <ChangeQueueIdModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedQueueId={selectedQueueId}
        callback={(index, item) => {
          const updatedForm = { ...form };
          updatedForm.cosToQueueMappingList[index].queueId.selected = item;
          setForm(updatedForm);
        }}
      />

      <ChangeCosModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedCosId={selectedCosId}
        callback={(index, item) => {
          const updatedForm = { ...form };
          updatedForm.dscpToCosMappingList[index].cosId.selected = item;
          setForm(updatedForm);
        }}
      />
    </>
  )
}

export default QualityOfService