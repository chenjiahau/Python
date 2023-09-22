import mainStyle from '../../../summary.module.scss';
import { useState } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { InlineTitle, DropdownWithItem } from 'components/';
import DropdownWithTimeframe, { getTimeFrameSetting, getTimeFrameKey } from 'components/DropdownWithTimeframe';
import { ChartData } from "../../../data/SummaryData";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { changeDropdown } from 'dummy/utils/dropdown';
import Button from 'components/Button';


const Client = (props) => {
  const defaultTimeFrame = getTimeFrameSetting();
  const [newTimeFrame, setNewTimeFrame] = useState(cloneDeep(defaultTimeFrame));

  const defaultClientType = [
    { title: 'All', isActive: true },
    { title: 'All SSIDs', isActive: false },
    { title: 'Wired', isActive: false },
    { title: 'VPN', isActive: false },
  ]
  const defaultClientBand = [
    { title: 'All', isActive: true },
    { title: '2.4 GHz', isActive: false },
    { title: '5 GHz', isActive: false }
  ]
  const [clientTypeList, setClientTypeList] = useState(cloneDeep(defaultClientType));
  const [clientBandList, setClientBandList] = useState(cloneDeep(defaultClientBand));

  const defaultUsageType = [
    { title: 'Client name', isActive: true },
    { title: 'MAC/IP address', isActive: false }
  ]
  const defaultUsageDevice = [
    { title: 'Total clients', isActive: true }
  ]
  const [usageTypeList, setUsageTypeList] = useState(cloneDeep(defaultUsageType));
  const [usageDeviceList, setUsageDeviceList] = useState(cloneDeep(defaultUsageDevice));

  const ckeckGridAxis = (nline, whichVal, cData) => {
    let maxVal, minVal, tmpMax, tmpMin, span, ymag, unit, step, result;
    let checkData = cloneDeep(cData);
    if (nline >1){
      let maxSent =  Math.round(Math.max(...checkData.map(data => data.sent)));
      let maxReceived =  Math.round(Math.max(...checkData.map(data => data.received)));
      let minSent =  Math.round(Math.min(...checkData.map(data => data.sent)));
      let minReceived =  Math.round(Math.min(...checkData.map(data => data.received)));
      tmpMax = (maxSent > maxReceived ? maxSent: maxReceived);
      tmpMin = (minSent < minReceived ? minSent: minReceived);
    }else{
      tmpMax =  Math.round(Math.max(...checkData.map(data => data.yKey)));
      tmpMin =  Math.round(Math.min(...checkData.map(data => data.yKey)));
    }
    span = tmpMax - tmpMin;
    if(span === 0){
      ymag = 0;
    }else{
      ymag = Math.floor(Math.log(span) / Math.log(10));
    }
    
    unit = Math.pow(10, ymag);
    minVal = Math.floor(tmpMin / unit) * unit;
    let tmp_maxVal = Math.ceil(tmpMax / unit) * unit;
    step = Math.ceil((tmp_maxVal - minVal) / 4);
    maxVal = minVal + step * 4;

    if(maxVal <4){
      maxVal = 4;
    }
    if(step <1){
      step = 1;
    }

    if(whichVal ==='max'){
      result = maxVal
    }else{
      result = step;
    }
    return result;
  }

  const [barData, setBarData] = useState({
    labels: ChartData.oneBarSample.map((data) => data.time),
    datasets: [
      {
        label: "clients",
        data: ChartData.oneBarSample.map((data) => data.yKey),
        backgroundColor: [
          "#22b7db",
        ],
        borderColor: "#22b7db",
        borderWidth: 0,
        barPercentage: 0.7,
      }
    ],
  });
  const [barOptions, setBarOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      x: {
        grid:{
          display:false
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 13
        }
      },
      y: {
        min: 0,
        max: ckeckGridAxis(1,'max', ChartData.oneBarSample),
        grid:{
          display:false
        },
        ticks: {
          stepSize: ckeckGridAxis(1,'step', ChartData.oneBarSample),
          autoSkip: false
        },
        afterTickToLabelConversion:function(q){
          for(var tick in q.ticks){
              q.ticks[tick].label = q.ticks[tick].label +' MB';
          }
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false
      },
      tooltip:{
        borderWidth: 1,
        borderColor: '#D0D0D0',
        backgroundColor: 'rgba(255,255,255,0.9)',
        yAlign: 'bottom',
        xAlign: 'center',
        caretSize: 0,
        titleAlign: 'center',
        titleColor: '#6C6C6C',
        titleMarginBottom: 8,
        bodySpacing: 6,
        bodyColor: '#9D9D9D',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        displayColors: false,
        padding: 12,
        callbacks: {
          label: function (tooltipItems) {
            return  " "+ tooltipItems.dataset.label + " : "+ tooltipItems.formattedValue;
          },
          labelTextColor: (tooltipItems) => {
            return "#22b7db";
          }
        }
      },
    }
  });

  const [lineData, setLineData] = useState({
    // const lineData = {
    labels: ChartData.twoLineSample.map((data) => data.time),
    datasets: [
      {
        label: "sent",
        data: ChartData.twoLineSample.map((data) => data.sent),
        backgroundColor: [
          "#65bd60",
        ],
        borderColor: "#65bd60",
        borderWidth: 2.5,
        tension: 0.3
      },
      {
        label: "received",
        data: ChartData.twoLineSample.map((data) => data.received),
        backgroundColor: [
          "#22b7db",
        ],
        borderColor: "#22b7db",
        borderWidth: 2.5,
        tension: 0.3
      }
    ],
  });
  const [lineOptions, setLineOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point:{
          radius: 0
      }
    },
    scales: {
      x: {
        grid:{
          display:false
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 13
        }
      },
      y: {
        min: 0,
        max: ckeckGridAxis(2,'max', ChartData.twoLineSample),
        grid:{
          display:false
        },
        ticks: {
          stepSize: ckeckGridAxis(2,'step', ChartData.twoLineSample),
          autoSkip: false
        },
        afterTickToLabelConversion:function(q){
          for(var tick in q.ticks){
              q.ticks[tick].label = q.ticks[tick].label +' MB';
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false
      },
      tooltip:{
        borderWidth: 1,
        borderColor: '#D0D0D0',
        backgroundColor: 'rgba(255,255,255,0.9)',
        yAlign: 'bottom',
        xAlign: 'center',
        caretSize: 0,
        titleAlign: 'center',
        titleColor: '#6C6C6C',
        titleMarginBottom: 8,
        bodySpacing: 6,
        bodyColor: '#9D9D9D',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        displayColors: false,
        padding: 12,
        callbacks: {
          label: function (tooltipItems) {
            return  " "+ tooltipItems.dataset.label + " : "+ tooltipItems.formattedValue +' MB';
          },
          labelTextColor: (tooltipItems) => {
            if (tooltipItems.dataset.label ==='received'){
              return "#22b7db";
            }else{
              return "#65bd60";
            }
          }
        }
      },
    }
  });

  // console.log(props.device);
  return (
    <>
      <div className='title-container mb-2'>
        <InlineTitle label='CLIENT' style={{justifyContent: 'space-between'}}>
          <div className=''>Time frame : </div>
          <DropdownWithTimeframe
            customDefaultTimeframe={newTimeFrame}
            onChange={selectedTimeframe => console.log('selectedTimeframe-1-', selectedTimeframe)}
          />
          <div className=''>Client types : </div>
          <DropdownWithItem
            selectedItem={clientTypeList.filter(clientType => clientType.isActive)[0]}
            itemList={clientTypeList}
            style={{ width: '150px' }}
            onClick={clientType => changeDropdown(clientType, clientTypeList, setClientTypeList)}
          />
          <div className=''>Bands : </div>
          <DropdownWithItem
            selectedItem={clientBandList.filter(clientBand => clientBand.isActive)[0]}
            itemList={clientBandList}
            style={{ width: '150px' }}
            onClick={clientBand => changeDropdown(clientBand, clientBandList, setClientBandList)}
          />
        </InlineTitle>
      </div>
      <div className='subtitle-container mt-4'>
        <div className='sub-title'>CONNECTED CLIENTS</div>
        <InlineTitle isNonUnderline style={{justifyContent: 'space-between'}}>
          <Button
            label=""
            title="Refresh"
            className="icon-refresh"
            style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
            onClick={() => console.log('Refresh')}
          />
          <Button
            label=""
            title="Download"
            className="icon-download"
            style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
            onClick={() => console.log('Download')}
          />
        </InlineTitle>
      </div>
      <div className={`mt-2 mb-4 chart-container`}>
        <div className={`${mainStyle['chartBox']}`}>
          <Chart type='bar' data = {barData} options = {barOptions}></Chart>
        </div>
      </div>
      <div className='subtitle-container mt-4'>
        <div className='sub-title'>CLIENT USAGE</div>
        <InlineTitle isNonUnderline style={{justifyContent: 'space-between'}}>
          <div className=''>Display types : </div>
          <DropdownWithItem
            selectedItem={usageTypeList.filter(usageType => usageType.isActive)[0]}
            itemList={usageTypeList}
            style={{ width: '150px' }}
            onClick={usageType => changeDropdown(usageType, usageTypeList, setUsageTypeList)}
          />
          <div className=''>Device : </div>
          <DropdownWithItem
            selectedItem={usageDeviceList.filter(usageDevice => usageDevice.isActive)[0]}
            itemList={usageDeviceList}
            style={{ width: '150px' }}
            onClick={usageDevice => changeDropdown(usageDevice, usageDeviceList, setUsageDeviceList)}
          />
          <Button
            label=""
            title="Refresh"
            className="icon-refresh"
            style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
            onClick={() => console.log('Refresh')}
          />
          <Button
            label=""
            title="Download"
            className="icon-download"
            style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
            onClick={() => console.log('Download')}
          />
        </InlineTitle>
      </div>
      <div className={`mt-2 mb-4 chart-container`}>
        <div className={`${mainStyle['chartBox']}`}>
          <Chart type='line' data = {lineData} options = {lineOptions}></Chart>
        </div>
      </div>
    </>
  )
}

export default Client;