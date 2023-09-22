import dashboardStyle from '../../../dashboard.module.scss';
import topOverviewStyle from '../../top-overview.module.scss';

import { useRef } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

// Slice
import { selectUserView } from 'stores/slice/user';

// Component
import Nuclias from './Nuclias';

const style = {
  cursor: 'move',
};

const OverviewDeviceType = (props) => {
  const { sortable, changeModalStatus, setChildHover, id, index, allowDrag, moveChildComponent } = props;
  const userView = useSelector(selectUserView) || localStorage.getItem('userView');

  // State
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'overviewChild',
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
    accept: 'overviewChild',
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
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      let screen = window.innerWidth;
      if (screen < 1100) {
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      } else {
        // drag client move right & hovered to left 0 1
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
          return;
        }
        // drag client move  left & hovered to right : 1 0
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
          return;
        }
      }

      moveChildComponent(dragIndex, hoverIndex);
      if (dragIndex < hoverIndex) {
        moveChildComponent(0, 1);
      } else {
        moveChildComponent(1, 2);
      }

      item.index = hoverIndex;
    },
  }), [id, index]);

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Col md={7}
      data-handler-id={handlerId}
      ref={ref} style={{ ...style, opacity }}
      onMouseOver={() => setChildHover(true)} onMouseOut={() => setChildHover(false)}
      className={`${sortable !== true ? '' : dashboardStyle['sortable-container-layer2']}  ${topOverviewStyle['overview-device-type-container']}`}
    >
      {userView === 'nuclias' && <Nuclias changeModalStatus={changeModalStatus} />}

    </Col>
  );
};

export default OverviewDeviceType;
