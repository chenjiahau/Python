import mainStyle from '../../summary.module.scss';
import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Overview from './components/Overview';
import Ports from './components/Ports';
import WanInterfaces from './components/WanInterfaces';
import InternetTraffic from './components/InternetTraffic';
import InternetUsage from './components/InternetUsage';

const defaultFuncList = [
  { id: 0, label: 'OVERVIEW', value: 'overview', isShow: true },
  { id: 1, label: 'PORTS', value: 'ports', isShow: true },
  { id: 2, label: 'WAN INTERFACES', value: 'wanInterfaces', isShow: false },
  { id: 3, label: 'INTERNET TRAFFIC', value: 'internetTraffic', isShow: false },
  { id: 4, label: 'INTERNET USAGE', value: 'internetUsage', isShow: false },
];

const SummaryStatus = (props) => {
  // const { state } = useContext(ConfigContext);
  // const { dispatch: statusDispatch } = useContext(StatusContext);

  // State
  const [funcList, setFuncList] = useState(defaultFuncList);

  useEffect(() => {
    let modelName = props.device.modelName;
    const updatedFuncList = cloneDeep(defaultFuncList);
    console.log(modelName);

    if (modelName ==='DBG-2000'){
      updatedFuncList[2].isShow = false;
      updatedFuncList[3].isShow = true;
      updatedFuncList[4].isShow = true;
    }else{
      updatedFuncList[2].isShow = true;
      updatedFuncList[3].isShow = false;
      updatedFuncList[4].isShow = false;
    }
    setFuncList(updatedFuncList);
  }, []);

  return (
    <div className='tab-container-border'>
      <div className='row-col-block'>
        {funcList[0].isShow && <Overview />}
      </div>
      <div className='row-col-block'>
        {funcList[1].isShow && <Ports />}
      </div>
      <div className='row-col-block'>
        {funcList[2].isShow && <WanInterfaces />}
      </div>
      <div className='row-col-block'>
        {funcList[3].isShow && <InternetTraffic />}
      </div>
      <div className='row-col-block'>
        {funcList[4].isShow && <InternetUsage />}
      </div>
    </div>
  )
}

export default SummaryStatus;