// Package
import { useEffect, useState, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";

// Components
import ModalContainer from '../../../components/ModalContainer';
import Button from '../../../components/Button';

const defaultSlickSettings = {
  dots: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 1000,
  easing: 'linear',
  infinite: true,
  slidesToShow: 1,
  pauseOnHover: true,
  centerMode: true,
  adaptiveHeight: true,
  centerPadding: '0',
};

const defaultWhatsNewsList = [
  {
    applyId: 1,
    content: "<html>\n<head>\n\t<title></title>\n</head>\n<body>\n<div>Weclcome to Nuclias page 1</div>\n\n<div>&nbsp;</div>\n\n<p><img alt=\"\" src=\"img/v2/whats_new_1.png\" style=\"width: 300px;\" /></p>\n</body>\n</html>\n",
    id: 11,
    title: "Weclcome to Nuclias page 1",
    updatedAt: null,
  },
  {
    applyId: 2,
    content: "<html>\n<head>\n\t<title></title>\n</head>\n<body>\n<div>Weclcome to Nuclias page 2</div>\n\n<div>&nbsp;</div>\n\n<p><img alt=\"\" src=\"img/v2/whats_new_2.png\" style=\"width: 300px;\" /></p>\n</body>\n</html>\n",
    id: 22,
    title: "Weclcome to Nuclias page 2",
    updatedAt: null,
  },
  {
    applyId: 3,
    content: "<html>\n<head>\n\t<title></title>\n</head>\n<body>\n<div>Weclcome to Nuclias page 3</div>\n</body>\n</html>\n",
    id: 33,
    title: "Weclcome to Nuclias page 3",
    updatedAt: null,
  }
]


const WhatsNewsModal = ({
  modalStatus,
  changeModalStatus
}) => {
  const { t } = useTranslation();

  return (
    <div className='whats-news-modal'>
      <ModalContainer
        modalWidthType="modal-700px"
        openModal={modalStatus.whatsNews.status}
        closeModal={() => changeModalStatus('whatsNews', false)}
      >
        <div className='body'>
          <Slider {...defaultSlickSettings}>
            {
              defaultWhatsNewsList.map((newsItem, index) => (
                <div key={index}>
                  <strong className='form-title'>{newsItem.title}</strong>
                  <div
                    key={'whats-news-content-' + newsItem.id}
                    dangerouslySetInnerHTML={{ __html: newsItem.content }}
                  />
                </div>
              ))
            }
          </Slider>
        </div>
        <div className="footer non-border-top-footer">
          <Button
            label={t('b3a494301a')}
            className="btn-submit"
            onClick={() => {
              changeModalStatus('whatsNews', false);
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default WhatsNewsModal;
