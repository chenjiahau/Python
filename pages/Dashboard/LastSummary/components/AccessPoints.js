import dashboardStyle from '../../dashboard.module.scss';
import lastSummaryStyle from '../last-summary.module.scss';

import { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';

import imgAP from 'assets/img/v2/icon/device_ap.png';

const style = {
  cursor: 'move',
};

const AccessPoints = (props) => {
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

  // State
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
        className={`${sortList[3].display === true ? '' : 'd-none'}`}
      >
        <Row
          onMouseOver={() => setChildHover(true)}
          onMouseOut={() => setChildHover(false)}
          className={`
            ${sortable !== true ? '' : dashboardStyle['sortable-container-layer2']}
            ${sortList[3].checked === true ? '' : 'd-none'} ${lastSummaryStyle['sortable-layer2-adjust']}
          `}
        >
          <Col xs={12} lg={2} className={`mb-5 ${lastSummaryStyle['summary-device-container']}`}>
            <div className={lastSummaryStyle['summary-title-box']}>
              <Link to='/cloud/monitor/access-point/clients'>
                <div className={lastSummaryStyle['summary-title-box-title']}>
                  Access Points
                </div>
                <img src={imgAP} alt='' width={80} />
                <div className={`${lastSummaryStyle['summary-bigfont']} ${lastSummaryStyle['bubblegum']} ${lastSummaryStyle['fu']}`}>
                  5
                </div>
                <span className={lastSummaryStyle['summary-clients']}>
                  Unique <br />
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
                  onClick={() => changeModalStatus('mostActiveDevices', true)}
                >
                  Most Active Devices
                </div>
              </div>
              <div className={lastSummaryStyle['summary-body-s-box-body']}>
                <div
                  title='2820P'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['summary-type-container']}  ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']}>
                      1
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      2820P
                    </span>
                  </div>
                  <div>467.31 MB</div>
                </div>
                <div
                  title='2520P'
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
                      2520P
                    </span>
                  </div>
                  <div>33.2 MB</div>
                </div>
                <div
                  title='2720P'
                  className={`${lastSummaryStyle['summary-body-s-box-body-s']} ${lastSummaryStyle['fu']}`}
                  onClick={() => {
                    console.log('show data');
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle['summary-body-box-body-item']} >
                      3
                    </span>
                    <span className={lastSummaryStyle['summary-body-box-body-title']}>
                      2720P
                    </span>
                  </div>
                  <div>66 MB</div>
                </div>
                <div className={lastSummaryStyle['fu']}>
                  <div
                    title='more'
                    className={`${lastSummaryStyle['pull-right']} ${lastSummaryStyle['dashboard-more-btn']} ${lastSummaryStyle['fu']}`}
                    onClick={() => changeModalStatus('mostActiveDevices', true)}
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
                  onClick={() => changeModalStatus('mostActiveSSIDs', true)}
                >
                  Most Active SSIDs
                </div>
              </div>
              <div className={lastSummaryStyle['summary-body-s-box-body']}>
                <div
                  title='Nuclias_Office'
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
                      Nuclias_Office
                    </span>
                  </div>
                  <div>10.3 GB</div>
                </div>
                <div
                  title='Nuclias_Guest'
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
                      Nuclias_Guest
                    </span>
                  </div>
                  <div>7.6 GB</div>
                </div>
                <div
                  title='Nuclias_Open'
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
                      Nuclias_Open
                    </span>
                  </div>
                  <div>3 GB</div>
                </div>
                <div className={lastSummaryStyle['fu']}>
                  <div
                    title='more'
                    className={`${lastSummaryStyle['pull-right']} ${lastSummaryStyle['dashboard-more-btn']} ${lastSummaryStyle['fu']}`}
                    onClick={() => changeModalStatus('mostActiveSSIDs', true)}
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
                  onClick={() => changeModalStatus('mostActiveClients', true)}
                >
                  Most Active Clients
                </div>
              </div>
              <div className={lastSummaryStyle['summary-body-s-box-body']}>
                <div
                  title='Tony001'
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
                      Tony001
                    </span>
                  </div>
                  <div>730 MB</div>
                </div>

                <div
                  title='Tony002'
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
                      Tony002
                    </span>
                  </div>
                  <div>522 MB</div>
                </div>

                <div
                  title='00:04:03:01:00:01'
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
                      00:04:03:01:00:01
                    </span>
                  </div>
                  <div>123 MB</div>
                </div>
                <div className={lastSummaryStyle['fu']}>
                  <div
                    title='more'
                    className={`${lastSummaryStyle['pull-right']} ${lastSummaryStyle['dashboard-more-btn']} ${lastSummaryStyle['fu']}`}
                    onClick={() => changeModalStatus('mostActiveClients', true)}
                  >
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <div
            className={`${dashboardStyle['remove-panel']} ${sortable === true ? '' : 'd-none'}`}
            onClick={() => changeSortList('sort-summary-ap', false)}
          >
            -
          </div>
        </Row>
        <div
          onMouseOver={() => setChildHover(true)}
          onMouseOut={() => setChildHover(false)}
          className={`${lastSummaryStyle['panel-adjust']} ${dashboardStyle['sortable-container']
            } ${sortList[3].checked === true ? 'd-none' : ''}`}
        >
          <Row>
            <div
              className={dashboardStyle['add-panel']}
              onClick={() => changeSortList('sort-summary-ap', true)}
            >
              +
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AccessPoints;
