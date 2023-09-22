import dashboardStyle from '../../dashboard.module.scss';
import mapAlertReportStyle from '../map-alert-report.module.scss';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { Col } from 'react-bootstrap';

// Component
import Icon from 'components/Icon';

const style = {
  cursor: 'move',
};

const Map = (props) => {
  const { sortable, setChildHover, id, index, allowDrag, moveComponent } = props;

  // State
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'mapChild',
    item: () => {
      return { id, index }
    },
    canDrag: allowDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [allowDrag]);
  const [{ handlerId }, drop] = useDrop(() => ({
    accept: 'mapChild',
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

      let screen = window.innerWidth;
      if (screen < 1100) {
        // RWD mode
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      } else {
        // normal
        // drag client move right & hovered to left 0 1
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
          return;
        }

        // drag client move  left & hovered to right : 1 0
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
          return;
        }
      }

      // Time to actually perform the action
      moveComponent(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  }), [id, index]);

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Col md={10}
      data-handler-id={handlerId}
      ref={ref} style={{ ...style, opacity }}
      onMouseOver={() => setChildHover(true)} onMouseOut={() => setChildHover(false)}
      className={`
        ${sortable !== true ? '' : dashboardStyle['sortable-container-layer2']}
        ${sortable !== true ? '' : mapAlertReportStyle['map-box-adjust']}
        ${mapAlertReportStyle['map-box']}
      `}
    >
      <div className={mapAlertReportStyle['map-container']}>
        <div className={mapAlertReportStyle['title-container']}>
          <Icon className={`icon-map ${mapAlertReportStyle['dashboard-icon']}`} />
          <div style={{ display: 'contents' }}>
            <span className={`${mapAlertReportStyle['title-link']} ${mapAlertReportStyle['dashboard-title']}`}>
              <Link to='/cloud/monitor/map' style={{ textDecoration: 'none', color: '#172664' }}>MAP</Link>
            </span>
          </div>
        </div>
        <div>
          <iframe src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14455.947545499312!2d121.58834710000002!3d25.0684336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1528790465830' width='100%' allowFullScreen></iframe>
        </div>
      </div>
    </Col>
  );
};

export default Map;
