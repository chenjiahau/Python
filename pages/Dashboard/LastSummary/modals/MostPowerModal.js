import lastsummaryStyle from "../last-summary.module.scss";

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
// Components
import Icon from "components/Icon";
import { Table } from "react-bootstrap";
import LinkerWithA from "../../../../components/LinkerWithA";
import PaginationContainer from "../../../../components/PaginationContainer";
import ModalContainer from "../../../../components/ModalContainer";

const defaultlist = [
  {
    id: "0",
    device: "SW057",
    usage: "28.0 W",
  },
  {
    id: "1",
    device: "SW_a",
    usage: "26.5 W",
  },
  {
    id: "2",
    device: "B0:C5:54:25:B1:66",
    usage: "0.2 W",
  },
  {
    id: "3",
    device: "SW_c93",
    usage: "0.1 W",
  },
  {
    id: "4",
    device: "SWITCH-67",
    usage: "0.05 W",
  },
];

const SetModalList = (props) => {
  let tmpList = props.list;
  let t = props.t;
  let sorting = props.sorting;
  return (
    <Table responsive hover className="table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th className="w-75">
            <LinkerWithA
              label="Device name"
              className="text-decoration-none text-dark"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Usage"
              className="text-decoration-none text-dark"
              onClick={sorting}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {tmpList.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <a href={`#/cloud/configure/switch/device/${index}`}>{item.device}</a>
              </td>
              <td>{item.usage}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const MostPowerModal = (props) => {
  const { t } = useTranslation();
  const { modalStatus, changeModalStatus } = props;

  const sorting = (e) => {
    console.log("sorting event");
    e.preventDefault();
    const isAscExsist = e.target.classList.contains("is-asc");
    const lastClassName = isAscExsist ? "is-asc" : "is-desc";
    const newClassName = isAscExsist ? "is-desc" : "is-asc";
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
    <div className="">
      <ModalContainer
        modalWidthType="modal-550px"
        openModal={modalStatus.mostPower.status}
        closeModal={() => changeModalStatus("mostPower", false)}
      >
        <div className="header">
          <div className={lastsummaryStyle["modal-title"]}>
            Most power consumption
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className={lastsummaryStyle["align-place-fpc"]}></div>
          06/21/2018 05:00 PM-06/22/2018 05:00 PM
        </div>
        <div className="body">
          <SetModalList list={defaultlist} t={t} sorting={sorting} />
          <div className="d-flex justify-content-between">
            <div className={`pagination-container  form-field`}></div>
            <PaginationContainer
              total={10}
              onPageChange={(currentPageNum) =>
                console.log("onPageChange", currentPageNum)
              }
              onEntryLimitChange={(currentPageNum) =>
                console.log("onEntryLimitChange", currentPageNum)
              }
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default MostPowerModal;
