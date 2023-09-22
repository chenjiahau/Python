import summaryReportStyle from './summary-report.module.scss';

import { Row, Col, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SummaryReportTables = ({ preview }) => {
  const { t } = useTranslation();

  return (
    <div
      className={
        preview ? summaryReportStyle['show-tables-info'] : summaryReportStyle['hide-tables-info']
      }
    >
      <Row>
        {/* Most active access points */}
        <Col xl={12}>
          <div className="form-title mb-2 mt-4">{t('dc5fa582f0')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Model</th>
                  <th>Device name</th>
                  <th>UID</th>
                  <th>MAC Address</th>
                  <th>Usage (MB)</th>
                  <th>Usage (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>DBA-2720P</td>
                  <td>AP1</td>
                  <td>JY64QRFRB28G</td>
                  <td>C0:A0:BB:FB:DD:FB</td>
                  <td>0.00</td>
                  <td>0.00%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>DBA-2720P</td>
                  <td>AP2</td>
                  <td>FQVSBLBXD9F4</td>
                  <td>B0:C5:54:08:09:3C</td>
                  <td>0.00</td>
                  <td>0.00%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>DBA-2720P</td>
                  <td>AP3</td>
                  <td>JY64QRGCB28G</td>
                  <td>C0:A0:BB:FB:DD:FB</td>
                  <td>0.00</td>
                  <td>0.00%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>DBA-2720P</td>
                  <td>AP4</td>
                  <td>JXJZALMHCF83</td>
                  <td>D0:17:C2:3B:FB:40</td>
                  <td>0.00</td>
                  <td>0.00%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>DBA-2720P</td>
                  <td>AP5</td>
                  <td>FQVSBLBXD9F4</td>
                  <td>C0:A0:BB:FB:DD:FB</td>
                  <td>0.00</td>
                  <td>0.00%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Most active SSIDs */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('6964557195')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>SSID</th>
                  <th>Usage (MB)</th>
                  <th>Usage (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>SSID-01</td>
                  <td>5,538.05</td>
                  <td>90.00%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>SSID-02</td>
                  <td>461.91</td>
                  <td>7.30%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>SSID-03</td>
                  <td>421.23</td>
                  <td>7.02%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>SSID-04</td>
                  <td>342.56</td>
                  <td>5.32%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>SSID-05</td>
                  <td>254.73</td>
                  <td>3.12%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Most active Wi-Fi clients */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('ab3346e59c')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>MAC address</th>
                  <th>Manufacturer</th>
                  <th>Usage (MB)</th>
                  <th>Usage (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>C0:A0:BB:FB:DD:FB</td>
                  <td>Apple inc.</td>
                  <td>5,335.73</td>
                  <td>89.53%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>B0:C5:54:08:09:3C</td>
                  <td>Apple inc.</td>
                  <td>521.56</td>
                  <td>8.75%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>B0:C5:54:25:B1:66</td>
                  <td>Apple inc.</td>
                  <td>102.22</td>
                  <td>1.72%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>D0:17:C2:3B:FB:40</td>
                  <td>Apple inc.</td>
                  <td>87.33</td>
                  <td>1.02%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>D0:17:C2:3B:FB:40</td>
                  <td>Apple inc.</td>
                  <td>00.00</td>
                  <td>0.00%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Highest CPU utilization (> 50%) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('fe339916bd')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>89.53%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>8.75%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>1.72%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>1.02%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>0.00%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Highest port utilization (> 50%) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('7dd6c4d9b5')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>89.53%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>8.75%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>1.72%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>1.02%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>0.00%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Most power consumption */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('4417e20010')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Power Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2475.7 Wh</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>1447.7 Wh</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>535 Wh</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>513.1 Wh</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>233.0 Wh</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Top uplink ports by usage (Transmitted packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('1ba1b70394')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>54321 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>4321 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>321 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>21 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>1 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Top uplink ports by usage (Received packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('9dd6db3a27')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>54321 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>4321 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>321 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>21 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>1 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Top devices by usage (Received packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('fa1cb67033')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>54321 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>4321 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>321 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>21 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>1 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Top ports by usage (Transmitted packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('fd5d0769da')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>18524 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>78436 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>20354 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>8004 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>27 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Top ports by usage (Received packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('5781e62e56')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>89064 MB</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>78436 MB</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>20354 MB</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>8004 MB</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>27 MB</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Top ports by multicast usage (Received packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('431f7f5768')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>11393 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>10532 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>9984 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>7543 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>996 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Top ports by broadcast usage (Received packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('b6c7394ac1')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>18524 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>9957 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>3369 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>1024 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>230 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Top ports by error usage (Received packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('f3e9a04875')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>18524 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>9957 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>3369 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>1024 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>230 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Top ports by discard usage (Received packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('93aa694212')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>18524 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>5</td>
                  <td>9957 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>6</td>
                  <td>3369 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3</td>
                  <td>1024 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>2</td>
                  <td>230 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Switch total traffic by usage (Transmitted and received bytes) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('4d867ed5f8')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>89064 MB</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>78436 MB</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>20354 MB</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>18004 MB</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>27 MB</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Switch total traffic by usage (Transmitted and received packets) */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('d6805e354f')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3RD</td>
                  <td>DBS-2000-10P</td>
                  <td>18524 pkt</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4RD</td>
                  <td>DBS-2000-10P</td>
                  <td>9957 pkt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5RD</td>
                  <td>DBS-2000-10P</td>
                  <td>3369 pkt</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6RD</td>
                  <td>DBS-2000-10P</td>
                  <td>1024 pkt</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Guest</td>
                  <td>DBS-2000-10P</td>
                  <td>230 pkt</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Top usage by device */}
        <Col xl={12}>
          <div className="form-title mb-2 mt-4">{t('4eb921c7c3')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Site</th>
                  <th>Device UID</th>
                  <th>MAC address</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>LADBG</td>
                  <td>Sales USA</td>
                  <td>NEWBZCAP224C</td>
                  <td>00:AD:24:36:84:80</td>
                  <td>353.43</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>FRADBG</td>
                  <td>Sales Germary</td>
                  <td>23YUX6EBB7GF7</td>
                  <td>CA:E9:0A:9F:CA:D2</td>
                  <td>258.36</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>HQDBG02</td>
                  <td>Sales Germary</td>
                  <td>52AB6WA29D76</td>
                  <td>10:BE:F5:C6:5C:08</td>
                  <td>125.07</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>TKYDBG</td>
                  <td>Taipei HQ</td>
                  <td>NEWBZCAP224C</td>
                  <td>1C:5F:2B:66:5F:B2</td>
                  <td>66.74</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>HQDBG01</td>
                  <td>Marketing Japan</td>
                  <td>NEWAPTTTTTTZ</td>
                  <td>AC:19:8F:1B:87:19</td>
                  <td>23.06</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Most clients per device */}
        <Col xl={12}>
          <div className="form-title mb-2 mt-4">{t('b20672f94b')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Site</th>
                  <th>Device UID</th>
                  <th>MAC address</th>
                  <th>Clients</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>LADBG</td>
                  <td>Sales USA</td>
                  <td>NEWBZCAP224C</td>
                  <td>00:AD:24:36:84:80</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>FRADBG</td>
                  <td>Sales Germary</td>
                  <td>23YUX6EBB7GF7</td>
                  <td>CA:E9:0A:9F:CA:D2</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>HQDBG02</td>
                  <td>Sales Germary</td>
                  <td>52AB6WA29D76</td>
                  <td>10:BE:F5:C6:5C:08</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>TKYDBG</td>
                  <td>Taipei HQ</td>
                  <td>NEWBZCAP224C</td>
                  <td>1C:5F:2B:66:5F:B2</td>
                  <td>17</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>HQDBG01</td>
                  <td>Marketing Japan</td>
                  <td>NEWAPTTTTTTZ</td>
                  <td>AC:19:8F:1B:87:19</td>
                  <td>30</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Top service ports by usage */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('d0b885d22a')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service port</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>HTTP (Port:80)</td>
                  <td>27 GB</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>HTTPS (Port:443)</td>
                  <td>20 GB</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>RSTP (Port:554)</td>
                  <td>12 GB</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>BT (Port:6881)</td>
                  <td>20 GB</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>POP3 (Port:110)</td>
                  <td>20 GB</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Top web categories */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('294e9d2857')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Web categories</th>
                  <th>Hit rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Search Engine</td>
                  <td>50%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Streaming Media</td>
                  <td>17%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Web</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Remote Access Terminals</td>
                  <td>6.5%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Network Protocols</td>
                  <td>3.2%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Top application categories */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('1c22bfc8ce')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>APP categories</th>
                  <th>Hit rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Streaming</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Common</td>
                  <td>8.2%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>WebVideo</td>
                  <td>7%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Instant Messenger</td>
                  <td>6.2%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>MobileAppOther</td>
                  <td>5%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Top applications */}
        <Col xl={6}>
          <div className="form-title mb-2 mt-4">{t('bb43f30192')}</div>
          <div className={`${summaryReportStyle['white-table']}`}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>APP name</th>
                  <th>Hit rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Youtube</td>
                  <td>19.2%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Apple.com</td>
                  <td>17.8%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Netflix</td>
                  <td>10.3%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>LINE TV</td>
                  <td>6.2%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Adobe</td>
                  <td>5%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryReportTables;
