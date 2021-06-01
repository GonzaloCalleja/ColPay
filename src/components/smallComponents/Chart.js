import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import { Typography} from '@material-ui/core'
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData(1, 0),
  createData(3, 300),
  createData(6, 600),
  createData(9, 800),
  createData(12, 1500),
  createData(15, 2000),
  createData(18, 2400),
  createData(24, 2400),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Contracts Fulfilled over the Past Week
    </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis stroke={theme.palette.text.secondary} >

            </XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Transactions (Eth)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}