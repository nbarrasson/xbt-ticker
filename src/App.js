import './App.css';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect, useRef } from 'react';
const WebSocket = require('isomorphic-ws');

function App() {
  const [rate, setRate] = useState([0]);
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket('wss://apim-nibarras-dev.azure-api.net/kraken');
    ws.current.onopen = function open() {
      console.log('connected');
      ws.current.send('{ "event": "subscribe", "pair": ["XBT/USD"], "subscription": { "name": "ticker" } }');
    };
    ws.current.onclose = function close() {
      console.log('disconnected');
    };
    ws.current.onmessage = function incoming(message) {
      const parsedData = JSON.parse(message.data)
      // console.log(parsedData);
      if (!Array.isArray(parsedData)) return;
      setRate([...rate, parsedData[1].c[0]]);
    };
  }, [])

  return (
    <Button variant="contained" color="primary">
      {rate[rate.length - 1]}
    </Button>
  );
}

export default App;
