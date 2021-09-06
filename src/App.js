import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis
} from 'recharts';

const WebSocket = require('isomorphic-ws');

const App = ({ }) => {
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
      if (!Array.isArray(parsedData)) return;
      setRate(currentRate => [...currentRate, parsedData[1].c[0]]);
    };
  }, [])

  return (
    <div>
      <h1>Real Time XBT</h1>
      <LineChart width={500} height={300} data={rate}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));