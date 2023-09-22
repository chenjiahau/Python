import TooltipDialog from "components/TooltipDialog";

const TooltipDialogSample = () => {
  return (
    <div className='mb-5'>
      <h3>TooltipDialog</h3>
      <TooltipDialog
        className="ms-1 me-1"
        placement="right"
        title={`
          <div class="pb-1">123</div>
          <div>456</div>
        `}
        // hideIcon={false}
        // tooltipsTitle={'test'}
      />
      <br />
      <br />
      <TooltipDialog
        className="ms-1 me-1"
        placement="right"
        title={`
          <div class="pb-1">123</div>
          <div>456</div>
        `}
        hideIcon={true}
        tooltipsTitle={'Custom tooltips'}
      />
    </div>
  )
};

export default TooltipDialogSample;
