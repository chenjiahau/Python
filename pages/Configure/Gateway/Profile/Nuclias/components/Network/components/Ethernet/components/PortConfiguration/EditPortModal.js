import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer } from 'components/';

// Dummy data & util

const defaultInterfaces = [
  { id: 1, title: 'WAN1', isActive: false },
  { id: 2, title: 'WAN2', isActive: false },
  { id: 3, title: 'LAN1', isActive: false },
  { id: 4, title: 'LAN2', isActive: false },
  { id: 5, title: 'LAN3', isActive: false },
  { id: 6, title: 'LAN4', isActive: false },
];

const defaultPortStates = [
  { id: 1, title: 'Enabled', isActive: false },
  { id: 2, title: 'Disabled', isActive: false },
]

const defaultPortLinks = [
  { id: 1, title: 'Auto', isActive: false },
  { id: 2, title: '1Gbps (auto)', isActive: false },
  { id: 3, title: '1Gbps full duplex master (forced)', isActive: false },
  { id: 4, title: '1Gbps full duplex slave (forced)', isActive: false },
  { id: 5, title: '100Mbps (auto)', isActive: false },
  { id: 6, title: '100Mbps full duplex (forced)', isActive: false },
  { id: 7, title: '100Mbps half duplex (forced)', isActive: false },
  { id: 8, title: '10Mbps (auto)', isActive: false },
  { id: 9, title: '10Mbps full duplex (forced)', isActive: false },
  { id: 10, title: '10Mbps half duplex (forced)', isActive: false },
];

const EditPortModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    selectedPort
  } = props;

  // State
  const [interfaces, setInterfaces] = useState([]);
  const [portStates, setPortStates] = useState([]);
  const [portLinks, setPortLinks] = useState([]);

  // Method
  const changeLink = (selectedLink) => {
    const updatedPortLinks = cloneDeep(portLinks);
    updatedPortLinks.forEach(link => {
      link.isActive = false
      if (link.title === selectedLink.title) {
        link.isActive = true;
      }
    });
    setPortLinks(updatedPortLinks);
  }

  // Side effect
  useEffect(() => {
    if (!selectedPort) {
      return;
    }

    const updatedInterfaces = cloneDeep(defaultInterfaces);
    updatedInterfaces.forEach(item => {
      if (item.title === selectedPort.port) {
        item.isActive = true;
      }
    });
    setInterfaces(updatedInterfaces);

    const updatedPortStatus = cloneDeep(defaultPortStates);
    updatedPortStatus.forEach(item => {
      if (item.title === selectedPort.portState) {
        item.isActive = true;
      }
    });
    setPortStates(updatedPortStatus);

    const updatedPortLinks = cloneDeep(defaultPortLinks);
    updatedPortLinks.forEach(item => {
      if (item.title === selectedPort.linkState) {
        item.isActive = true;
      }
    });
    setPortLinks(updatedPortLinks);
  }, [selectedPort]);

  if (!selectedPort) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.editPort.status}
      closeModal={() => changeModalStatus(modalStatus.editPort.self, false)}
    >
      <div className="header">
        <div className="title">Edit {selectedPort.port} Port</div>
      </div>
      <div className="body">
        <Row>
          <Col>
            <div>
              <div className='modal-form-title'>Interface</div>
              <DropdownWithItem
                type='normal'
                selectedItem={interfaces.find(item => item.isActive)}
                itemList={interfaces}
                disabled={true}
                onClick={item => { }}
              />
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col sm={6}>
            <div>
              <div className='modal-form-title'>Port state</div>
              <DropdownWithItem
                type='normal'
                selectedItem={portStates.find(item => item.isActive)}
                itemList={portStates}
                disabled={true}
                onClick={item => { }}
              />
            </div>
          </Col>
          <Col sm={6}>
            <div>
              <div className='modal-form-title'>Link(RJ-45)</div>
              <DropdownWithItem
                type='normal'
                selectedItem={portLinks.find(item => item.isActive)}
                itemList={portLinks}
                onClick={item => changeLink(item)}
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className="footer">
        <Button
          label="Cancel"
          className="btn-cancel"
          onClick={() => changeModalStatus(modalStatus.editPort.self, false)}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => changeModalStatus(modalStatus.editPort.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditPortModal;
