import mainStyle from '../../summary.module.scss';
import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Client from './components/Client';
import Wireless from './components/Wireless';
import InternetTraffic from './components/InternetTraffic';
import InternetUsage from './components/InternetUsage';
import WanUsage from './components/WanUsage';

const defaultFuncList = [
  { id: 0, label: 'CLIENT', value: 'client', isShow: true },
  { id: 1, label: 'WIRELESS', value: 'wireless', isShow: false },
  { id: 2, label: 'INTERNET TRAFFIC', value: 'internetTraffic', isShow: false },
  { id: 3, label: 'INTERNET USAGE', value: 'internetUsage', isShow: false },
  { id: 4, label: 'USAGE', value: 'wanusage', isShow: false }
];

const SummaryStatistics = (props) => {
  const [funcList, setFuncList] = useState(defaultFuncList);

  useEffect(() => {
    let modelName = props.device.modelName;
    const updatedFuncList = cloneDeep(defaultFuncList);
    console.log(modelName);

    if (modelName ==='DBG-2000'){
      updatedFuncList[1].isShow = false;
      updatedFuncList[2].isShow = false;
      updatedFuncList[3].isShow = false;
      updatedFuncList[4].isShow = true;
    }else if(modelName === 'DBG-2000(B1)'){
      updatedFuncList[1].isShow = false;
      updatedFuncList[2].isShow = true;
      updatedFuncList[3].isShow = true;
      updatedFuncList[4].isShow = false;
    }else{ // x1000 & 800
      updatedFuncList[1].isShow = true;
      updatedFuncList[2].isShow = true;
      updatedFuncList[3].isShow = true;
      updatedFuncList[4].isShow = false;
    }
    setFuncList(updatedFuncList);
  }, []);

  return (
    <div className='tab-container-border'>
      <div className='row-col-block'>
        {funcList[0].isShow && <Client />}
      </div>
      <div className='row-col-block'>
        {funcList[1].isShow && <Wireless />}
      </div>
      <div className='row-col-block'>
        {funcList[2].isShow && <InternetTraffic />}
      </div>
      <div className='row-col-block'>
        {funcList[3].isShow && <InternetUsage />}
      </div>
      <div className='row-col-block'>
        {funcList[4].isShow && <WanUsage />}
      </div>
    </div>
  )
}

export default SummaryStatistics;