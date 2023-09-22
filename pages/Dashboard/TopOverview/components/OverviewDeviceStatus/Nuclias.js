import topOverviewStyle from '../../top-overview.module.scss';

// Component
import { Icon } from 'components/';

const Nuclias = (props) => {
  const { changeModalStatus } = props;

  return (
    <>
      <div className={topOverviewStyle['sub-status-container']}>
        <div className={topOverviewStyle['number-container']}>
          <div className={topOverviewStyle['number-title']}>
            <Icon className={`icon-round online ${topOverviewStyle['number-icon']}`} />
            <span>Online</span>
          </div>
          <div className={topOverviewStyle['number-context']}>
            <span
              className={`${topOverviewStyle['number-count']} ${topOverviewStyle['number-online']}`}
              onClick={() => changeModalStatus('online', true)}
            >
              6
            </span>
          </div>
        </div>
      </div>
      <div className={topOverviewStyle['sub-status-container']}>
        <div className={topOverviewStyle['number-container']}>
          <div className={topOverviewStyle['number-title']}>
            <Icon className={`icon-round offline ${topOverviewStyle['number-icon']}`} />
            <span>Offline</span>
          </div>
          <div className={topOverviewStyle['number-context']}>
            <span
              className={`${topOverviewStyle['number-count']} ${topOverviewStyle['number-offline']}`}
              onClick={() => changeModalStatus('offline', true)}
            >
              3
            </span>
          </div>
        </div>
      </div>
      <div className={topOverviewStyle['sub-status-container']}>
        <div className={topOverviewStyle['number-container']}>
          <div className={topOverviewStyle['number-title']}>
            <Icon className={`icon-round warning ${topOverviewStyle['number-icon']}`} />
            <span>Warnings</span>
          </div>
          <div className={topOverviewStyle['number-context']}>
            <span
              className={`${topOverviewStyle['number-count']} ${topOverviewStyle['number-warning']}`}
              onClick={() => changeModalStatus('warning', true)}
            >
              1
            </span>
          </div>
        </div>
      </div>
      <div className={topOverviewStyle['sub-status-container']}>
        <div className={topOverviewStyle['number-container']}>
          <div className={topOverviewStyle['number-title']}>
            <Icon className={`icon-round dormant ${topOverviewStyle['number-icon']}`} />
            <span>Dormant</span>
          </div>
          <div className={topOverviewStyle['number-context']}>
            <span
              className={`${topOverviewStyle['number-count']} ${topOverviewStyle['number-dormant']}`}
              onClick={() => changeModalStatus('dormant', true)}
            >
              6
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nuclias;