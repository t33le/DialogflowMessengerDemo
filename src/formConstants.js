import { Checkbox } from "antd";
import { setColor } from './carebotService';

const optional = { placeholder: 'Optional' };

export const AGENT_FIELDS = [
  {
    key: 'agent-id', rules: [{ required: true }],
    extra: `Agent ID associated with the Dialogflow agent. This is prepopulated with your agent ID.`
  },
  {
    key: 'language-code', rules: [{ required: true }], initialValue: 'en',
    extra: `Default language code for the first intent. This is prepopulated with the agent's default language.`
  },
  {
    key: 'session-id', componentProps: optional,
    extra: `A session ID. If this is not supplied, the integration will generate a unique ID for each chat dialog.`
  },
  {
    key: 'user-id', componentProps: optional,
    extra: `Can be used to track a user across sessions. The value is passed to Dialogflow through the queryParams.payload field.`
  },
  {
    key: 'chat-title', componentProps: optional,
    extra: `Title displayed at the top of the chat dialog. This is prepopulated with your agent's name.`
  },
  {
    key: 'chat-icon', componentProps: optional,
    extra: `Icon used for the chat dialog open button. The Dialogflow icon is the default. This field must be a public URL. The icon size should be 36px by 36px.`
  },
  {
    key: 'intent', initialValue: 'WELCOME',
    extra: `The event used to trigger the first intent when the chat dialog is opened. This is prepopulated with the WELCOME event.`
  },
  {
    key: 'expand', valuePropName: 'checked', Component: Checkbox,
    extra: `Boolean attribute that sets the chat dialog to be open when the page loads. By default, the chat dialog is closed when the page loads.`
  },
  {
    key: 'wait-open', valuePropName: 'checked', Component: Checkbox,
    extra: `Boolean attribute that delays the welcome event until the dialog is actually opened.`
  },
];

export const cssCustomizableFields = [
  {
    propertyName: '--df-messenger-bot-message',
    initialValue: '#ffffff',
    extra: `Bubble background color for agent messages.`
  },
  {
    propertyName: '--df-messenger-button-titlebar-color',
    initialValue: '#42a5f5',
    extra: `Color for the floating button and the titlebar of the chat dialog.`
  },
  {
    propertyName: '--df-messenger-button-titlebar-font-color',
    initialValue: '#ffffff',
    extra: `Color for the chat dialog background.`
  },
  {
    propertyName: '--df-messenger-chat-background-color',
    initialValue: '#fafafa',
    extra: `Color for the chat dialog background.`
  },
  {
    propertyName: '--df-messenger-chip-border-color',
    initialValue: '#e0e0e0a',
    extra: `Color for the chat dialog background.`
  },
  {
    propertyName: '--df-messenger-chip-color',
    initialValue: '#ffffff',
    extra: `Color for the chat dialog background.`
  },
  {
    propertyName: '--df-messenger-font-color',
    initialValue: 'rgba(0,0,0,0.87)',
    extra: `Font color for messages.`
  },
  {
    propertyName: '--df-messenger-input-box-color',
    initialValue: '#ffffff',
    extra: `Background color for the text input box.`
  },
  {
    propertyName: '--df-messenger-input-font-color',
    initialValue: 'rgba(0,0,0,0.87)',
    extra: `Font color for the text input box.`
  },
  {
    propertyName: '--df-messenger-input-placeholder-font-color',
    initialValue: '#757575',
    extra: `Font color for placeholder text in text input box.`
  },
  {
    propertyName: '--df-messenger-minimized-chat-close-icon-color',
    initialValue: 'rgba(0,0,0,0.87)',
    extra: `Color of the close icon in the closed chat view.`
  },
  {
    propertyName: '--df-messenger-send-icon',
    initialValue: '#42a5f5',
    extra: `Color of the send icon in the text input box.`
  },
  {
    propertyName: '--df-messenger-user-message',
    initialValue: '#dddddd',
    extra: `Bubble background color for user messages.`
  },
];

export const COLOR_FIELDS = cssCustomizableFields.map(field => {
  const { propertyName, initialValue, extra } = field;
  return {
    key: propertyName,
    extra,
    initialValue,
    componentProps: { type: 'color', onChange: e => setColor(propertyName, e.target.value) }
  };
});

