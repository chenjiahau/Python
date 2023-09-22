import dashboardStyle from '../dashboard.module.scss';
import locationInfoStyle from './location-info.module.scss';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Table, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import { cloneDeep, orderBy } from 'lodash';

import defaultSiteTagPhoto from 'assets/img/v2/icon/ntt_care/icon_location_pin.svg';
import defaultCaregiverPhoto from 'assets/img/v2/icon/ntt_care/icon_caregiver.svg';
import caregiverWidgetPhoto from 'assets/img/v2/icon/ntt_care/icon_map_caregiver_widget.svg';

// Components
import { Icon, Tab } from 'components/';
import SiteModal from './modals/SiteModal';

// Dummy data & utils
import { generateSiteTagList } from 'dummy/data/sitetag';
import { generateSiteList } from 'dummy/data/site';
import { generateAccountList } from 'dummy/data/account';

const defaultTabList = [
  { id: 1, breadCrumbLabel: 'Organization', label: 'Organization', value: 'organization', isActive: true },
  { id: 2, breadCrumbLabel: 'Caregiver', label: 'Caregiver', value: 'caregiver', isActive: false }
];

const defaultModalStatus = {
  moreSite: {
    status: false,
    disabled: false,
  },
}

const style = {
  cursor: 'move',
};

const LocationInfo = (props) => {
  const { id, index, childRef, sortList, changeSortList, sortable, allowDrag, moveComponent } = props;

  // Fake data
  let fakerSiteTagList = generateSiteTagList(false, 100, true);
  fakerSiteTagList = orderBy(fakerSiteTagList, [item => item.title.toLowerCase()], 'asc');

  for (const sitetag of fakerSiteTagList) {
    sitetag.siteList = orderBy(generateSiteList(false, Math.floor(Math.random() * 6) + 1, true), [item => item.title.toLowerCase()], 'asc');
  }

  const fakerAccountList = generateAccountList(100, true);

  // State
  const [tabList, setTabList] = useState(cloneDeep(defaultTabList));
  const [siteTagList, setSiteTagList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [selectedAccount, setSelectedAccount] = useState();

  const ref = useRef(null);
  const [childHover, setChildHover] = useState(false);
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

  // Method
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const resetChildComponentList = () => {
  }

  const changeTab = selectedTab => {
    const newTabList = cloneDeep(tabList);
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }

  // Side effect
  useEffect(() => {
    setSiteTagList(cloneDeep(fakerSiteTagList));
    setAccountList(cloneDeep(fakerAccountList));
    childRef.resetComponentList = resetChildComponentList;
  }, []);

  return (
    <>

      <div
        ref={ref}
        style={{ ...style, opacity }} className={`${sortList[2].display === true ? '' : 'd-none'}`}
      >
        <div
          style={childHover ? { 'backgroundColor': 'white' } : {}}
          className={`${sortable !== true ? '' : dashboardStyle['sortable-container']} ${sortList[2].checked === true ? '' : 'd-none'}`}
        >
          <Row style={{ marginTop: '42px' }}>
            <div
              onMouseOver={() => setChildHover(true)}
              onMouseOut={() => setChildHover(false)}
              className={`${sortable !== true ? '' : dashboardStyle['sortable-container-layer2']}`}
            >
              <Tab
                tabAlignLeft={true}
                normalItem={true}
                darkTheme={true}
                tabList={tabList}
                changeTab={changeTab}
              >
                <div className={locationInfoStyle['title-container']}>
                  <Icon className={`icon-map ${locationInfoStyle['dashboard-icon']}`} />
                  <div style={{ display: 'contents' }}>
                    <span className={`${locationInfoStyle['title-link']} ${locationInfoStyle['dashboard-title']}`}>
                      LOCATION INFO
                    </span>
                  </div>
                </div>
              </Tab>

              {/* Organization */}
              {
                tabList[0].isActive && siteTagList.map((siteTag, index) => {
                  return (
                    <div
                      key={nanoid()}
                      className={locationInfoStyle['organization-container']}
                    >
                      <div className={locationInfoStyle['sitetag']}>
                        <div className={locationInfoStyle['title']}>
                          {siteTag.title}
                        </div>
                        <img
                          className={`${locationInfoStyle['img']} ${siteTag.photo && locationInfoStyle['img--custom']}`}
                          src={siteTag.photo || defaultSiteTagPhoto}
                          alt=""
                        />
                      </div>
                      <div className={locationInfoStyle['site']}>
                        <Table>
                          <thead>
                            <tr>
                              <th>Site</th>
                              <th>Contact person</th>
                              <th>Address</th>
                              <th>Contact number</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              siteTag.siteList.map((site, index) => {
                                return (
                                  <tr key={nanoid()}>
                                    <td>
                                      <Link to="/cloud/monitor/map" className='text-decoration-underline'>
                                        {site.title}
                                      </Link>
                                    </td>
                                    <td>{site.contactPerson}</td>
                                    <td>{site.address}</td>
                                    <td>{site.contactNumber}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )
                })
              }

              {/* Caregiver */}
              {
                tabList[1].isActive && (
                  <div
                    key={nanoid()}
                    className={locationInfoStyle['caregiver-container']}
                  >
                    {
                      accountList.map((account, index) => {
                        return (
                          <div
                            key={nanoid()}
                            className={locationInfoStyle['account-card']}
                          >
                            <div className={locationInfoStyle['header']}>
                              <div className={locationInfoStyle['self-icon']}>
                                <img
                                  src={account.photo || defaultCaregiverPhoto}
                                  alt=""
                                />
                              </div>
                              <div className={locationInfoStyle['self-title']}>
                                {account.title}
                              </div>
                              <div className={locationInfoStyle['link-icon']}>
                                <Link to="/cloud/monitor/map">
                                  <img src={caregiverWidgetPhoto} alt="" />
                                </Link>
                              </div>
                            </div>
                            <div className={locationInfoStyle['content']}>
                              {/* Current care recipient: */}
                              <div className={locationInfoStyle['item']}>
                                <div className={locationInfoStyle['title']}>
                                  Current care recipient:
                                </div>
                                <div className={locationInfoStyle['value']}>
                                  <ul>
                                    {
                                      account.siteList.slice(0, 3).map((site, index) => {
                                        return (
                                          <li key={nanoid()}>
                                            {site.title}
                                          </li>
                                        )
                                      })
                                    }
                                  </ul>
                                  {
                                    account.siteList.length > 3 && (
                                      <div
                                        className={locationInfoStyle['more-site']}
                                        onClick={() => {
                                          setSelectedAccount(account);
                                          changeModalStatus('moreSite', true)
                                        }}
                                      >
                                        more
                                      </div>
                                    )
                                  }
                                </div>
                              </div>
                              {/* Phone number */}
                              <div className={locationInfoStyle['item']}>
                                <div className={locationInfoStyle['title']}>
                                  Phone number
                                </div>
                                <div className={locationInfoStyle['value']}>
                                  {account.phoneNumber}
                                </div>
                              </div>
                              {/* Reference location */}
                              <div className={locationInfoStyle['item']}>
                                <div className={locationInfoStyle['title']}>
                                  Reference location:
                                </div>
                                <div className={locationInfoStyle['value']}>
                                  {account.referenceLocation}
                                </div>
                              </div>
                              {/* Last updated */}
                              <div className={locationInfoStyle['item']}>
                                <div className={locationInfoStyle['title']}>
                                  Last updated:
                                </div>
                                <div className={locationInfoStyle['value']}>
                                  {account.lastUpdateNumber}
                                  {account.lastUpdateType === 0 && ' minutes ago'}
                                  {account.lastUpdateType === 1 && ' hours ago'}
                                  {account.lastUpdateType === 2 && ' days ago'}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                )
              }
            </div>
          </Row>
          <div
            className={`${dashboardStyle['remove-panel']} ${sortable === true ? '' : 'd-none'}`}
            onClick={() => changeSortList('sort-location-info', false)}
          >
            -
          </div>
        </div>
        <div className={`${dashboardStyle['sortable-container']} ${sortList[2].checked === true ? 'd-none' : ''}`}>
          <Row>
            <div
              className={dashboardStyle['add-panel']}
              onClick={() => changeSortList('sort-location-info', true)}
            >
              +
            </div>
          </Row>
        </div>
      </div>

      <SiteModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        siteList={selectedAccount?.siteList}
      />
    </>
  )
}

export default LocationInfo;