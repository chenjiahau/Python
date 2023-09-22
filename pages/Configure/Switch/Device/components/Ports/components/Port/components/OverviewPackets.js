import mainStyle from '../../../ports.module.scss';

import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

// Component
import { InlineTitle, DropdownWithItem } from 'components/';

// Dummy data
import { getOverviewPackets } from 'dummy/data/switch/overview-packets';
import { changeDropdown } from 'dummy/utils/dropdown';

const defaultTimeframes = [
  { title: 'Live Data', hour: 1, isActive: true },
  { title: 'Last 24 hours', hour: 24, isActive: false },
  { title: 'Last 7 days', hour: 24 * 7, isActive: false }
]

const OverviewPackets = () => {

  // Fake data
  const fakeOverviewPackets = getOverviewPackets();

  // State
  const [timeframes, setTimeframes] = useState(defaultTimeframes);
  const [data, setData] = useState(null);
  const [timer, setTimer] = useState(0);

  // Method
  const changeTimeframe = (timeframe) => {
    changeDropdown(timeframe, timeframes, setTimeframes);
    setData(getOverviewPackets(timeframe.hour));
  }

  if (timeframes.find(item => item.isActive).title === 'Live Data') {
    setTimeout(() => {
      setTimer(timer + 1);
    }, 1000);
  }

  // Side effect
  useEffect(() => {
    setData(fakeOverviewPackets);

    setTimeout(() => {
      setTimer(timer + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimer(0);
  }, [timeframes])

  if (!data) {
    return;
  }

  return (
    <>
      <div className='row-col-block'>
        <InlineTitle label='OVERVIEW PACKETS' />
        <div className={mainStyle['dropdown-and-text']}>
          <div style={{ width: '160px' }}>
            <DropdownWithItem
              type='normal'
              selectedItem={timeframes.find(timeframe => timeframe.isActive)}
              itemList={timeframes}
              isTruncate
              onClick={timeframe => changeTimeframe(timeframe)}
            />
          </div>
          {
            timeframes.find(item => item.isActive).title === 'Live Data' && (
              <div>
                This has been updated before {timer} second(s)
              </div>
            )
          }
          <div></div>
        </div>
        <div className='mt-2'>
          <Table striped className='table-container'>
            <thead>
              <tr>
                <th className='th-not-sorting'></th>
                <th className='th-not-sorting'>Total</th>
                <th className='th-not-sorting'>Sent</th>
                <th className='th-not-sorting'>Received</th>
                <th className='th-not-sorting'>
                  Rate
                  (<span className='upload-text'>Sent ↑</span>
                  <span className='download-text'>Received ↓</span>)
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.type}</td>
                      <td>{item.total}</td>
                      <td>{item.sent}</td>
                      <td>{item.received}</td>
                      <td>
                        {
                          typeof item.rate === 'object' ? (
                            <>
                              {item.rate.total} (
                              <span className='upload-text'>{item.rate.sent} ↑</span>
                              <span className='download-text'>{item.rate.received} ↓</span>
                              )
                            </>
                          ) : (
                            <span>{item.rate}</span>
                          )
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>

      </div>
    </>
  )
}

export default OverviewPackets;