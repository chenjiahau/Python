import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import { InlineTitle, DropdownWithItem } from 'components/';
import { ChartData } from "../data";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { changeDropdown } from 'dummy/utils/dropdown';
import Button from 'components/Button';

import summaryStyle from '../summary.module.scss';

const CpuUtilization = (props) => {
  const { device } = props;

  const defaultTimeframeList = [
    { title: 'Last 24 hours', isActive: true },
    { title: 'Last 7 days', isActive: false },
  ]
  const [timeframeList, setTimeframeList] = useState(cloneDeep(defaultTimeframeList));

  const chartUnit = '%';
  const ckeckGridAxis = (nline, whichVal) => {
    let maxVal, minVal, tmpMax, tmpMin, span, ymag, unit, step, result;
    if (nline >1){
      let maxSent =  Math.round(Math.max(...ChartData.twoLineDatas.map(data => data.sent)));
      let maxReceived =  Math.round(Math.max(...ChartData.twoLineDatas.map(data => data.received)));
      let minSent =  Math.round(Math.min(...ChartData.twoLineDatas.map(data => data.sent)));
      let minReceived =  Math.round(Math.min(...ChartData.twoLineDatas.map(data => data.received)));
      tmpMax = (maxSent > maxReceived ? maxSent: maxReceived);
      tmpMin = (minSent < minReceived ? minSent: minReceived);
    }else{
      tmpMax =  Math.round(Math.max(...ChartData.utilization.map(data => data.yKey)));
      tmpMin =  Math.round(Math.min(...ChartData.utilization.map(data => data.yKey)));
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
  const [lineData, setLineData] = useState({
    // const lineData = {
    labels: ChartData.utilization.map((data) => data.time),
    datasets: [
      {
        label: "utilization",
        data: ChartData.utilization.map((data) => data.yKey),
        backgroundColor: [
          "#65bd60",
        ],
        borderColor: "#65bd60",
        borderWidth: 2.5,
        tension: 0.3
      },
      // {
      //   label: "received",
      //   data: ChartData.twoLineDatas.map((data) => data.received),
      //   backgroundColor: [
      //     "#22b7db",
      //   ],
      //   borderColor: "#22b7db",
      //   borderWidth: 2.5,
      //   tension: 0.3
      // }
    ],
  });
  const [lineOptions, setLineOptions] = useState({
    // const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
    elements: {
      point:{
          radius: 0
      }
    },
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
        max: ckeckGridAxis(1,'max'),
        grid:{
          display:false
        },
        ticks: {
          stepSize: ckeckGridAxis(1,'step'),
          autoSkip: false
        },
        afterTickToLabelConversion:function(q){
          for(var tick in q.ticks){
              q.ticks[tick].label = q.ticks[tick].label +' ' + chartUnit;
          }
        },
      },
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip:{
        borderWidth: 1,
        borderColor: '#D0D0D0',
        backgroundColor: 'rgba(255,255,255,0.9)',
        yAlign: 'bottom',
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
            return  " "+ tooltipItems.dataset.label + " : "+ tooltipItems.formattedValue +' ' + chartUnit;
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

  return (
    <>
      <InlineTitle label='CPU UTILIZATION' />
      <div className="layout-container layout-container breadcrumb--extended">
        <div></div>
        <div className="breadcrumb--extended-right">
          <InlineTitle isNonUnderline style={{ float: 'right' }}>
            <div className='form-title--above-table'>Time frame : </div>
            <DropdownWithItem
              id="device-timeframe-dropdown"
              type="normal"
              selectedItem={timeframeList.filter(timeframe => timeframe.isActive)[0]}
              itemList={timeframeList}
              isTruncate
              style={{ width: '150px' }}
              onClick={timeframe => changeDropdown(timeframe, timeframeList, setTimeframeList)}
            />
            <Button
              label=""
              title="Refresh"
              className="icon-refresh"
              style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
              onClick={() => console.log('Refresh')}
            />
          </InlineTitle>
        </div>
      </div>
      <div className={`mt-2 ${summaryStyle['chartBox']}`}>
        <Chart type='line' data = {lineData} options = {lineOptions}></Chart>
      </div>
    </>
  )
}

export default CpuUtilization