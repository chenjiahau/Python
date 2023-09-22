import certificateStyle from '../certificate-management.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';

// Components
import Button from '../../../../components/Button';
import ModalContainer from '../../../../components/ModalContainer';

const defaultBoxList = [
  { id: 0, title: 'DST Root CA X3', isActive: '' },
  { id: 1, title: 'R3', isActive: '' },
  { id: 2, title: 'nuclias.tw', isActive: 'active' },
  { id: 3, title: 'RSA 2048 bits', isActive: '' },
];

const ViewCertificateAuthorityModal = props => {
  const { modalStatus, changeModalStatus } = props;

  const [boxList, setBoxList] = useState([...defaultBoxList]);
  const [subjectDisplay, setSubjectDisplay] = useState(null);
  const [issuerDisplay, setIssuerDisplay] = useState('none');

  const handleClose = () => {
    changeModalStatus('view', false);
    changeBoxItemActive(2);
  };

  const changeBoxItemActive = tmpId => {
    const tmpBoxList = boxList.map(item => {
      if (item.id === tmpId) {
        return { ...item, isActive: 'active' };
      } else {
        return { ...item, isActive: '' };
      }
    });
    setBoxList(tmpBoxList);

    checkSubjectElement(tmpId);
    checkIssuerElement(tmpId);
  };

  const checkSubjectElement = tmpId => {
    let result = null;
    switch (tmpId) {
      case 3:
        result = 'none';
        break;
      default:
        result = null;
        break;
    }
    setSubjectDisplay(result);
  };

  const checkIssuerElement = tmpId => {
    let result = null;
    switch (tmpId) {
      case 0:
      case 3:
        result = 'none';
        break;
      default:
        result = null;
        break;
    }
    setIssuerDisplay(result);
  };

  return (
    <ModalContainer
      modalWidthType="modal-550px"
      openModal={modalStatus.view.status}
      closeModal={() => handleClose()}
    >
      <div className="header">
        <div className="title">Certificate authority detail</div>
      </div>
      <div className="body">
        {/* Box */}
        <div className={certificateStyle['certificate-and-private-key-box']}>
          <div
            className={`${certificateStyle['certificate-item']} ${certificateStyle['root-certificate']} ${certificateStyle[boxList[0]['isActive']]}`}
            onClick={() => changeBoxItemActive(0)}
          >
            <span className={certificateStyle['icon-certificate']}></span>
            <span>{boxList[0]['title']}</span>
          </div>
          <div
            className={`${certificateStyle['certificate-item']} ${certificateStyle['intermediate-certificate']} ${certificateStyle[boxList[1]['isActive']]}`}
            onClick={() => changeBoxItemActive(1)}
          >
            <span className={certificateStyle['sub-level']}></span>
            <span className={certificateStyle['icon-certificate']}></span>
            <span>{boxList[1]['title']}</span>
          </div>
          <div
            className={`${certificateStyle['certificate-item']} ${certificateStyle['leaf-certificate']} ${certificateStyle[boxList[2]['isActive']]}`}
            onClick={() => changeBoxItemActive(2)}
          >
            <span className={certificateStyle['sub-level']}></span>
            <span className={certificateStyle['icon-certificate']}></span>
            <span>{boxList[2]['title']}</span>
          </div>
          <div
            className={`${certificateStyle['certificate-item']} ${certificateStyle['private-key']} ${certificateStyle[boxList[3]['isActive']]}`}
            onClick={() => changeBoxItemActive(3)}
          >
            <span className={certificateStyle['sub-level']}></span>
            <span className={certificateStyle['icon-private-key']}></span>
            <span>{boxList[3]['title']}</span>
          </div>
        </div>

        {/* Table */}
        <Table className={certificateStyle['ca-modal-view-detail']}>
          <tbody>
            {/* Expires */}
            <tr style={{ display: subjectDisplay }}>
              <td>Expires:</td>
              <td>2023/06/16 13:22:58</td>
            </tr>
            {/* Subject */}
            <tr style={{ display: subjectDisplay }}>
              <td>Subject:</td>
              <td></td>
            </tr>
            {/* Subject > Country or region */}
            <tr style={{ display: subjectDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Country or region:
              </td>
              <td>US</td>
            </tr>
            {/* Subject > Organization */}
            <tr style={{ display: subjectDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Organization:
              </td>
              <td>DigiCert inc</td>
            </tr>
            {/* Subject > Organization unit */}
            <tr style={{ display: subjectDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Organization unit:
              </td>
              <td>www.digicert.com</td>
            </tr>
            {/* Subject > Common name */}
            <tr style={{ display: subjectDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Common name:
              </td>
              <td>Digicert Global Root G2</td>
            </tr>
            {/* Subject > Alternative name */}
            <tr style={{ display: subjectDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Alternative name:
              </td>
              <td></td>
            </tr>

            {/* Issuer */}
            <tr style={{ display: issuerDisplay }}>
              <td>Issuer:</td>
              <td></td>
            </tr>
            {/* Issuer > Country or region */}
            <tr style={{ display: issuerDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Country or region:
              </td>
              <td>US</td>
            </tr>
            {/* Issuer > Organization */}
            <tr style={{ display: issuerDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Organization:
              </td>
              <td>DigiCert inc</td>
            </tr>
            {/* Issuer > Organization unit */}
            <tr style={{ display: issuerDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Organization unit:
              </td>
              <td>www.digicert.com</td>
            </tr>
            {/* Issuer > Common name */}
            <tr style={{ display: issuerDisplay }}>
              <td className={certificateStyle['ca-modal-view-detail-item']}>
                Common name:
              </td>
              <td>Digicert Global Root G2</td>
            </tr>

            {/* Algorithm */}
            <tr>
              <td>Algorithm:</td>
              <td>RSA</td>
            </tr>
            {/* Key size */}
            <tr>
              <td>Key size:</td>
              <td>2048 bits</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => handleClose()}
        />
      </div>
    </ModalContainer>
  );
};

export default ViewCertificateAuthorityModal;
