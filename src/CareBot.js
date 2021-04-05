import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogFlowService from './carebotService';

let MyDialogFlowService = null;

const CareBot = props => {
  const { dmConfigs } = props;

  useEffect(() => {
    const dfMessenger = document.querySelector('df-messenger');
    if (dfMessenger && !MyDialogFlowService) {
      MyDialogFlowService = new DialogFlowService(dfMessenger);
    }
  }, [document.querySelector('df-messenger')]);


  if (!Object.keys(dmConfigs).length) return 'Dialogflow Messenger configs not found!';

  return <df-messenger {...dmConfigs}></df-messenger>;
}

CareBot.propTypes = {
  dmConfigs: PropTypes.shape({
    'agent-id': PropTypes.string.isRequired,
    'language-code': PropTypes.string.isRequired
  })
};

export default CareBot;