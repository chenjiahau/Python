import dashboardStyle from '../dashboard.module.scss';
import lastSummaryStyle from './last-summary.module.scss';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { cloneDeep } from 'lodash';

// Component
import { Icon } from 'components/';

import AccessPoints from './components/AccessPoints';
import Switches from './components/Switches';
import Gateways from './components/Gateways';

import MostActiveDevicesModal from './modals/MostActiveDevicesModal';
import MostActiveSSIDsModal from './modals/MostActiveSSIDsModal';
import MostActiveClientsModal from './modals/MostActiveClientsModal';
import HighestCPUModal from './modals/HighestCPUModal';
import HighestPortModal from './modals/HighestPortModal';
import MostPowerModal from './modals/MostPowerModal';
import HighestThroughModal from './modals/HighestThroughModal';
import MostDHCPClientsModal from './modals/MostDHCPClientsModal';
import TopServicePortsModal from './modals/TopServicePortsModal';

const defaultModalStatus = {
  mostActiveDevices: {
    status: false,
    disabled: false,
  },
  mostActiveSSIDs: {
    status: false,
    disabled: false,
  },
  mostActiveClients: {
    status: false,
    disabled: false,
  },
  highestCPU: {
    status: false,
    disabled: false,
  },
  highestPort: {
    status: false,
    disabled: false,
  },
  mostPower: {
    status: false,
    disabled: false,
  },
  highestThrough: {
    status: false,
    disabled: false,
  },
  mostDHCPClients: {
    status: false,
    disabled: false,
  },
  topServicePorts: {
    status: false,
    disabled: false,
  },
};

const defaultComponent = [
  { id: 0, type: 'ap' },
  { id: 1, type: 'sw' },
  { id: 2, type: 'gw' },
];

const style = {
  cursor: 'move',
};

const LastSummary = (props) => {
  const {
    childRef, sortList, changeSortList, sortable, id, index, allowDrag, moveComponent,
    swapStatus, setSwapStatus, summaryChildCpList, setSummaryChildCpList
  } = props;

  // State
  const ref = useRef(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [childHover, setChildHover] = useState(false);
  const [componentList, setComponentList] = useState(cloneDeep(summaryChildCpList));
  const [{ handlerId }, drop] = useDrop(() => ({
    accept: 'mainComponent',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
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

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  // Method
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const resetChildComponentList = () => {
    let componentList = cloneDeep(defaultComponent);
    setComponentList(componentList);
  }

  const moveChildComponent = useCallback((dragIndex, hoverIndex) => {
    setComponentList((prevCards) =>
      update(prevCards, {
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
    let tmpSwap = { id: 'summaryChild', swap: false }
    for (let i = 0; i < componentList.length; i++) {
      if (componentList[i].id !== i) {
        tmpSwap.swap = true;
      }
    }

    let newSWAPstatus = swapStatus.map((element) => {
      if (element.id === 'summaryChild')
        return tmpSwap;
      else return element;
    });

    setSwapStatus(newSWAPstatus);
    setSummaryChildCpList(componentList)
  }, [componentList]);

  return (
    <div
      ref={ref} style={{ ...style, opacity }}
      className={`${lastSummaryStyle['last-summary-container']}
      ${sortList[2].display === true ? '' : 'd-none'}`}
    >
      <div
        style={childHover ? { backgroundColor: 'white' } : {}}
        className={`${sortable !== true ? '' : dashboardStyle['sortable-container']} ${sortList[2].checked === true ? '' : 'd-none'}`}
      >
        <div className={lastSummaryStyle['title-container']}>
          <Icon className={`icon-time-24hr ${lastSummaryStyle['dashboard-icon']}`} />
          <span className={lastSummaryStyle['dashboard-title']}>
            LAST 24 HOURS SUMMARY
          </span>
        </div>
        <div>
          <Container fluid>
            {
              componentList.map((card, index) => (
                card.type === 'ap' ? (
                  <AccessPoints
                    key={index}
                    id={card.id}
                    index={index}
                    sortable={sortable}
                    sortList={sortList}
                    setChildHover={setChildHover}
                    allowDrag={allowDrag}
                    changeSortList={changeSortList}
                    changeModalStatus={changeModalStatus}
                    moveComponent={moveChildComponent}
                  />
                ) : card.type === 'sw' ? (
                  <Switches
                    key={index}
                    id={card.id}
                    index={index}
                    sortable={sortable}
                    sortList={sortList}
                    setChildHover={setChildHover}
                    allowDrag={allowDrag}
                    changeSortList={changeSortList}
                    changeModalStatus={changeModalStatus}
                    moveComponent={moveChildComponent}
                  />
                ) : (
                  <Gateways
                    key={index}
                    id={card.id}
                    index={index}
                    sortable={sortable}
                    sortList={sortList}
                    setChildHover={setChildHover}
                    allowDrag={allowDrag}
                    changeSortList={changeSortList}
                    changeModalStatus={changeModalStatus}
                    moveComponent={moveChildComponent}
                  />
                )
              ))}
          </Container>
        </div>
        <div
          className={`${dashboardStyle['remove-panel']} ${sortable === true ? '' : 'd-none'}`}
          onClick={() => changeSortList('sort-summary', false)}
        >
          -
        </div>
      </div>
      <div className={`${dashboardStyle['sortable-container']} ${sortList[2].checked === true ? 'd-none' : ''}`}>
        <Row>
          <div
            className={dashboardStyle['add-panel']}
            onClick={() => changeSortList('sort-summary', true)}
          >
            +
          </div>
        </Row>
      </div>

      <MostActiveDevicesModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <MostActiveSSIDsModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <MostActiveClientsModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <HighestCPUModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <HighestPortModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <MostPowerModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <HighestThroughModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <MostDHCPClientsModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <TopServicePortsModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default LastSummary;
