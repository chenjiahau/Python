import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import { InlineTitle, ConnectionBar, DropdownWithItem } from 'components/';
import { Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import { changeDropdown } from 'dummy/utils/dropdown';
import Button from 'components/Button';

// Dummy data
import { period, getConnectivity } from 'dummy/data/device';

import summaryStyle from '../summary.module.scss';

const Connectivity = (props) => {
  const { device } = props;

  // Fake data
  const fakeData = getConnectivity(period.oneDay);

  // State
  const [data, setData] = useState(null);

  const defaultTimeframeList = [
    { title: 'Last 24 hours', isActive: true },
    { title: 'Last 7 days', isActive: false },
  ]
  const [timeframeList, setTimeframeList] = useState(cloneDeep(defaultTimeframeList));
  const [barAxis, setBarAxis] = useState(null);

  const initChartAxis = (tFormat) => {
    let selectFormat = tFormat;
    selectFormat = 'last_24_hour';

    let oMonth = parseInt(dayjs().format('MM'));
    let oDay = parseInt(dayjs().format('DD'));
    let oHour = parseInt(dayjs().format('HH'));
    let oPreviousMonth = parseInt(dayjs().subtract(1, 'months').endOf('month').format('MM'));
    let oDaysOfPreviousMonth = parseInt(dayjs().subtract(1, 'months').endOf('month').format('DD'));

    let tmpObj = { id: 0, month: oMonth, day: oDay, hour: oHour, format: oHour+':00'};
    let tmpXAxis = [];
    tmpXAxis.push(tmpObj);

    if (selectFormat === 'last_24_hour'){
      for (let i = 1; i <= 24; i++){
        let obj = {};
        obj.id = i;

        obj.month = tmpXAxis[i - 1].month;
        obj.day = tmpXAxis[i - 1].day;
        obj.hour = tmpXAxis[i - 1].hour - 1;
        if (obj.hour === 0){
          obj.day = tmpXAxis[i - 1].day - 1
          obj.hour = 24
          if (obj.day === 0){
            obj.month = oPreviousMonth
            obj.day = oDaysOfPreviousMonth
          }
        }
        obj.format = obj.hour+':00';

        tmpXAxis.push(obj);
      }
    }else if (selectFormat === 'last_7_day'){
      // 7 days axis
    }
    setBarAxis(tmpXAxis.reverse());
  }

  const SetConnectionBarAxis = (props) => {
    const barList = props.list;
    return (
      <Row className={summaryStyle['barAxisBox']}>
          {
            barList.map((item, index) => {
              if(index%2===0){
                return <div key={item.id} className={summaryStyle['barAxis']}>
                  {item.format}
                </div>
              }
            })
          }
      </Row>
    )
  }

  // Side effect
  useEffect(() => {
    const updatedData = cloneDeep(fakeData);
    for (const item of updatedData) {
      item.title = 'No connectivity';
      if (item.status) {
        item.title = 'Connected switch'
      }
    }
    initChartAxis();
    setData(updatedData);
  }, []);

  if (!data) {
    return;
  }

  // console.log(data);

  return (
    <>
      <InlineTitle label='CONNECTIVITY' />
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
      <div className='mt-2'>
        <ConnectionBar
          barWidth='100%'
          connectivity={data}
        />
        <SetConnectionBarAxis list={barAxis} setList={setBarAxis} />
      </div>  
    </>
  )
}

export default Connectivity