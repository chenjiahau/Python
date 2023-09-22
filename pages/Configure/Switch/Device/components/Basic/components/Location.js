import { useEffect } from 'react';

// Component
import InlineTitle from 'components/InlineTitle';

const Location = () => {
  return (
    <div>
      <InlineTitle label='LOCATION' />
      <iframe
        title=""
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14456.563659090712!2d121.55678746977537!3d25.06321260000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1534997698701"
        style={{ width: '100%', height: '340px', border: '0' }}
        allowFullScreen
      />
    </div >
  );
}

export default Location;