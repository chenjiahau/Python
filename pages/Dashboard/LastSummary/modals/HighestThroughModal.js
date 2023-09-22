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
    device: "DBG-2000HQ",
    usage: "50 GB",
  },
  {
    id: "1",
    device: "DBG-2000DE",
    usage: "30 GB",
  },
  {
    id: "2",
    device: "DBG-X1000US",
    usage: "10 GB",
  },
  {
    id: "3",
    device: "DBG-2000JP",
    usage: "5 GB",
  },
  {
    id: "4",
    device: "DBG-2000SG",
    usage: "2 GB",
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
                <a href={`#/cloud/configure/gateway/device/${index}`}>{item.device}</a>
                {/* <LinkerWithA
                  label={item.device}
                  className="text-decoration-none"
                  onClick={sorting}
                /> */}
              </td>
              <td>{item.usage}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const HighestThroughModal = (props) => {
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
        openModal={modalStatus.highestThrough.status}
        closeModal={() => changeModalStatus("highestThrough", false)}
      >
        <div className="header">
          <div className={lastsummaryStyle["modal-title"]}>
            Highest through by device
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

export default HighestThroughModal;
