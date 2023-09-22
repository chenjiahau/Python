import mainStyle from '../../config.module.scss';

import { useState } from 'react';
import ReactDOMServer from 'react-dom/server';

// Component
import { InlineTitle, TooltipDialog } from 'components/';

const Func = (props) => {
  const { title, htmlTooltip, last, placement, children } = props;

  return (
    <div className={`${mainStyle['func-block']} ${last ? mainStyle['func-block--last'] : ''}`} >
      <InlineTitle label={title} style={htmlTooltip && { justifyContent: 'flex-start' }}>
        {
          htmlTooltip && (
            <div style={{ marginLeft: '10px' }} >
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(htmlTooltip)}
                placement={placement}
              />
            </div>
          )
        }
      </InlineTitle>
      <div className={mainStyle['content-block']}>
        {children}
      </div>
    </div >
  )
}

export default Func;