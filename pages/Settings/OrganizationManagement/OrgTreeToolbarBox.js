import mainStyle from './org-management.module.scss';

import { useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Components
import { ButtonGroup } from 'react-bootstrap';
import Button from '../../../components/Button';
import TooltipDialog from '../../../components/TooltipDialog';
import InlineTitle from '../../../components/InlineTitle';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';
import InputWithIconButton from 'components/InputWithIconButton';
import ButtonWithIcon from 'components/ButtonWithIcon';
import InputWithIcon from 'components/InputWithIcon';

const OrgTreeToolbarBox = props => {
  const { t } = useTranslation();
  const {
    changeModalStatus,
    isTreeView,
    setIsTreeView,
    seachValue,
    setSearchValue,
    setCollapseAll
  } = props;

  return (
    <>
      <div className={`d-flex justify-content-between ${mainStyle['toolbar-box-container']}`}>
        {/* left */}

        {/* Create organization */}
        <div>
          <ButtonGroup>

            {/* Expand */}
            <ButtonWithIcon
              label={t('b31fb8458b')}
              iconClassName='icon-expand'
              onClick={() => setCollapseAll(false)}
            ></ButtonWithIcon>

            {/* Collapse */}
            <ButtonWithIcon
              label={t('89f1157dd5')}
              iconClassName='icon-collapse'
              onClick={() => setCollapseAll(true)}
            ></ButtonWithIcon>

          </ButtonGroup>

          {/* Tree view */}
          <Button
            style={{marginLeft: '10px'}}
            label={t('0a5a55d93a')}
            disabled={isTreeView}
            onClick={() => {
              setIsTreeView(true);
              setSearchValue(null);
            }}
          ></Button>

        </div>

        {/* right */}
        <InlineTitle isNonUnderline>

          {/* Site tag / Site name */}
          <InputWithIcon
            type='Search'
            iconPosition='left'
            placeholder={t('2047ee55cc')}
            value={seachValue}
            onChange={e => {
              setIsTreeView(false);
              setSearchValue(e.target.value);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            iconClassName='icon-search'
            iconOnClick={() => {}}
          />

          {/* Create site */}
          <ButtonWithIcon
            label={t('fa111d766b')}
            iconClassName='icon-site'
            onClick={() => changeModalStatus('createSite', true)}
          ></ButtonWithIcon>

          {/* Create site tag */}
          <ButtonWithIcon
            label={t('cd5ff8bec4')}
            iconClassName='icon-tag'
            onClick={() => changeModalStatus('createSiteTag', true)}
          ></ButtonWithIcon>

        </InlineTitle>

      </div>
    </>
  );
};

export default OrgTreeToolbarBox;
