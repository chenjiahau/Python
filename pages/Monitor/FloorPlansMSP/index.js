import floorplansStyle from './floor-plans.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Table, ButtonGroup } from 'react-bootstrap';
import Breadcrumb from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import InlineTitle from '../../../components/InlineTitle';
import LinkerWithA from '../../../components/LinkerWithA';
import PaginationContainer from '../../../components/PaginationContainer';
import ButtonAction from '../../../components/ButtonAction';
import MessageBoxGroup from 'components/MessageBoxGroup';

import AddModal from './modals/AddModal';

const defaultPathList = [
  { label: '6ba872551f', isLink: false },
  { label: '52600791cd', isLink: false },
];
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};
const SetFloorList = (props) => {
  const tmpList = props.list;
  return (
    <tbody>
      {
        tmpList.map((item, index) => {
          return <tr key={item.id}>
            <td>{index + 1}</td>
            <td><a href="/cloud/monitor/floor-plans-edit">{item.name}</a></td>
            <td>{item.site}</td>
            <td>{item.ap}</td>
            <td>{item.switch}</td>
            <td>{item.gateway}</td>
            <td className='table-action-td'>
              <ButtonAction
                label={props.t('ce64bbe3ba')}
                title="DELETE"
                iconClassName="icon-trash"
                onClick={() => console.log('click delete')}
              />
            </td>
          </tr>
        })
      }
    </tbody>
  )
}

const FloorPlans = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState({ ...defaultMessages });
  const sorting = e => {
    console.log('sorting event')
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  }
  const [FloorPlanList, setFloorPlanList] = useState(
    [
      {
        id: '1', name: '2F floor map', site: 'Bill shop 1',
        ap: 3, switch: 2, gateway: 1
      },
      {
        id: '2', name: '1F floor map', site: 'Bill shop 2',
        ap: 3, switch: 2, gateway: 1
      },
      {
        id: '3', name: '3F floor map', site: 'Bill shop 3',
        ap: 3, switch: 2, gateway: 1
      }
    ]
  );
  const defaultModalStatus = {
    add: {
      status: false,
      disabled: false,
    }
  };
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });

  return (
    <div className='layout-container layout-container--column layout-container--fluid'>
      <Breadcrumb pathList={defaultPathList}>
      </Breadcrumb>
      <MessageBoxGroup
        messages={messages}
        changeMessages={setMessages}
        onClose={type => setMessages({ ...messages, [type]: null })}
      />
      <div className={floorplansStyle['add-btn']}>
        <InlineTitle isNonUnderline>
          <ButtonGroup>
            <Button
              label={t('2c5fc81151')}
              onClick={() => changeModalStatus('add', true)}
            ></Button>
          </ButtonGroup>
        </InlineTitle>
      </div>
      <Table responsive striped hover className='table-container'>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <LinkerWithA
                label={t('a3f6dd3a1d')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('a7d6475ec8')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('e9b8049bb0')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('bbc155fb2b')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('926dec9494')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th className={'table-action-th'}>{t('06df33001c')}</th>
          </tr>
        </thead>
        <SetFloorList list={FloorPlanList} setList={setFloorPlanList} changeModalStatus={changeModalStatus} t={t} />
      </Table>
      <div className='d-flex justify-content-end'>
        <PaginationContainer
          total={10}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />
      </div>
      {/* Edit modal */}
      <AddModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default FloorPlans;
