import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

// function getRate() {
//   var webSocket = $.simpleWebSocket({ url: 'wss://apim-nibarras-dev.azure-api.net/kraken' });
//   webSocket.send({ "event": "subscribe", "pair": ["XBT/USD"], "subscription": { "name": "ticker" } }).done(function () {
//     // message send
//   }).fail(function (e) {
//     // error sending
//   });
//   //var webSocket = $.simpleWebSocket({ url: 'wss://ws.kraken.com/' });
//   webSocket.listen(function (message) {
//     if (!Array.isArray(message)) return;
//     var rate = message[1].c[0];
//     if (rate) return (rate);
//   })
// }

function App() {
  return (
    <Button variant="contained" color="primary">
      {getRate()}
    </Button>
  );
}

export default App;
