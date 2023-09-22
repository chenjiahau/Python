import mainStyle from '../../../../../ports.module.scss';

import { useState } from 'react';

// Component
import { Button, Icon } from 'components/';

const CyclePort = (props) => {
  const { port } = props;

  // State
  const [showLoading, setShowLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Method
  const handleSubmit = (showLoading, showResult = null) => {
    showLoading(true);
    showResult(false);

    setTimeout(() => {
      showLoading(false);
      showResult && showResult(true);
    }, 1000);
  }

  return (
    <>
      <div className='col-block'>
        <div className={`${showLoading && mainStyle['loading-block']}`}>
          <div className={`${showLoading && mainStyle['loading-animation']}`}></div>
          <div className='text-title text-title-underline'>CABLE TEST</div>
          <div className='text-warning mt-3'>Warning : This test will disrupt traffic to devices. Cable test cannot be run on fiber ports.</div>
          <div className='mt-2'>
            <Button
              label='Test'
              className='btn-grey-blue'
              style={{ width: '100px' }}
              onClick={() => handleSubmit(setShowLoading, setShowResult)}
            />
            <span className='space'></span>
            <span>Run a cable test on this port</span>
          </div>
        </div>

        {
          showResult && (
            <div className={`${mainStyle['result']} mt-2`}>
              <div className={mainStyle['header']}>
                <div className={mainStyle['title']}>CYCLE PORT</div>
                <div className={mainStyle['clear']}>
                  <Icon className={'icon-close-small'} onClick={() => setShowResult(false)} />
                </div>
              </div>
              <div className={mainStyle['content']}>
                Port {port.port}: Success.
              </div>
            </div>
          )
        }
      </div>

    </>
  )
}

export default CyclePort;