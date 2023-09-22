import overviewStyle from './overview.module.scss';

// Icon
import deviceApIcon from '../../../../assets/img/v2/icon/device_ap.png';
import deviceSwitchIcon from '../../../../assets/img/v2/icon/device_switch.png';
import deviceGatewayIcon from '../../../../assets/img/v2/icon/device_gateway.png';

import { useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import InlineTitle from '../../../../components/InlineTitle';

const TopOverviewContainer = () => {
  return (
    <div className={overviewStyle['top-overview-container']}>
      <Row>
        <Col className={overviewStyle['devices-status-container']}>
          <div className={overviewStyle['sub-status-container']}>
            <div className={overviewStyle['number-container']}>
              <div className={overviewStyle['number-title']}>Total devices</div>
              <a href="#" className={overviewStyle['number-count']}>1058</a>
            </div>
          </div>

          <div className={overviewStyle['sub-status-container']}>
            <div>
              <img className='mx-3' src={deviceApIcon} width={65} />
            </div>
            <div className={overviewStyle['number-container']}>
              <div className={overviewStyle['number-title']}>Access points</div>
              <a href="#" className={overviewStyle['number-count']}>938</a>
            </div>
          </div>

          <div className={overviewStyle['sub-status-container']}>
            <div>
              <img className='mx-3' src={deviceSwitchIcon} width={65} />
            </div>
            <div className={overviewStyle['number-container']}>
              <div className={overviewStyle['number-title']}>Switches</div>
              <a href="#" className={overviewStyle['number-count']}>100</a>
            </div>
          </div>

          <div className={overviewStyle['sub-status-container']}>
            <div>
              <img className='mx-3' src={deviceGatewayIcon} width={65} />
            </div>
            <div className={overviewStyle['number-container']}>
              <div className={overviewStyle['number-title']}>Gateways</div>
              <a href="#" className={overviewStyle['number-count']}>20</a>
            </div>
          </div>
        </Col>

        <div className={overviewStyle['devices-v-line-container']}></div>

        <Col className={overviewStyle['licenses-status-container']}>
          <div className={overviewStyle['sub-status-container']}>
            <div className={overviewStyle['number-container']}>
              <div className={overviewStyle['number-title']}>Total licenses</div>
              <a href="#" className={overviewStyle['number-count']}>50</a>
            </div>
          </div>

          <div className={overviewStyle['sub-status-container']}>
            <div className={overviewStyle['number-container']}>
              <div className={overviewStyle['number-title']}>Used licenses</div>
              <a href="#" className={overviewStyle['number-count']}>10</a>
            </div>
          </div>

          <div className={overviewStyle['sub-status-container']}>
            <div className={overviewStyle['number-container']}>
              <div className={overviewStyle['number-title']}>Unused / Inactive licenses</div>
              <a href="#" className={overviewStyle['number-count']}>20</a>
            </div>
          </div>

          <div className={overviewStyle['sub-status-container']}>
            <div className={overviewStyle['number-container']}>
              <div className={overviewStyle['number-title']}>Unused / Active licenses</div>
              <a href="#" className={overviewStyle['number-count']}>15</a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const BottomOverviewContainer = () => {
  return (
    <div className={overviewStyle['bottom-overview-container']}>
      <Row>
        <Col xl={6} className={overviewStyle['bottom-sub-container']}>
          <InlineTitle label='EXPIRING IN 60 DAYS' />
          <Table responsive className={overviewStyle['overview-table-container']}>
            <thead>
              <tr>
                <th>#</th>
                <th>Model name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "50px" }}>1</td>
                <td>DBA-series</td>
                <td><a href="#">0</a></td>
              </tr>
              <tr>
                <td style={{ width: "50px" }}>2</td>
                <td>DBS-2000</td>
                <td><a href="#">0</a></td>
              </tr>
              <tr>
                <td style={{ width: "50px" }}>3</td>
                <td>DBG-series</td>
                <td><a href="#">1</a></td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Col xl={6} className={overviewStyle['bottom-sub-container']}>
          <InlineTitle label='SUMMARY' />
          <Table responsive className={overviewStyle['overview-table-container']}>
            <thead>
              <tr>
                <th>#</th>
                <th>Model name</th>
                <th>Used devices</th>
                <th>Unused / Inactive licenses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "50px" }}>1</td>
                <td>DBA-series</td>
                <td><a href="#">6</a></td>
                <td><a href="#">0</a></td>
              </tr>
              <tr>
                <td style={{ width: "50px" }}>2</td>
                <td>DBS-2000</td>
                <td><a href="#">2</a></td>
                <td><a href="#">0</a></td>
              </tr>
              <tr>
                <td style={{ width: "50px" }}>3</td>
                <td>DBG-series</td>
                <td><a href="#">5</a></td>
                <td><a href="#">5</a></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

const Overview = () => {
  return (
    <div className={`${overviewStyle['overview-container']} layout-container layout-container--column layout-container--fluid`}>

      <InlineTitle label='OVERVIEW' isNonUnderline={true} />
      <TopOverviewContainer />
      <BottomOverviewContainer />

    </div>
  )
}

export default Overview;