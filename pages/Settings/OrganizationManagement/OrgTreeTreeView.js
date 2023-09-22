import { useEffect, useState } from 'react';
import mainStyle from './org-management.module.scss';

// Components
import LinkerWithA from 'components/LinkerWithA';
import Icon from 'components/Icon';

const TagSiteNodeContainer = props => {
  const {
    label,
    orgLevel,
    isChildrenHide,
    children,
    onNameClick
  } = props;

  const [ isHide, setChildrenHide ] = useState(!!isChildrenHide);
  const hideCollapse = orgLevel === 'site' || !children ? 'd-none' : '';
  const iconClass = isHide ? 'icon-expand' : 'icon-collapse';
  const iconTagSite = orgLevel === 'site' ? 'icon-site' : 'icon-tag';

  useEffect(() => {
    setChildrenHide(isChildrenHide);
  }, [isChildrenHide])

  return (
      <div className={mainStyle['child-node-container']}>
      <div className={mainStyle['node']}>
        <div>
          <div className={mainStyle['tree-up-line']}></div>
          <div className={mainStyle['tree-down-line']}></div>
        </div>
        <Icon
          className={`${iconClass} ${hideCollapse}`}
          onClick={() => setChildrenHide(!isHide)}
        />
        <Icon className={`${iconTagSite} ${mainStyle['icon-tag-site']}`}/>
        <div className='ms-1'>
          <LinkerWithA
            label={label}
            href='#'
            className='fw-normal linker-blue linker-blue-hover text-decoration-none'
            onClick={e => {
              e.preventDefault();
              onNameClick();
            }}
          />
        </div>
      </div>
      {!isHide && children}
    </div>
  )
}

const OrgTreeTreeView = props => {
  const {
    isCollapseAll,
    changeModalStatus
  } = props;

  return(
    <div className={mainStyle['tree-view-container']}>

      {/* ORG */}
      <div className={mainStyle['org-node-container']}>
        <Icon className='icon-org me-2' />
        <LinkerWithA
          label='ORG-1'
          href='#'
          className='fw-normal text-decoration-underline linker-red-hover'
          onClick={e => {
            e.preventDefault();
            changeModalStatus('previewOrg', true);
          }}
        />
      </div>

      {/*  TAG + SITE */}
      <TagSiteNodeContainer
        label='TAG-1'
        orgLevel='tag'
        isChildrenHide={!!isCollapseAll}
        onNameClick={() => changeModalStatus('previewTag', true)}
      >
        <TagSiteNodeContainer
          label='SITE-11'
          orgLevel='site'
          onNameClick={() => changeModalStatus('previewSite', true)}
        />
        <TagSiteNodeContainer
          label='SITE-12'
          orgLevel='site'
          onNameClick={() => changeModalStatus('previewSite', true)}
        />
      </TagSiteNodeContainer>

      {/* Continuous TAG */}
      <TagSiteNodeContainer
        label='TAG-2'
        orgLevel='tag'
        isChildrenHide={!!isCollapseAll}
        onNameClick={() => changeModalStatus('previewTag', true)}
      >
        <TagSiteNodeContainer
          label='TAG-22'
          orgLevel='tag'
          onNameClick={() => changeModalStatus('previewTag', true)}
        >
          <TagSiteNodeContainer
            label='TAG-222'
            orgLevel='tag'
            onNameClick={() => changeModalStatus('previewTag', true)}
          />
        </TagSiteNodeContainer>
      </TagSiteNodeContainer>

      {/* Only one site */}
      <TagSiteNodeContainer
        label='SITE-99'
        orgLevel='site'
        onNameClick={() => changeModalStatus('previewSite', true)}
      />

    </div>
  )
}

export default OrgTreeTreeView;
