import announcementsStyle from './announcements.module.css';
import "./accordion.scss";

import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { cloneDeep } from 'lodash';


import Breadcrumb from '../../../components/Breadcrumb';
import MessageBoxGroup from 'components/MessageBoxGroup';


const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Help', isLink: false },
  { label: 'Announcements', isLink: false },
];

const announcementsList = [
  {
    title: 'What’s new',
    id: '1',
    key: '1',
    list: [
      { id: '1', parentId: '1', title: 'What’s new', isActive: true, picture: '' },
    ]
  },
  {
    title: 'Announcement',
    id: '2',
    key: '2',
    list: [
      { id: '1', parentId: '2', title: 'Nuclias Portal Release v2.1.2.5', isActive: false, picture: '' },
      { id: '2', parentId: '2', title: 'Access point Release v2.1.2.5', isActive: false, picture: '' },
      { id: '3', parentId: '2', title: 'Switch Release v2.1.2.5', isActive: false, picture: '' },
      { id: '4', parentId: '2', title: 'Gateway Release v2.1.2.5', isActive: false, picture: '' },
      { id: '5', parentId: '2', title: 'Nuclias Portal Release v2.1.2.3', isActive: false, picture: '' },
      { id: '6', parentId: '2', title: 'Access point Release v2.1.2.3', isActive: false, picture: '' },
      { id: '7', parentId: '2', title: 'Switch Release v2.1.2.3', isActive: false, picture: '' },
      { id: '8', parentId: '2', title: 'Gateway Release v2.1.2.3', isActive: false, picture: '' },
    ]
  }
];

const Announcements = () => {
  const [messages, setMessages] = useState({ ...defaultMessages });
  const [selectedItemList, setSelectedItemList] = useState({ ...announcementsList[0].list[0] });
  const [useList, setUseList] = useState(cloneDeep(announcementsList));

  const onAccordionClick = (items) => {
    setSelectedItemList(items)
    const useList2 = cloneDeep(announcementsList);
    for (let item of useList2) {
      if (item.id === items.parentId) {
        for (let listItem of item.list) {
          listItem.isActive = items.title === listItem.title ? true : false
        }
      } else {
        for (let listItem of item.list) {
          listItem.isActive = false;
        }
      }
      setUseList(useList2)
    }

  }
  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        {/* Announcements */}
        <div className={announcementsStyle['wrapper']}>
          <div className={announcementsStyle['left-box']}>
            {
              useList.map((item, index, key) => {
                return <Accordion defaultActiveKey={['index']} alwaysOpen flush>
                  <Accordion.Item eventKey="index" key={item.id}>
                    <Accordion.Header>{item.title}</Accordion.Header>
                    {
                      item.list.map((items, index, key) => {
                        return <Accordion.Body className={`${items.isActive ? 'active-accordion-body' : ''}`}
                          onClick={() => !!onAccordionClick && onAccordionClick(items)}
                          key={items.id}>
                          {items.title}
                          {items.picture}
                        </Accordion.Body>
                      })
                    }

                  </Accordion.Item>
                </Accordion>
              })
            }

          </div>
          <div className={announcementsStyle['right-box']}>
            <span className={announcementsStyle['right-box-title']} > {selectedItemList.title}</span>
            <div className='mb-4'></div>
            {/* {<span dangerouslySetInnerHTML={{ __html: content }}></span>} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
