import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Component
import { Icon, LinkerWithA, PaginationContainer, ModalContainer } from "components";

const defaultList = [
  {
    status: "offline",
    id: "0",
    type: "Gateway",
    device: "1205_2000B1",
    model: "DBG-2000(B1)",
    connected: "2023/03/06 11:29",
    site: "Taipei",
    profile: "2000B1-20220727",
  },
  {
    status: "offline",
    id: "1",
    type: "Gateway",
    device: "CCTSENGDGX11",
    model: "DBG-X1000",
    connected: "2023/03/08 14:53",
    site: "DBG-X1000",
    profile: "1111x1000",
  },
  {
    status: "offline",
    id: "2",
    type: "Gateway",
    device: "1DBG-X1000-Lobby2",
    model: "DBG-X1000",
    connected: "2023/03/08 15:58",
    site: "Taipei",
    profile: "DBG-X1000",
  },
];

const SetOfflineList = (props) => {
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
                <Icon className={"icon-round offline"} />
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

const OfflineModal = (props) => {
  const { t } = useTranslation();
  const { modalStatus, changeModalStatus } = props;
  //console.log(props, modalStatus.offline.status);

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
        openModal={modalStatus.offline.status}
        closeModal={() => changeModalStatus("offline", false)}
      >
        <div className="header">
          <div className="title">Offline devices</div>
        </div>
        <div className="body">
          <SetOfflineList list={defaultList} t={t} sorting={sorting} />
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

export default OfflineModal;
