import dashboardStyle from '../../dashboard.module.scss';
import mapAlertReportStyle from '../map-alert-report.module.scss';

import { useRef } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';

import img_widget_alerts from 'assets/img/v2/icon/widget_alerts.png';
import img_widget_report from 'assets/img/v2/icon/widget_report.png';

// Component
import Icon from 'components/Icon';

const style = {
  cursor: 'move',
};

const AlertReport = (props) => {
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
  }),
    [allowDrag],
  );

  const [{ handlerId }, drop] = useDrop(() => ({
    accept: 'mapChild',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover (item, monitor) {
      if (!ref.current) {
        return
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

      // const hoverClientX = clientOffset.x - hoverBoundingRect.left
      const hoverClientX_right = clientOffset.x - hoverBoundingRect.right;
      const hoverClientX_left = clientOffset.x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

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
        if (dragIndex < hoverIndex && hoverClientX_left < 10) {
          return;
        }

        // drag client move left & hovered to right : 1 0
        if (dragIndex > hoverIndex && hoverClientX_right > 10) {
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
  }),
    [id, index],
  );

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Col md={2}
      data-handler-id={handlerId}
      ref={ref} style={{ ...style, opacity }}
      onMouseOver={() => setChildHover(true)} onMouseOut={() => setChildHover(false)}
      className={`${sortable !== true ? '' : dashboardStyle['sortable-container-layer2']}
      ${sortable !== true ? '' : mapAlertReportStyle['vertical-box-adjust']}
      ${mapAlertReportStyle['alert-report-box']}`}
    >
      <div className={mapAlertReportStyle['vertical-container']}>
        <div className={mapAlertReportStyle['title-container']}>
          <Icon className={`icon-alerts ${mapAlertReportStyle['dashboard-icon']}`} />
          <span className={mapAlertReportStyle['dashboard-title']}>ALERT</span>
        </div>
        <div className={mapAlertReportStyle['alert-container']}>
          <Link to='/cloud/reports/alerts' style={{ textDecoration: 'none', color: '#e6185a' }}>
            <div><img src={img_widget_alerts} alt='' width={85} /></div>
            <div>
              <span className={`${mapAlertReportStyle['number-count']}`}>7</span>
            </div>
          </Link>
        </div>
      </div>
      <div className={mapAlertReportStyle['vertical-container']}>
        <div className={mapAlertReportStyle['title-container']}>
          <Icon className={`icon-reports ${mapAlertReportStyle['dashboard-icon']}`} />
          <span className={mapAlertReportStyle['dashboard-title']}>REPORT</span>
        </div>
        <div className={mapAlertReportStyle['reports-container']}>
          <Link to='/cloud/reports/summary-report' style={{ textDecoration: 'none' }}>
            <div><img src={img_widget_report} alt='' width={90} /></div>
            <div className={`${mapAlertReportStyle['number-btn']}`}>
              <span>ENTER</span>
            </div>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default AlertReport;
