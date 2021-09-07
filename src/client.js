import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const WebSocket = require('isomorphic-ws');

var ws = new WebSocket('wss://apim-nibarras-dev.azure-api.net/kraken');
ws.onopen = function open() {
  console.log('connected to ' + ws.url);
  ws.send('{ "event": "subscribe", "pair": ["XBT/USD"], "subscription": { "name": "ticker" } }');
};
ws.onclose = function close() {
  console.log('disconnected');
};

const App = ({ }) => {
  const [tick, setTick] = useState([]);
  useEffect(() => {
    ws.onmessage = function incoming(message) {
      const parsedData = JSON.parse(message.data)
      if (!Array.isArray(parsedData)) return;
      setTick(currentTick => [...currentTick, { xbt: Number(parsedData[1].c[0]), time: Date.now() }]);
    };
  }, [])
  return (
    <div>
      <h1>Real Time XBT/USD exchange rate</h1>
      <LineChart width={1000} height={300} data={tick}>
        <Line type="monotone" dataKey="xbt" stroke="#8884d8" dot={false} />
        <CartesianGrid stroke="#ccc" />
        <XAxis hide="true" dataKey="time" interval="preserveEnd" domain={['0', '500']} />
        <YAxis type="number" domain={['dataMin', 'dataMax']} />
      </LineChart>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));