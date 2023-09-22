import walledgardenStyle from './walled-garden.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';

import { useTranslation } from 'react-i18next';

import { Table, ButtonGroup } from 'react-bootstrap';
import Breadcrumb from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import InlineTitle from '../../../components/InlineTitle';
import LinkerWithA from '../../../components/LinkerWithA';
import PaginationContainer from '../../../components/PaginationContainer';
import InputWithIcon from '../../../components/InputWithIcon';
import ButtonAction from '../../../components/ButtonAction';
import EditableNameBox from "../../../components/EditableNameBox";
import TooltipDialogFixed from '../../../components/TooltipDialogFixed';
import ReactDOMServer from 'react-dom/server';
import MessageBoxGroup from 'components/MessageBoxGroup';

import EditModal from './modals/EditModal';
import AddModal from './modals/AddModal';

const defaultPathList = [
  { label: 'f1206f9fad', isLink: false },
  { label: 'bf56b84e69', isLink: false },
];
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const tooltipSampleData = (entriesContent, t) => {
  let tmpContent = entriesContent;
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>{t('244d1ce297')}</th>
        </tr>
      </thead>
      <tbody>
        {tmpContent.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.range}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const SetWGList = (props) => {
  const [tmpList, setTmpList] = useState(props.list);
  function updateName(item, val) {
    if (val === '') {
      setTmpList(props.list);
    } else {
      let editItem = { id: item.id, name: val, entries: item.entries, entriesContent: item.entriesContent };
      let updateItem = props.list.map((element) => {
        if (element.id === editItem.id)
          return editItem;
        else return element;
      });
      setTmpList(updateItem);
    }
  };
  function updateList() {
    props.setList(tmpList);
  }

  return (
    <tbody>
      {
        tmpList.map((item, index) => {
          return <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
              <EditableNameBox
                value={item.name}
                onClickCancelIcon={() => updateName(item, '')}
                inputFieldOnChange={e => updateName(item, e.target.value)}
                inputFieldOnKeyDown={e => updateList()}
              // inputFieldOnClick={() => console.log('input click')}
              />
            </td>
            <td>
              <TooltipDialogFixed
                placement="right"
                hideIcon={true}
                tooltipsTitle={item.entries}
                title={ReactDOMServer.renderToString(tooltipSampleData(item.entriesContent, props.t))}
              />
            </td>
            <td className={'table-action-td'}>
              <ButtonAction
                label={props.t('7e77616685')}
                title="EDIT"
                iconClassName="icon-edit"
                onClick={() => props.changeModalStatus('edit', true)}
              />
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

const WalledGarden = () => {
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

  const [WallesGardenList, setWallesGardenList] = useState(
    [
      {
        id: '1', name: '7-11', entries: 6,
        entriesContent: [
          { id: 0, range: '192.168.1.100/32' },
          { id: 1, range: '10.90.0.0/16' },
          { id: 2, range: '10.0.0.0/8' },
          { id: 3, range: 'www.google.com' },
          { id: 4, range: '*.googleapis.com' },
          { id: 5, range: '172.168.0.0/16' }
        ]
      },
      {
        id: '2', name: 'OKMart', entries: 4,
        entriesContent: [
          { id: 0, range: '192.168.1.101/32' },
          { id: 1, range: '10.90.0.0/16' },
          { id: 2, range: '10.0.0.0/8' },
          { id: 4, range: 'tw.yahoo.com' }
        ]
      }
    ]
  );

  const defaultModalStatus = {
    edit: {
      status: false,
      disabled: false,
    },
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
      <div className='d-flex justify-content-between'>
        <ButtonGroup>
          <Button
            label={t('14df9b075b')}
            onClick={() => changeModalStatus('add', true)}
          ></Button>
        </ButtonGroup>
        <InlineTitle isNonUnderline>
          <InputWithIcon
            type="search"
            placeholder={t('13348442cc')}
            iconPosition="left"
            iconClassName="icon-search"
            onChange={e => {
              console.log(e.target.value);
            }}
          />
        </InlineTitle>
      </div>
      <Table responsive striped hover className='table-container'>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <LinkerWithA
                label={t('49ee308734')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('d94d0d430e')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th className={'table-action-th'}>{t('06df33001c')}</th>
          </tr>
        </thead>
        <SetWGList list={WallesGardenList} setList={setWallesGardenList} changeModalStatus={changeModalStatus} t={t} />
      </Table>
      <div className='d-flex justify-content-end'>
        <PaginationContainer
          total={10}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />
      </div>

      {/* Edit modal */}
      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
      <AddModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default WalledGarden;
