import dashboardStyle from '../dashboard.module.scss';
import topOverviewStyle from './top-overview.module.scss';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper'
import { cloneDeep } from 'lodash';

// Component
import OverviewDeviceStatus from './components/OverviewDeviceStatus';
import OverviewDeviceType from './components/OverviewDeviceType';
import VerticalLine from './components/VerticalLine';

// Modal
import OnlineModal from './modals/OnlineModal';
import OfflineModal from './modals/OfflineModal';
import WarningModal from './modals/WarningModal';
import DormantModal from './modals/DormantModal';
import GatewayModal from './modals/GatewayModal';
import SwitchModal from './modals/SwitchModal';
import AccessPointModal from './modals/AccessPointModal';

const style = {
  cursor: 'move',
};

const defaultComponent = [
  { id: 0, type: 'dStatus' },
  { id: 1, type: 'line' },
  { id: 2, type: 'dType' },
]

const defaultModalStatus = {
  online: {
    status: false,
    disabled: false,
  },
  offline: {
    status: false,
    disabled: false,
  },
  warning: {
    status: false,
    disabled: false,
  },
  dormant: {
    status: false,
    disabled: false,
  },
  gateway: {
    status: false,
    disabled: false,
  },
  switch: {
    status: false,
    disabled: false,
  },
  ap: {
    status: false,
    disabled: false,
  },
  nttcareOnline: {
    status: false,
    disabled: false,
  },
  nttcareOffline: {
    status: false,
    disabled: false,
  },
  nttcareWarning: {
    status: false,
    disabled: false,
  },
  nttcareDormant: {
    status: false,
    disabled: false,
  },
  nttcareGateway: {
    status: false,
    disabled: false,
  },
  nttcareCamera: {
    status: false,
    disabled: false,
  },
  nttcarePlug: {
    status: false,
    disabled: false,
  },
  nttcareSphygmometer: {
    status: false,
    disabled: false,
  },
};

const TopOverView = (props) => {
  const {
    childRef, sortList, changeSortList, sortable, id, index, allowDrag,
    moveComponent, swapStatus, setSwapStatus, overviewChildCpList, setOverviewChildCpList
  } = props;

  const { t } = useTranslation();

  // State
  const ref = useRef(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [childHover, setChildHover] = useState(false);
  const [componentList, setComponentList] = useState(cloneDeep(overviewChildCpList));
  const [{ isDragging }, drag] = useDrag(() => (
    {
      type: 'mainComponent',
      item: () => {
        return { id, index }
      },
      canDrag: allowDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [allowDrag],
  );

  const [{ handlerId }, drop] = useDrop(() => ({
    accept: 'mainComponent',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover (item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  // Method
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const resetChildComponentList = () => {
    setComponentList(cloneDeep(defaultComponent));
  }

  const moveChildComponent = useCallback((dragIndex, hoverIndex) => {
    setComponentList((prevCards) =>
      update(
        prevCards,
        {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
    )
  }, []);

  // Side effect
  useEffect(() => {
    childRef.resetComponentList = resetChildComponentList;
  }, []);

  useEffect(() => {
    const tmpSwap = { id: 'overviewChild', swap: false };

    for (let i = 0; i < componentList.length; i++) {
      if (componentList[i].id !== i) {
        tmpSwap.swap = true;
      }
    }

    const newSwapStatus = swapStatus.map((element) => {
      if (element.id === 'overviewChild')
        return tmpSwap;
      else
        return element;
    });

    setSwapStatus(newSwapStatus);
    setOverviewChildCpList(componentList);

  }, [componentList]);

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }} className={`${topOverviewStyle['top-overview-container']} ${sortList[0].display === true ? '' : 'd-none'}`}
    >
      <div
        style={childHover ? { 'backgroundColor': 'white' } : {}}
        className={`${sortable !== true ? '' : dashboardStyle['sortable-container']} ${sortList[0].checked === true ? '' : 'd-none'}`}
      >
        <Row>
          {
            componentList.map((card, index) => (
              card.type === 'dStatus' ? (
                <OverviewDeviceStatus
                  key={index}
                  id={card.id}
                  index={index}
                  sortable={sortable}
                  setChildHover={setChildHover}
                  changeModalStatus={changeModalStatus}
                  allowDrag={allowDrag}
                  moveChildComponent={moveChildComponent}
                />
              ) : card.type === 'line' ? (
                <VerticalLine
                  key={index}
                  id={card.id}
                  index={index}
                  allowDrag={allowDrag}
                  sortable={sortable}
                  moveChildComponent={moveChildComponent}
                />
              ) : (
                <OverviewDeviceType
                  key={index}
                  id={card.id}
                  index={index}
                  sortable={sortable}
                  setChildHover={setChildHover}
                  modalStatus={modalStatus}
                  changeModalStatus={changeModalStatus}
                  allowDrag={allowDrag}
                  moveChildComponent={moveChildComponent}
                />
              )
            ))}
        </Row>
        <div
          className={`${dashboardStyle['remove-panel']} ${sortable === true ? '' : 'd-none'}`}
          onClick={() => changeSortList('sort-overview', false)}
        >
          -
        </div>
      </div>
      <div className={`${dashboardStyle['sortable-container']} ${sortList[0].checked === true ? 'd-none' : ''}`}>
        <Row>
          <div
            className={dashboardStyle['add-panel']}
            onClick={() => changeSortList('sort-overview', true)}
          >
            +
          </div>
        </Row>
      </div>

      {/* Edit modal */}
      <OnlineModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <OfflineModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <WarningModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <DormantModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <GatewayModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <SwitchModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AccessPointModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

    </div>
  )
}

export default TopOverView;