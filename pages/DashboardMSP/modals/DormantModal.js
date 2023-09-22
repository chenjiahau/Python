import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Component
import { Icon, LinkerWithA, PaginationContainer, ModalContainer } from "components";

const defaultList = [
  {
    status: "dormant",
    id: "0",
    type: "AP",
    device: "SHIH02100001",
    model: "DBA-1510P",
    connected: "",
    site: "DBA-1510P BASE",
    profile: "DBA-1510P",
  },
  {
    status: "dormant",
    id: "1",
    type: "Switch",
    device: "DBS2K10000000",
    model: "DBS-2000-28",
    connected: "2022/02/10 09:55",
    site: "DBG-2000",
    profile: "DBS-2000",
  },
  {
    status: "dormant",
    id: "2",
    type: "Switch",
    device: "DBS2K10PTEST",
    model: "DBS-2000-10MP",
    connected: "",
    site: "DBA-1510P BASE",
    profile: "DBS-2000",
  },
  {
    status: "dormant",
    id: "3",
    type: "Gateway",
    device: "CCTSENGDGX12",
    model: "DBG-X1000",
    connected: "",
    site: "DBG-X1000",
    profile: "DBG-X1000 20221124",
  },
  {
    status: "dormant",
    id: "4",
    type: "Gateway",
    device: "DBG2000B0001",
    model: "DBG-2000",
    connected: "2022/11/15 17:36",
    site: "DBA-1510P BASE",
    profile: "DBG-2000 A1 20220613",
  },
  {
    status: "dormant",
    id: "5",
    type: "Gateway",
    device: "DBG2000B0002",
    model: "DBG-2000(B1)",
    connected: "2022/10/21 17:59",
    site: "DBA-1510P BASE",
    profile: "x1000_0616",
  },
];

const SetDormantList = (props) => {
  let tmpList = props.list;
  let t = props.t;
  let sorting = props.sorting;

  return (
    <Table responsive striped hover className="table-container">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <LinkerWithA
              label="Status"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Device name"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Model name"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Last connected"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Site"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Profile"
              className="text-decoration-none"
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
                <Icon className={"icon-round dormant"} />
              </td>
              <td>
                <a href="#/">{item.device}</a>
              </td>
              <td>{item.model}</td>
              <td>{item.connected}</td>
              <td>{item.site}</td>
              <td>{item.profile}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const DormantModal = (props) => {
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
        modalWidthType="modal-750px"
        openModal={modalStatus.dormant.status}
        closeModal={() => changeModalStatus("dormant", false)}
      >
        <div className="header">
          <div className="title">Dormant devices</div>
        </div>
        <div className="body">
          <SetDormantList list={defaultList} t={t} sorting={sorting} />
          <div className="d-flex justify-content-end">
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

export default DormantModal;
