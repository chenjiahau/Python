import newReleasesStyle from './newReleases.module.css';
import previewNormalPng from 'assets/img/v2/icon/icon_preview_normal.png';
import deviceApPng from 'assets/img/v2/icon/device_ap.png';
import deviceSwPng from 'assets/img/v2/icon/device_switch.png';
import deviceGwPng from 'assets/img/v2/icon/device_gateway.png';

import { useState } from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';

import LinkerWithA from 'components/LinkerWithA';
import ReleaseNoteModal from './modals/ReleaseNoteModal';

const NewReleases = () => {
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <div className="layout-container layout-container--column layout-container--fluid">
      <div className="row">
        <div className={`${newReleasesStyle['top-fw-card']} col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4`}>
          <Card className={`${newReleasesStyle['fw-Card']}`}>
            <Card.Body>
              <img
                className="mx-1 me-2"
                src={deviceApPng}
                alt=""
                width={44}
              />
              <Card.Title className={`${newReleasesStyle['fw-card-title']}`}>Access Point</Card.Title>
              <hr />
              <Card.Body className={`${newReleasesStyle['fw-card-body']}`} >
                <Table responsive className={`table ${newReleasesStyle['table-fixed']}`}>
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>#</th>
                      <th style={{ width: '25%' }}>Model	</th>
                      <th style={{ width: '30%' }}>Version</th>
                      <th style={{ width: '35%', paddingLeft: 'initial' }}>Release date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: '10%' }}>1</td>
                      <td style={{ width: '25%' }}>DBA-1210P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02.004"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>2</td>
                      <td style={{ width: '25%' }}>DBA-2520P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>3</td>
                      <td style={{ width: '25%' }}>DBA-2620P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>4</td>
                      <td style={{ width: '25%' }}>DBA-2720P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>5</td>
                      <td style={{ width: '25%' }}>DBA-2920P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>6</td>
                      <td style={{ width: '25%' }}>DBA-1310P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>7</td>
                      <td style={{ width: '25%' }}>DBA-1410P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>8</td>
                      <td style={{ width: '25%' }}>DBA-1510P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>9</td>
                      <td style={{ width: '25%' }}>DBA-1610P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>10</td>
                      <td style={{ width: '25%' }}>DBA-1710P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>11</td>
                      <td style={{ width: '25%' }}>DBA-1810P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>12</td>
                      <td style={{ width: '25%' }}>DBA-1810P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>13</td>
                      <td style={{ width: '25%' }}>DBA-1810P</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview"
                          src={previewNormalPng}
                          alt=""
                          style={{ cursor: "pointer" }}
                          width={15}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.02"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card.Body>
          </Card>
        </div>
        <div className={`${newReleasesStyle['top-fw-card']} col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4`}>
          <Card className={`${newReleasesStyle['fw-Card']}`}>
            <Card.Body>
              <img
                className="mx-1 me-2"
                src={deviceSwPng}
                alt=""
                width={44}
              />
              <Card.Title className={`${newReleasesStyle['fw-card-title']}`} >Switch</Card.Title>
              <hr />
              <Card.Body className={`${newReleasesStyle['fw-card-body']}`} >
                <Table responsive className={`table ${newReleasesStyle['table-fixed']}`}>
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>#</th>
                      <th style={{ width: '25%' }}>Model	</th>
                      <th style={{ width: '30%' }}>Version</th>
                      <th style={{ width: '35%' }}>Release date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: '10%' }}>1</td>
                      <td style={{ width: '25%' }}>DBS-2000</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className={`icon-preview`}
                          src={previewNormalPng}
                          alt=""
                          width={15}
                          style={{ cursor: "pointer" }}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="1.20.008"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>2</td>
                      <td style={{ width: '25%' }}>DBS-2000</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview "
                          src={previewNormalPng}
                          alt=""
                          width={15}
                          style={{ cursor: "pointer" }}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="1.30.001"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card.Body>
          </Card>
        </div>
        <div className={`${newReleasesStyle['top-fw-card']} col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4`}>
          <Card className={`${newReleasesStyle['fw-Card']}`}>
            <Card.Body>
              <img
                className="mx-1 me-2"
                src={deviceGwPng}
                alt=""
                width={44}
              />
              <Card.Title className={`${newReleasesStyle['fw-card-title']}`} >Gateway</Card.Title>
              <hr />
              <Card.Body className={`${newReleasesStyle['fw-card-body']}`} >
                <Table responsive className={`table ${newReleasesStyle['table-fixed']}`}>
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>#</th>
                      <th style={{ width: '25%' }}>Model	</th>
                      <th style={{ width: '30%' }}>Version</th>
                      <th style={{ width: '35%' }}>Release date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: '10%' }}>1</td>
                      <td style={{ width: '25%' }}>DBG-1000</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className={`icon-preview`}
                          src={previewNormalPng}
                          alt=""
                          width={15}
                          style={{ cursor: "pointer" }}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.0"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%' }}>2</td>
                      <td style={{ width: '25%' }}>DBG-1000</td>
                      <td style={{ width: '30%' }}>
                        <img
                          className="icon-preview "
                          src={previewNormalPng}
                          alt=""
                          width={15}
                          style={{ cursor: "pointer" }}
                          onClick={() => setModalStatus(true)}
                        />
                        {' '}
                        <LinkerWithA
                          label="2.0"
                          className={`text-decoration-underline ${newReleasesStyle['release-link']}`}
                          onClick={() => setModalStatus(true)}
                        />
                      </td>
                      <td style={{ width: '35%' }}>2020/2/28</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* ReleaseNoteModal modal */}
      <ReleaseNoteModal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />
    </div>
  )
}

export default NewReleases;