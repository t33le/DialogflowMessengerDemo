import { eventListeners } from "./eventListeners";

export const CAREBOT_SESSION_KEY = 'carebot-session';

export const getCareBotSession = () => JSON.parse(sessionStorage.getItem(CAREBOT_SESSION_KEY));

export const setCareBotSession = session => sessionStorage.setItem(CAREBOT_SESSION_KEY, JSON.stringify(session));

export const resetHistory = () => {
  const newSession = { ...getCareBotSession(), history: [] };
  setCareBotSession(newSession);
  updateHistoryOutputDisplay(newSession);
};

const updateHistoryOutputDisplay = careBotSession => {
  const historyOutputRef = document.getElementById('df-event-listener-output');
  historyOutputRef.innerHTML = '';
  careBotSession.history.reverse().forEach((event, index) => {
    const { timeStamp = 0, actionText, detail } = event;
    const childNode = document.createElement('li', { key: index });
    childNode.innerHTML = `
      <div style='margin-right:5px'>
        timeStamp: ${timeStamp.toFixed(2)}, &nbsp;
        action: ${actionText}
      </div>
      <div>detail: ${JSON.stringify(detail)}</div>
    `;
    historyOutputRef.appendChild(childNode);
  });
}

export const setColor = (propertyName, color) => {
  const dfMessenger = document.querySelector('df-messenger');
  dfMessenger.style.setProperty(propertyName, color);
}

export default class DialogFlowService {
  constructor(dfMessenger) {
    this.careBotSession = getCareBotSession();
    updateHistoryOutputDisplay(this.careBotSession);

    eventListeners.forEach(evl => {
      dfMessenger.addEventListener(evl, e => {
        const { timeStamp, detail } = e;
        this.setCarebotHistory({ timeStamp, actionText: evl, detail });
      })
    })

    // const getCSSProp = (elt, propertyName) => getComputedStyle(elt).getPropertyValue(propertyName);

    // dfMessenger.addEventListener('df-accordion-clicked', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-accordion-clicked', detail: event.detail });
    // });
    // dfMessenger.addEventListener('df-button-clicked', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-button-clicked', detail: event.detail });
    // });
    // dfMessenger.addEventListener('df-chip-clicked', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-chip-clicked', detail: event.detail });
    // });
    // dfMessenger.addEventListener('df-info-card-clicked', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-info-card-clicked', detail: event.detail });
    // });
    // dfMessenger.addEventListener('df-list-element-clicked', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-list-element-clicked', detail: event.detail });
    // });
    // dfMessenger.addEventListener('df-messenger-error', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-messenger-error', detail: event.detail });
    // });
    // dfMessenger.addEventListener('df-messenger-loaded', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-messenger-loaded', detail: event.detail });
    // });
    // dfMessenger.addEventListener('df-response-received', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-response-received', detail: event.detail });
    // });
    // dfMessenger.addEventListener('df-user-input-entered', function (event) {
    //   this.setCarebotHistory({ actionText: 'df-user-input-entered', detail: event.detail });
    // });
  }

  setCarebotHistory = event => {
    const history = [...this.careBotSession.history];
    history.push(event);
    this.careBotSession.history = history;
    setCareBotSession(this.careBotSession);
    updateHistoryOutputDisplay(this.careBotSession);
  }
}