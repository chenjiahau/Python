import dashboardStyle from "../../dashboard.module.scss";
import lastSummaryStyle from "../last-summary.module.scss";

import { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";
import { Link } from "react-router-dom";

import imgGW from "assets/img/v2/icon/device_gateway.png";

const style = {
  cursor: "move",
};

const Gateways = (props) => {
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
      type: "summaryChild",
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
    accept: "summaryChild",
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
        className={`${sortList[5].display === true ? "" : "d-none"}`}
      >
        <Row
          onMouseOver={() => setChildHover(true)}
          onMouseOut={() => setChildHover(false)}
          className={`
            ${sortable !== true ? "" : dashboardStyle["sortable-container-layer2"]}
            ${sortList[5].checked === true ? "" : "d-none"} ${lastSummaryStyle["sortable-layer2-adjust"]}
          `}
        >
          <Col xs={12} lg={2} className={`mb-5 ${lastSummaryStyle["summary-device-container"]}`}>
            <div className={lastSummaryStyle["summary-title-box"]}>
              <Link to="/cloud/monitor/gateway/clients">
                <div className={lastSummaryStyle["summary-title-box-title"]}>
                  Gateway
                </div>
                <img src={imgGW} alt="" width={80} />
                <div className={`${lastSummaryStyle["summary-bigfont"]} ${lastSummaryStyle["blue"]} ${lastSummaryStyle["fu"]}`}>
                  65
                </div>
                <span className={lastSummaryStyle["summary-clients"]}>
                  Clients
                </span>
              </Link>
            </div>
          </Col>
          <div className={lastSummaryStyle["overview-vertical-line"]}></div>
          <Col className={lastSummaryStyle["summary-detail-container"]}>
            <div className={lastSummaryStyle["summary-body-s-box"]}>
              <div className={lastSummaryStyle["summary-body-s-box-title"]}>
                <div
                  className={lastSummaryStyle["summary-body-box-title-bubblegum"]}
                  onClick={() => changeModalStatus("highestThrough", true)}
                >
                  Highest Through by Device
                </div>
              </div>
              <div className={lastSummaryStyle["summary-body-s-box-body"]}>
                <div
                  title="DBG-2000HQ"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      1
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]}>
                      DBG-2000HQ
                    </span>
                  </div>
                  <div>50 GB</div>
                </div>
                <div
                  title="DBG-2000DE"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      2
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]}>
                      DBG-2000DE
                    </span>
                  </div>
                  <div>30 GB</div>
                </div>
                <div
                  title="DBG-X1000US"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      3
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]}>
                      DBG-X1000US
                    </span>
                  </div>
                  <div>10 GB</div>
                </div>
                <div className={lastSummaryStyle["fu"]}>
                  <div
                    title="more"
                    className={`${lastSummaryStyle["pull-right"]} ${lastSummaryStyle["dashboard-more-btn"]} ${lastSummaryStyle["fu"]}`}
                    onClick={() => changeModalStatus("highestThrough", true)}
                  >
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12} lg>
            <div className={lastSummaryStyle["summary-body-s-box"]}>
              <div className={lastSummaryStyle["summary-body-s-box-title"]}>
                <div
                  className={lastSummaryStyle["summary-body-box-title-bubblegum"]}
                  onClick={() => changeModalStatus("mostDHCPClients", true)}
                >
                  Most DHCP Clients per Device
                </div>
              </div>
              <div className={lastSummaryStyle["summary-body-s-box-body"]}>
                <div
                  title="DBG-2000HQ"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      1
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]}>
                      DBG-2000HQ
                    </span>
                  </div>
                  <div>30 clients</div>
                </div>
                <div
                  title="DBG-2000DE"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      2
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]}>
                      DBG-2000DE
                    </span>
                  </div>
                  <div>10 clients</div>
                </div>
                <div
                  title="DBG-x1000US"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      3
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]}>
                      DBG-x1000US
                    </span>
                  </div>
                  <div>6 clients</div>
                </div>
                <div className={lastSummaryStyle["fu"]}>
                  <div
                    title="more"
                    className={`${lastSummaryStyle["pull-right"]} ${lastSummaryStyle["dashboard-more-btn"]} ${lastSummaryStyle["fu"]}`}
                    onClick={() => changeModalStatus("mostDHCPClients", true)}
                  >
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12} lg>
            <div className={lastSummaryStyle["summary-body-s-box"]}>
              <div className={lastSummaryStyle["summary-body-s-box-title"]}>
                <div
                  className={lastSummaryStyle["summary-body-box-title-bubblegum"]}
                  onClick={() => changeModalStatus("topServicePorts", true)}
                >
                  Top Service Ports by Usage
                </div>
              </div>
              <div className={lastSummaryStyle["summary-body-s-box-body"]}>
                <div
                  title="HTTP(Port:80)"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      1
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]}>
                      HTTP(Port:80)
                    </span>
                  </div>
                  <div>27 GB</div>
                </div>

                <div
                  title="HTTPS(Port:443)"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      2
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]}>
                      HTTPS(Port:443)
                    </span>
                  </div>
                  <div>20 GB</div>
                </div>

                <div
                  title="RSTP(Port:554)"
                  className={`${lastSummaryStyle["summary-body-s-box-body-s"]} ${lastSummaryStyle["fu"]}`}
                  onClick={() => {
                    console.log("show data");
                  }}
                >
                  <div>
                    <span className={lastSummaryStyle["summary-body-box-body-item"]}>
                      3
                    </span>
                    <span className={lastSummaryStyle["summary-body-box-body-title"]} >
                      RSTP(Port:554)
                    </span>
                  </div>
                  <div>12 GB</div>
                </div>
                <div className={lastSummaryStyle["fu"]}>
                  <div
                    title="more"
                    className={`${lastSummaryStyle["pull-right"]} ${lastSummaryStyle["dashboard-more-btn"]} ${lastSummaryStyle["fu"]}`}
                    onClick={() => changeModalStatus("topServicePorts", true)}
                  >
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <div
            className={`${dashboardStyle["remove-panel"]} ${sortable === true ? "" : "d-none"}`}
            onClick={() => changeSortList("sort-summary-gw", false)}
          >
            -
          </div>
        </Row>
        <div
          onMouseOver={() => setChildHover(true)}
          onMouseOut={() => setChildHover(false)}
          className={`${lastSummaryStyle["panel-adjust"]} ${dashboardStyle["sortable-container"]
            } ${sortList[5].checked === true ? "d-none" : ""}`}
        >
          <Row>
            <div
              className={dashboardStyle["add-panel"]}
              onClick={() => changeSortList("sort-summary-gw", true)}
            >
              +
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Gateways;
