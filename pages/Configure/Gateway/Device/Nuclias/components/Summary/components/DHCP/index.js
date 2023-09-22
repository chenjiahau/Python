import mainStyle from '../../summary.module.scss';
import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Subnet from './components/Subnet';
import Lease from './components/Lease';

const defaultFuncList = [
  { id: 0, label: 'DHCP Subnet', value: 'dhcpSubnet', isShow: true },
  { id: 0, label: 'DHCP Lease', value: 'dhcpLease', isShow: true }
];

const SummaryDHCP = (props) => {
  const [funcList, setFuncList] = useState(defaultFuncList);

  useEffect(() => {
    let modelName = props.device.modelName;
    console.log(modelName);
  }, []);

  return (
    <div className='tab-container-border'>
      <div className='row-col-block'>
        {funcList[0].isShow && <Subnet device={props.device.modelName}/>}
      </div>
      <div className='row-col-block'>
        {funcList[1].isShow && <Lease device={props.device.modelName}/>}
      </div>
    </div>
  )
}

export default SummaryDHCP;