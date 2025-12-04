import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('PDFViewer', () => App);
AppRegistry.runApplication('PDFViewer', {
  rootTag: document.getElementById('root'),
});