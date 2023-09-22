import dashboardStyle from '../../dashboard.module.scss';
import lastSummaryStyle from '../last-summary.module.scss';

import { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';

import imgSW from 'assets/img/v2/icon/device_switch.png';

const style = {
  cursor: 'move',
};

const Switches = (props) => {
  const {
    changeModalStatus,
    sortable,
    changeSortList,
    sortList,
    setChildHover,
    id,
    index,
    allowDrag,
    moveComponent,
  } = props;

  // Statue
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'summaryChild',
      item: () => {
        return { id, index };
      },
      canDrag: allowDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [allowDrag]
  );
  const [{ handlerId }, drop] = useDrop(() => ({
    accept: 'summaryChild',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
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

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

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
  }), [id, index]);

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
        style={{ ...style, opacity }}
        className={`${sortList[4].display === true ? '' : 'd-none'}`}
      >
        <Row
          onMouseOver={() => setChildHover(true)}
          onMouseOut={() => setChildHover(false)}
          className={`
            ${sortable !== true ? '' : dashboardStyle['sortable-container-layer2']}
            ${sortList[4].checked === true ? '' : 'd-none'} ${lastSummaryStyle['sortable-layer2-adjust']}`}
        >
          <Col xs={12} lg={2} className={`mb-5 ${lastSummaryStyle['summary-device-container']}`}>
            <div className={lastSummaryStyle['summary-title-box']}>
              <Link to='/cloud/monitor/switch/clients'>
                <div className={lastSummaryStyle['summary-title-box-title']}>
                  Switches
                </div>
                <img src={imgSW} alt='' width={80} />
                <div className={`${lastSummaryStyle['summary-bigfont']} ${lastSummaryStyle['greenishTeal']} ${lastSummaryStyle['fu']}`}>
                  6
                </div>
                <span className={lastSummaryStyle['summary-clients']}>
                  Clients
                </span>
              </Link>
            </div>
          </Col>
          <div className={lastSummaryStyle['overview-vertical-line']}></div>
          <Col md={12} lg className={lastSummaryStyle['summary-detail-container']}>
            <div className={lastSummaryStyle['summary-body-s-box']}>
              <div className={lastSummaryStyle['summary-body-s-box-title']}>
                <div
                  className={lastSummaryStyle['summary-body-box-title-bubblegum']}
                  onClick={() => changeModalStatus('highestCPU', true)}
                >
                  Highest CPU utilization (&gt; 50%)
                </div>
              </div>
              <div className={lastSummaryStyle['summary-body-s-box-body']}>
                <div
                  title='SW057'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      1
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      SW057
                    </span>
                  </div>
                  <div>100%</div>
                </div>
                <div
                  title='B0:C5:54:25:B1:66'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      2
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      B0:C5:54:25:B1:66
                    </span>
                  </div>
                  <div>76%</div>
                </div>
                <div
                  title='Switch-67'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      3
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      Switch-67
                    </span>
                  </div>
                  <div>64%</div>
                </div>
                <div className={lastSummaryStyle['fu']}>
                  <div
                    title='more'
                    className={`${lastSummaryStyle['pull-right']} ${lastSummaryStyle['dashboard-more-btn']} ${lastSummaryStyle['fu']}`}
                    onClick={() => changeModalStatus('highestCPU', true)}
                  >
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12} lg>
            <div className={lastSummaryStyle['summary-body-s-box']}>
              <div className={lastSummaryStyle['summary-body-s-box-title']}>
                <div
                  className={lastSummaryStyle['summary-body-box-title-bubblegum']}
                  onClick={() => changeModalStatus('highestPort', true)}
                >
                  Highest Port Utilization (&gt; 50%)
                </div>
              </div>
              <div className={lastSummaryStyle['summary-body-s-box-body']}>
                <div
                  title='SW057(Port2)'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      1
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      SW057(Port2)
                    </span>
                  </div>
                  <div>100%</div>
                </div>
                <div
                  title='SW_a(Port11)'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      2
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      SW_a(Port11)
                    </span>
                  </div>
                  <div>90%</div>
                </div>
                <div
                  title='SW057(Port3)'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      3
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      SW057(Port3)
                    </span>
                  </div>
                  <div>85%</div>
                </div>
                <div className={lastSummaryStyle['fu']}>
                  <div
                    title='more'
                    className={`${lastSummaryStyle['pull-right']} ${lastSummaryStyle['dashboard-more-btn']} ${lastSummaryStyle['fu']}`}
                    onClick={() => changeModalStatus('highestPort', true)}
                  >
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className={lastSummaryStyle['summary-body-s-box']}>
              <div className={lastSummaryStyle['summary-body-s-box-title']}>
                <div
                  className={lastSummaryStyle['summary-body-box-title-bubblegum']}
                  onClick={() => changeModalStatus('mostPower', true)}
                >
                  Most Power Consumption
                </div>
              </div>
              <div className={lastSummaryStyle['summary-body-s-box-body']}>
                <div
                  title='SW057'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      1
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      SW057
                    </span>
                  </div>
                  <div>28.0 W</div>
                </div>

                <div
                  title='SW_a'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      2
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      SW_a
                    </span>
                  </div>
                  <div>26.5 W</div>
                </div>

                <div
                  title='B0:C5:54:25:B1:66'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      3
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      B0:C5:54:25:B1:66
                    </span>
                  </div>
                  <div>0.2 W</div>
                </div>
                <div className={lastSummaryStyle['fu']}>
                  <div
                    title='more'
                    className={`${lastSummaryStyle['pull-right']} ${lastSummaryStyle['dashboard-more-btn']} ${lastSummaryStyle['fu']}`}
                    onClick={() => changeModalStatus('mostPower', true)}
                  >
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <div
            className={`${dashboardStyle['remove-panel']} ${sortable === true ? '' : 'd-none'}`}
            onClick={() => changeSortList('sort-summary-sw', false)}
          >
            -
          </div>
        </Row>
        <div
          onMouseOver={() => setChildHover(true)}
          onMouseOut={() => setChildHover(false)}
          className={`${lastSummaryStyle['panel-adjust']} ${dashboardStyle['sortable-container']
            } ${sortList[4].checked === true ? 'd-none' : ''}`}
        >
          <Row>
            <div
              className={dashboardStyle['add-panel']}
              onClick={() => changeSortList('sort-summary-sw', true)}
            >
              +
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Switches;
