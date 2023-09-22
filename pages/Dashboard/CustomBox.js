import dashboardStyle from './dashboard.module.scss';

import { useState } from 'react';

// Component
import { Icon } from 'components/';

const CustomizeBox = (props) => {
  const [expandCustomize, setExpandCustomize] = useState(false);
  const [expandPersonalize, setExpandPersonalize] = useState(false);

  const clickCustomizeBox = (e) => {
    let display = !expandCustomize;
    let displayList = [...props.sortList];

    setExpandCustomize(display);

    if (display) {
      for (let i = 0; i < displayList.length; i++) {
        displayList[i].display = true;
      }

      props.setSortList(displayList);
    }

    setExpandPersonalize(false);
    props.setSortable(false);
    props.setMovable(false);
  }

  const clickPersonalizeBtn = (e) => {
    let display = !expandPersonalize;
    setExpandPersonalize(display);
  }

  const clickMoveBtn = (e) => {
    let display = !props.sortable;
    props.setSortable(display);
    props.setMovable(display);
  }

  const clickResetBtn = (e) => {
    if (props.resetStatus) {
      props.changeModalStatus('reset', true);
    }
  }

  const clickSaveBtn = (e) => {
    const displayList = [...props.sortList];

    for (let i = 0; i < displayList.length; i++) {
      if (displayList[i].checked !== true) {
        displayList[i].display = false;
      }
    }

    props.setSortList(displayList);
    props.setSortable(false);
    setExpandCustomize(false);
    setExpandPersonalize(false);
  }

  return (
    <div className={`${dashboardStyle['customize-box']}`}>
      <div className={`${expandCustomize === true ? 'd-none' : 'd-block'}`}>
        <Icon
          className={`icon-customize ${dashboardStyle['customize-collapse']}`}
          onClick={clickCustomizeBox}
        />
      </div>

      <div className={`${expandCustomize === true ? 'd-block' : 'd-none'} ${dashboardStyle['customize-expand']}`}>
        <div className={`${dashboardStyle['expand-menu']}`}>
          <div
            className={`${dashboardStyle['expand-head']} ${expandPersonalize === true ? dashboardStyle['expand-click'] : ''}`}
            onClick={clickPersonalizeBtn}
          >
            Personalize
          </div>
          <div
            className={`${props.sortable === true ? dashboardStyle['expand-click'] : ''}`}
            onClick={clickMoveBtn}
          >
            Move
          </div>
          <div onClick={clickResetBtn} disabled={!props.resetStatus}>
            Reset
          </div>
          <div
            className={`${props.resetStatus !== true ? '' : 'd-none'} ${dashboardStyle['expand-tail']}`}
            onClick={clickCustomizeBox}
          >
            Close
          </div>
          <div
            className={`${props.resetStatus === true ? '' : 'd-none'} ${dashboardStyle['expand-tail']}`}
            onClick={clickSaveBtn}
          >
            Save
          </div>
        </div>

        <ul className={`${expandPersonalize === true ? 'd-block' : 'd-none'} ${dashboardStyle['expand-dropdown']}`}>
          {
            props.sortList.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`checkbox-input ${dashboardStyle['dropdown-list']} 
                  ${item.layer === 'l1' ? dashboardStyle['list-l1'] : dashboardStyle['list-l2']}`}
                >
                  <input
                    id={item.id}
                    type='checkbox'
                    checked={item.checked === true}
                    onChange={(e) => {
                      props.changeSortList(item.id, e.target.checked);
                    }}
                  />
                  <label htmlFor={item.id} className='text'>
                    {item.label}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default CustomizeBox;