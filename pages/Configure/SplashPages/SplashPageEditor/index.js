import { useState, useEffect, useLayoutEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Dummy data & util
import { generateSplashPageList } from 'dummy/data/splash-page';
import fakeData from './data';

// Component
import {
  Breadcrumb, Button, InlineTitle, MessageBoxGroup, TextEditor,
  Tab
} from 'components/';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: 'JavaScript tag is not allowed to place in this HTML file due to security vulnerabilities concern.',
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Splash pages', isLink: false },
  { label: 'Splash page editor', isLink: true, path: '/cloud/configure/splash-pages' },
  { label: '', isLink: false },
];

const defaultTabs = [
  { id: 1, label: 'HEADER', value: 'headerHtml', isActive: false },
  { id: 2, label: 'FOOTER', value: 'footerHtml', isActive: false },
  { id: 3, label: 'LOGIN', value: 'loginHtml', isActive: false },
  { id: 4, label: 'PROGRESS', value: 'progressHtml', isActive: false },
  { id: 5, label: 'LANDING', value: 'landingHtml', isActive: false },
  { id: 6, label: 'ERROR', value: 'errorHtml', isActive: false },
  { id: 7, label: 'TERMS', value: 'termsOfUseHtml', isActive: false },
];

const SplashPageEditor = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fake API data
  const fakeSplashPages = generateSplashPageList();

  // State
  const [data, setData] = useState(null);
  const [pathList, setPathList] = useState(null);
  const [tabs, setTabs] = useState(null);
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [splashPage, setSplashPage] = useState(null);

  // Method
  const changeTab = selectedTab => {
    const newTabs = cloneDeep(tabs);
    const index = newTabs.findIndex(tab => tab.id === selectedTab.id);

    newTabs.map(tab => tab.isActive = false);
    newTabs[index].isActive = true;
    setTabs(newTabs);
  }

  // Side effect
  useEffect(() => {
    const id = searchParams.get('id');

    let selectedSplashPage = null;
    for (let i = 0; i < fakeSplashPages.length; i++) {
      if (fakeSplashPages[i].id === +id && fakeSplashPages[i].authenticationTypes !== 'All') {
        const updatedPathList = cloneDeep(defaultPathList);
        setPathList(updatedPathList);

        selectedSplashPage = fakeSplashPages[i];
        updatedPathList[3].label = fakeSplashPages[i].splashPageName;
        setSplashPage(selectedSplashPage);

        break;
      }
    }

    if (!selectedSplashPage) {
      navigate('/configure/splash-pages');
    }

    const updatedTabs = cloneDeep(defaultTabs);
    updatedTabs[0].isActive = true;
    if (selectedSplashPage.authenticationTypes === 'Click-through') {
      updatedTabs[2].label = 'CLICK-THROUGH';
    }
    setTabs(updatedTabs);
    setData(cloneDeep(fakeData[selectedSplashPage.authenticationTypes]));
  }, [searchParams]);

  useLayoutEffect(() => {
    const doms = document.querySelectorAll('.html-object-embed');

    for (let i = 0; i < doms.length; i++) {
      if (doms[i].hasChildNodes()) {
        for (let j = 0; j < doms[i].childNodes.length; j++) {
          if (doms[i].childNodes[j].style.display === 'none') {
            doms[i].style.display = 'none';
          }
        }
      }
    }
  });

  if (!splashPage) {
    return
  }
  console.log(pathList)
  return (
    <>
      <div className='layout-container layout-container--column layout-container--fluid'>
        <div className="layout-container layout-container breadcrumb--extended">
          <div>
            <Breadcrumb full={false} pathList={pathList} />
          </div>
          <div className="breadcrumb--extended-right">
            <InlineTitle isNonUnderline >
              <Button
                label='Back'
                onClick={() => navigate('/cloud/configure/splash-pages')}
              />
            </InlineTitle>
          </div>
        </div>

        <div className='layout-container'>
          <MessageBoxGroup
            messages={messages}
            changeMessages={setMessages}
            onClose={type => setMessages({ ...messages, [type]: null })}
          />
        </div>

        <Tab tabList={tabs} changeTab={changeTab} />

        <div className='ck-content'>
          <TextEditor
            data={data[tabs.filter(tab => tab.isActive)[0].value]}
            onChange={(event, editor) => {
              console.log(editor.getData());
            }}
            onFocus={() => {
            }}
          />
        </div>
      </div>
    </>
  );
}

export default SplashPageEditor;