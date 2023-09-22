import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Component
import { Icon, LinkerWithA, PaginationContainer, ModalContainer } from "components";

const defaultList = [
  {
    status: "online",
    id: "0",
    type: "AP",
    device: "NEWAPTTTTTTZ",
    model: "DBA-1210P",
    connected: "2023/03/08 13:25",
    site: "DBA-1510P BASE",
    profile: "DBA-1210P",
  },
  {
    status: "online",
    id: "1",
    type: "Switch",
    device: "2S2XGDY2EACA-1",
    model: "DBS-2000-28",
    connected: "2023/03/08 13:25",
    site: "DBG-2000",
    profile: "20230131",
  },
  {
    status: "online",
    id: "2",
    type: "Gateway",
    device: "1F",
    model: "DBG-2000",
    connected: "2023/03/08 13:25",
    site: "Taipei",
    profile: "DBG-2000",
  },
  {
    status: "online",
    id: "3",
    type: "Gateway",
    device: "ARGH5SSN4398",
    model: "DBG-2000(B1)",
    connected: "2023/03/08 13:26",
    site: "Latest",
    profile: "DBG-X1000 20221124",
  },
  {
    status: "online",
    id: "4",
    type: "Gateway",
    device: "Edward",
    model: "DBG-X1000",
    connected: "2023/03/08 13:25",
    site: "FW_test",
    profile: "DBG-X1000 20221124",
  },
  {
    status: "online",
    id: "5",
    type: "Gateway",
    device: "RCX1000",
    model: "DBG-X1000",
    connected: "2023/03/08 13:24",
    site: "Taipei",
    profile: "DBG-X1000 (RC)",
  },
];

const SetOnlineList = (props) => {
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
                <Icon className={"icon-round online"} />
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

const OnlineModal = (props) => {
  const { t } = useTranslation();
  const { modalStatus, changeModalStatus } = props;
  //console.log(props, modalStatus.online.status);

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
        openModal={modalStatus.online.status}
        closeModal={() => changeModalStatus("online", false)}
      >
        <div className="header">
          <div className="title">Online devices</div>
        </div>
        <div className="body">
          <SetOnlineList list={defaultList} t={t} sorting={sorting} />
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

export default OnlineModal;
