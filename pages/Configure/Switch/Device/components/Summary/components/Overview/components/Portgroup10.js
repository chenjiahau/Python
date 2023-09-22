import mainStyle from '../../../summary.module.scss';

const PortGroup10 = (props) => {
  const { ports } = props;
  console.log(ports);

  if (ports.length === 0) {
    return;
  }

  return (
    <>
      <div className={mainStyle['port-item']}>
        <div className={mainStyle['number']}>1</div>
        <div className={`${mainStyle['port']} ${mainStyle['link-1gbps']}`}></div>
      </div>
    </>

  )
}

export default PortGroup10;