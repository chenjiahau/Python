import topOverviewStyle from '../top-overview.module.scss';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const VerticalLine = (props) => {
  const { id, index, allowDrag, moveChildComponent, sortable } = props;

  // State
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'overviewChild',
    item: () => {
      return { id, index }
    },
    canDrag: false,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }),
    [allowDrag],
  );
  const [{ handlerId }, drop] = useDrop(() => ({
    accept: 'overviewChild',
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
      item.index = hoverIndex;
    },
  }), [id, index]);

  drag(drop(ref));

  return (
    <div className={`${sortable !== true ? '' : 'd-none'} ${topOverviewStyle['overview-vertical-line']}`}></div>
  );
};

export default VerticalLine;
