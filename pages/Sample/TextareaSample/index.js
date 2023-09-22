import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Textarea from "components/Textarea";

const defaultValues = {
  textarea1: 'This is Textarea 1',
  textarea2: 'This is Textarea 2',
  textarea3: 'This is Textarea 3',
}

const TextareaSample = () => {
  const [ values, setValues ] = useState({...defaultValues});
  const { t } = useTranslation();

  return (
    <Row className='mb-5'>
      <Col>
        <h3>Textarea</h3>
        <Textarea
          style={{height: 100}}
          className='clas-a class-b'
          value={values.textarea1}
          placeholder={t('0c55b5f5f0')} // 8-63 characters
          onChange={e => setValues({...values, textarea1: e.target.value})}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </Col>
      <Col>
        <h3>Textarea - isInvalid</h3>
        <Textarea
          style={{height: 100}}
          className='clas-a class-b'
          value={values.textarea2}
          placeholder={t('0c55b5f5f0')} // 8-63 characters
          isInvalid={true}
          onChange={e => setValues({...values, textarea2: e.target.value})}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </Col>
      <Col>
        <h3>Textarea - disabled</h3>
        <Textarea
          style={{height: 100}}
          className='clas-a class-b'
          value={values.textarea3}
          placeholder={t('0c55b5f5f0')} // 8-63 characters
          disabled
        />
      </Col>
    </Row>
  )
};

export default TextareaSample;
