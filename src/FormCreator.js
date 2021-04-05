import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

const FormCreator = (props) => {
  const { form, fields = [], handleButton, buttonText } = props;

  return <div>
    {
      fields.map((field) => {
        const {
          key, extra,
          Component = Input, componentProps = {},
          ...fieldOptions
        } = field;

        return <Form.Item key={key} label={key} colon={false} extra={extra}>
          {
            form.getFieldDecorator(key, fieldOptions)(<Component {...componentProps} />)
          }
        </Form.Item>;
      })
    }
    {
      handleButton && fields.length &&
      <Button
        type='primary'
        onClick={() => handleButton(form)}
      >
        {buttonText}
      </Button>
    }
  </div>
};

FormCreator.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    rules: PropTypes.array,
    initialValue: PropTypes.string,
  })),
  onValuesChange: PropTypes.func,
  handleButton: PropTypes.func,
  buttonText: PropTypes.string,
};

export default Form.create({
  onValuesChange: props => {
    const { form, onValuesChange } = props;
    if (onValuesChange) {
      onValuesChange(form.getFieldsValue());
    }
  }
})(FormCreator);
