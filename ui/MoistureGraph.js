import React, { PureComponent } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";

export default class MoistureGraph extends PureComponent {
  render() {
    return (
      <ResponsiveContainer>
        <LineChart data={this.props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis scale='time' interval={'equidistantPreserveStart'} 
        dataKey="timestamp" padding={{ left: 30, right: 30 }} 
        tickFormatter={(value) => {
            return new Date(value).toLocaleString('en-US');
        }} 
      />
      <YAxis domain={[0,100]} />
      <Tooltip formatter={(value) => [`${value}%`, "Moisture"]}
      labelFormatter={(value) => {
        return new Date(value).toLocaleString('en-US');
      }}
      position={{y: 235}} 
      />
      <Legend />
      <ReferenceLine y={this.props.maxSafeMoisture} stroke="red" label={{value: "Too wet", position: "top"}} />
      <Line name={"Moisture"} type="monotone" dataKey="moisture" stroke="#5fc75b" dot={false} strokeWidth={5} />
      <ReferenceLine y={this.props.minSafeMoisture} stroke="red" label={{value: "Too dry", position: "bottom"}} />
    </LineChart>
      </ResponsiveContainer>
    );
  }
}