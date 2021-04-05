import React, { useState, /*useEffect*/ } from 'react';
import FormCreator from "./FormCreator";
import { AGENT_FIELDS, COLOR_FIELDS, cssCustomizableFields } from "./formConstants";
import { resetHistory, setCareBotSession } from './carebotService';
import CareBot from './CareBot';
import { Button } from 'antd';

let cssPresetValues = cssCustomizableFields.map(field => ({
  [field.propertyName]: field.initialValue
}));

cssPresetValues = Object.assign({}, ...cssPresetValues);

const App = props => {
  const [dmConfigs, setDmConfigs] = useState({});
  const [cssValues, setCSSValues] = useState(cssPresetValues);

  // useEffect(() => {
  // add test configs to auto-load Dialogflow Messenger
  // testConfigs = { 'agent-id', 'language-code'}
  //   genCareBotSession();
  //   setDmConfigs(testConfigs); 
  // }, []);

  const genCareBotSession = sessionId => {
    const careBotSession = { sessionId: 'auto-generated', history: [] };

    if (sessionId) careBotSession.sessionId = sessionId;

    setCareBotSession(careBotSession);
  }

  const agentHandleStart = form => {
    form.validateFieldsAndScroll(err => {
      if (err) return;
      const newDmConfigs = form.getFieldsValue();

      const invalidValues = Object.keys(newDmConfigs).filter(k => {
        return typeof newDmConfigs[k] !== 'boolean' && !newDmConfigs[k];
      });
      invalidValues.forEach(v => delete newDmConfigs[v]);

      genCareBotSession(newDmConfigs['session-id']);

      setDmConfigs({ ...newDmConfigs });
    });
  };

  return <div className="App">
    {
      !Object.keys(dmConfigs).length ?
        <FormCreator
          fields={AGENT_FIELDS}
          handleButton={agentHandleStart}
          buttonText='Start'
        />
        :
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <div style={{ marginBottom: 5 }}>
                <label style={{ marginRight: 5 }}>Event listener output (descending order)</label>
                <Button size='small' onClick={resetHistory}>Reset History</Button>
              </div>
              <ul id='df-event-listener-output'></ul>
            </div>
          </div>
          <div>
            <label style={{ marginRight: 5 }}>CSS customization</label>
          </div>
          <label></label>
          <div style={{ display: 'flex' }}>
            <div id='css-customization-container'>
              <FormCreator
                fields={COLOR_FIELDS}
                onValuesChange={setCSSValues}
              />
            </div>
            <div id='css-customization-values'>
              {
                Object.keys(cssValues).map(key => {
                  const value = cssValues[key];
                  return <div key={key} className='css-customization-value'>
                    {key}: {value}
                  </div>
                })
              }
            </div>
          </div>
          <CareBot dmConfigs={dmConfigs} />
        </div>
    }
  </div>;
}

export default App;