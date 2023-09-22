import Icon from "components/Icon";

const IconSample = () => {
  return (
    <div className="mb-5">
      <h3>Icon</h3>
      <Icon
        iconTitle="Show password"
        className="icon-open-eye"
        onClick={() => {}}
      />
      <br />
      <Icon className={'icon-round online'} />
      <br />
      <Icon className={'icon-round offline'} />
      <br />
      <Icon className={'icon-round dormant'} />
    </div>
  )
};

export default IconSample;
