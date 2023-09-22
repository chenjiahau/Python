import mainStyle from '../../../summary.module.scss';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
// Component
import { InlineTitle, Icon } from 'components/';

const fakeData = [
  {port: '1', type: 'vlan', status: '1gbps'},
  {port: '2', type: 'vlan', status: 'disconnected'},
  {port: '3', type: 'vlan', status: 'disconnected'},
  {port: '4', type: 'vlan', status: 'disconnected'},
  {port: 'WAN 1', type: 'wan', status: '100mbps'},
  {port: 'WAN 2', type: 'wan', status: 'disconnected'}
]

const Overview = (props) => {

  const [hoverPortIndex, setHoverPortIndex] = useState(-1);

  const mouseover = (e, index) => {
    setHoverPortIndex(index)
  }
  const mouseleave = (e) => {
    setHoverPortIndex(-1)
  }

  const renderHover = () => {
    // return connectivity.map((connect, index) => {
      return (
        <div className={mainStyle['connection-bar-tooltip']}
          key={1}
          style={{
            display: hoverPortIndex === -1 ? 'none' : 'block',
          }}
        >
          <>
            <div className="connection-status" key={2 + 'cs'}>
              <div className="b-title" key={2 + 'bt'}>testHover</div>
            </div>
          </>
        </div>
      );
    // })
  }

  return (
    <>
      <InlineTitle label='OVERVIEW'></InlineTitle>
      <div className={mainStyle['overview-container']}>
        <div className={mainStyle['icon-panel']}>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-25gbps ${mainStyle['round-icon']}`} />
            <span>2.5Gbps</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-1gbps ${mainStyle['round-icon']}`} />
            <span>1Gbps</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-100mbps ${mainStyle['round-icon']}`} />
            <span>10/100 Mbps</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-disconnected ${mainStyle['round-icon']}`} />
            <span>Disconnected</span>
          </div>
        </div>
        <div className={mainStyle['port-panel']}>
          {/* {renderHover()} */}
          {fakeData.map((item, index) => (
            <div className={mainStyle['port-item']} key={index}>
              <div className={mainStyle['number']}>{item.port}</div>
              <div className={`${mainStyle['port']} ${mainStyle['link-'+`${item.status}`]}`} 
                  onMouseOver={(e) => mouseover(e, {index})} onMouseLeave={(e) => mouseleave(e, -1)}>    
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Overview;