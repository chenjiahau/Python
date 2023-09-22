import topOverviewStyle from '../../top-overview.module.scss';

import img_device_gateway from 'assets/img/v2/icon/device_gateway.png';
import img_device_switch from 'assets/img/v2/icon/device_switch.png';
import img_device_ap from 'assets/img/v2/icon/device_ap.png';


const Nuclias = (props) => {
  const { changeModalStatus } = props;

  return (
    <>
      <div className={topOverviewStyle['sub-status-container']}>
        <div>
          <img className='mx-3' alt='' src={img_device_gateway} width={65} />
        </div>
        <div className={topOverviewStyle['number-container']}>
          <div className={topOverviewStyle['number-title']}>
            <span>Gateways</span>
          </div>
          <div className={topOverviewStyle['number-context']}>
            <span
              className={`${topOverviewStyle['number-count']} ${topOverviewStyle['number-online']}`}
              onClick={() => changeModalStatus('gateway', true)}
            >
              4
            </span>
            <span>/</span><span>10</span>
          </div>
        </div>
      </div>
      <div className={topOverviewStyle['overview-horizontal-line']}></div>
      <div className={topOverviewStyle['sub-status-container']}>
        <div>
          <img className='mx-3' alt='' src={img_device_switch} width={65} />
        </div>
        <div className={topOverviewStyle['number-container']}>
          <div className={topOverviewStyle['number-title']}>
            <span>Switches</span>
          </div>
          <div className={topOverviewStyle['number-context']}>
            <span
              className={`${topOverviewStyle['number-count']} ${topOverviewStyle['number-online']}`}
              onClick={() => changeModalStatus('switch', true)}
            >
              1
            </span>
            <span>/</span>
            <span>3</span>
          </div>
        </div>
      </div>
      <div className={topOverviewStyle['overview-horizontal-line']}></div>
      <div className={topOverviewStyle['sub-status-container']}>
        <div>
          <img className='mx-3' alt='' src={img_device_ap} width={65} />
        </div>
        <div className={topOverviewStyle['number-container']}>
          <div className={topOverviewStyle['number-title']}>
            <span>Access Points</span>
          </div>
          <div className={topOverviewStyle['number-context']}>
            <span
              className={`${topOverviewStyle['number-count']} ${topOverviewStyle['number-online']}`}
              onClick={() => changeModalStatus('ap', true)}
            >
              1
            </span>
            <span>/</span>
            <span>2</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nuclias;