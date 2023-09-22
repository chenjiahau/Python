import dashboardStyle from './dashboard.module.scss';

import { useRef } from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper'
import { cloneDeep } from 'lodash';

// Component
import { Icon, ReturnToTop } from 'components/';

import CustomizeBox from './CustomBox';
import TopOverview from './TopOverview';
import MapAlertReport from './MapAlertReport';
import LastSummary from './LastSummary';
import ResetModal from './modals/ResetModal';
// import WhatsNewsModal from './modals/WhatsNewsModal';

const defaultSortList = [
  {
    layer: 'l1',
    id: 'sort-overview',
    label: 'Overview',
    checked: true,
    display: true
  },
  {
    layer: 'l1',
    id: 'sort-map-alert-report',
    label: 'Map + alerts + reports',
    checked: true,
    display: true
  },
  {
    layer: 'l1',
    id: 'sort-summary',
    label: 'Last 24 hours summary',
    checked: true,
    display: true
  },
  {
    layer: 'l2',
    id: 'sort-summary-ap',
    label: 'Access points',
    checked: true,
    display: true
  },
  {
    layer: 'l2',
    id: 'sort-summary-sw',
    label: 'Switches',
    checked: true,
    display: true
  },
  {
    layer: 'l2',
    id: 'sort-summary-gw',
    label: 'Gateway',
    checked: true,
    display: true
  },
];

const userDataList = [
  {
    layer: 'l1',
    id: 'sort-overview',
    label: 'Overview',
    checked: true,
    display: true
  },
  {
    layer: 'l1',
    id: 'sort-map-alert-report',
    label: 'Map + alerts + reports',
    checked: true,
    display: true
  },
  {
    layer: 'l1',
    id: 'sort-summary',
    label: 'Last 24 hours summary',
    checked: true,
    display: true
  },
  {
    layer: 'l2',
    id: 'sort-summary-ap',
    label: 'Access points',
    checked: true,
    display: true
  },
  {
    layer: 'l2',
    id: 'sort-summary-sw',
    label: 'Switches',
    checked: true,
    display: true
  },
  {
    layer: 'l2',
    id: 'sort-summary-gw',
    label: 'Gateway',
    checked: true,
    display: true
  },
];

const defaultSwapList = [
  { id: 'mainComponent', swap: false },
  { id: 'overviewChild', swap: false },
  { id: 'mapChild', swap: false },
  { id: 'summaryChild', swap: false }
];

const defaultMainChildCpList = [
  { id: 0, type: 'topOverview' },
  { id: 1, type: 'mapAlertReport' },
  { id: 2, type: 'lastSummary' }
];

const defaultOverviewChildCpList = [
  { id: 0, type: 'dStatus' },
  { id: 1, type: 'line' },
  { id: 2, type: 'dType' }
];

const defaultMapChildCpList = [
  { id: 0, type: 'map' },
  { id: 1, type: 'ar' },
];

const defaultSummaryChildCpList = [
  { id: 0, type: 'ap' },
  { id: 1, type: 'sw' },
  { id: 2, type: 'gw' }
];

const defaultModalStatus = {
  whatsNews: {
    status: true,
    disabled: false
  },
  reset: {
    status: false,
    disabled: false
  }
};

const Nuclias = (props) => {
  const { t } = useTranslation();

  // State
  const topChildRef = useRef(null);
  const marChildRef = useRef(null);
  const sumChildRef = useRef(null);
  const [allowDrag, setAllowDrag] = useState(false);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [sortList, setSortList] = useState(cloneDeep(defaultSortList));
  const [sortable, setSortable] = useState(false);
  const [resetStatus, setResetStatus] = useState(false);
  const [swapStatus, setSwapStatus] = useState(cloneDeep(defaultSwapList));

  const [mainComponents, setMainComponents] = useState(cloneDeep(defaultMainChildCpList));
  const [overviewChildCpList, setOverviewChildCpList] = useState(cloneDeep(defaultOverviewChildCpList));
  const [mapChildCpList, setMapChildCpList] = useState(cloneDeep(defaultMapChildCpList));
  const [summaryChildCpList, setSummaryChildCpList] = useState(cloneDeep(defaultSummaryChildCpList));

  // Method
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const changeSortList = (id, value) => {
    let tmpList = [...sortList];

    for (let item of tmpList) {
      if (item.id === id) {
        item.checked = value;
      }
    }

    if (id === 'sort-summary') {
      if (!value) {
        tmpList[3].checked = false;
        tmpList[4].checked = false;
        tmpList[5].checked = false;
      } else {
        tmpList[3].checked = true;
        tmpList[4].checked = true;
        tmpList[5].checked = true;
      }
    }

    if (tmpList[3].checked === true || tmpList[4].checked === true || tmpList[5].checked === true) {
      tmpList[2].checked = true;
    }
    if (tmpList[3].checked === false && tmpList[4].checked === false && tmpList[5].checked === false) {
      tmpList[2].checked = false;
    }

    setSortList(tmpList);
  };

  const checkResetBtn = () => {
    setResetStatus(false);
    for (let i = 0; i < sortList.length; i++) {
      if (sortList[i].checked !== userDataList[i].checked) {
        setResetStatus(true);
        break;
      }
    }

    for (let j = 0; j < swapStatus.length; j++) {
      if (swapStatus[j].swap !== false) {
        setResetStatus(true);
        break;
      }
    }
  }

  const resetChildComponents = () => {
    setMainComponents(cloneDeep(defaultMainChildCpList));
  }

  const resetSortList = () => {
    const defaultSort = cloneDeep(defaultSortList);
    setSortList(defaultSort);
    resetChildComponents();

    topChildRef.resetComponentList();
    marChildRef.resetComponentList();
    sumChildRef.resetComponentList();

    setSwapStatus(cloneDeep(defaultSwapList));
  }

  const moveChildComponent = useCallback((dragIndex, hoverIndex) => {
    setResetStatus(true);
    setMainComponents((prevCards) =>
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
    checkResetBtn();
  }, [swapStatus, sortList]);

  const setMovable = useCallback((value) => {
    setAllowDrag(value)
  }, [allowDrag, setAllowDrag]);

  return (
    <div className={`layout-container layout-container--fluid ${dashboardStyle['dashboard-container']}`}>
      <DndProvider backend={HTML5Backend}>
        <CustomizeBox
          sortList={sortList}
          setSortList={setSortList}
          changeSortList={changeSortList}
          resetStatus={resetStatus}
          setResetStatus={setResetStatus}
          sortable={sortable}
          setSortable={setSortable}
          changeModalStatus={changeModalStatus}
          setMovable={setMovable}
        />
        {
          mainComponents.map((card, index) => (
            card.type === 'topOverview' ? (
              <TopOverview
                key={index}
                id={card.id}
                index={index}
                childRef={topChildRef}
                sortList={sortList}
                changeSortList={changeSortList}
                sortable={sortable}
                allowDrag={allowDrag}
                swapStatus={swapStatus}
                setSwapStatus={setSwapStatus}
                overviewChildCpList={overviewChildCpList}
                setOverviewChildCpList={setOverviewChildCpList}
                moveChildComponent={moveChildComponent}
              />
            ) : card.type === 'mapAlertReport' ? (
              <MapAlertReport
                key={index}
                id={card.id}
                index={index}
                childRef={marChildRef}
                sortList={sortList}
                changeSortList={changeSortList}
                sortable={sortable}
                allowDrag={allowDrag}
                swapStatus={swapStatus}
                setSwapStatus={setSwapStatus}
                mapChildCpList={mapChildCpList}
                setMapChildCpList={setMapChildCpList}
                moveComponent={moveChildComponent}
              />
            ) : (
              <LastSummary
                key={index}
                id={card.id}
                index={index}
                childRef={sumChildRef}
                sortList={sortList}
                changeSortList={changeSortList}
                sortable={sortable}
                allowDrag={allowDrag}
                swapStatus={swapStatus}
                setSwapStatus={setSwapStatus}
                summaryChildCpList={summaryChildCpList}
                setSummaryChildCpList={setSummaryChildCpList}
                moveComponent={moveChildComponent}
              />
            )
          ))}

        <ReturnToTop />

        {/* Edit modal */}
        <ResetModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
          resetSortList={resetSortList}
        />

        {/* Whats news */}
        {/* <WhatsNewsModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        /> */}

      </DndProvider>

      <div
        className={`
          ${dashboardStyle['sortable-container']}
          ${dashboardStyle['sortable-container-large']}
          ${sortList[0].display === false && sortList[1].display === false && sortList[2].display === false ? '' : 'd-none'}
        `}
      >
        <Row>
          <div
            className={`${dashboardStyle['add-panel']} ${dashboardStyle['add-panel-large']}`}
            onClick={() => { resetSortList() }}
          >
            +
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Nuclias;
