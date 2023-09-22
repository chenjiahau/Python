import dashboardStyle from '../dashboard.module.scss';
import mapAlertReportStyle from './map-alert-report.module.scss';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Row } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper'
import { cloneDeep } from 'lodash';

// Component
import Map from './components/Map';
import AlertReport from './components/AlertReport';

const style = {
  cursor: 'move',
};

const defaultComponent = [
  { id: 0, type: 'map' },
  { id: 1, type: 'ar' }
];

const MapAlertReport = (props) => {
  const {
    childRef, sortList, changeSortList, sortable, id, index, allowDrag, moveComponent,
    swapStatus, setSwapStatus, mapChildCpList, setMapChildCpList
  } = props;

  // State
  const ref = useRef(null);
  const [childHover, setChildHover] = useState(false);
  const [componentList, setComponentList] = useState(cloneDeep(mapChildCpList));
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'mainComponent',
    item: () => {
      return { id, index }
    },
    canDrag: allowDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [allowDrag]);
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

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveComponent(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  }));

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  // Method
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
    let tmpSwap = { id: 'mapChild', swap: false }
    for (let i = 0; i < componentList.length; i++) {
      if (componentList[i].id !== i) {
        tmpSwap.swap = true;
      }
    }

    let newSwapStatus = swapStatus.map((element) => {
      if (element.id === 'mapChild')
        return tmpSwap;
      else return element;
    });

    setSwapStatus(newSwapStatus);
    setMapChildCpList(componentList)
  }, [componentList]);

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }} className={`${mapAlertReportStyle['map-alert-report-container']} ${sortList[1].display === true ? '' : 'd-none'}`}
    >
      <div
        style={childHover ? { 'backgroundColor': 'white' } : {}}
        className={`${sortable !== true ? '' : dashboardStyle['sortable-container']} ${sortList[1].checked === true ? '' : 'd-none'}`}
      >
        <Row>
          {
            componentList.map((card, index) => (
              card.type === 'map' ? (
                <Map
                  sortable={sortable}
                  setChildHover={setChildHover}
                  key={index}
                  id={card.id}
                  index={index}
                  allowDrag={allowDrag}
                  moveComponent={moveChildComponent}
                />
              ) : (
                <AlertReport
                  sortable={sortable}
                  setChildHover={setChildHover}
                  key={index}
                  id={card.id}
                  index={index}
                  allowDrag={allowDrag}
                  moveComponent={moveChildComponent}
                />
              )
            ))
          }
        </Row>
        <div
          className={`${dashboardStyle['remove-panel']} ${sortable === true ? '' : 'd-none'}`}
          onClick={() => changeSortList('sort-map-alert-report', false)}
        >
          -
        </div>
      </div>
      <div className={`${dashboardStyle['sortable-container']} ${sortList[1].checked === true ? 'd-none' : ''}`}>
        <Row>
          <div
            className={dashboardStyle['add-panel']}
            onClick={() => changeSortList('sort-map-alert-report', true)}
          >
            +
          </div>
        </Row>
      </div>
    </div>
  )
}

export default MapAlertReport;