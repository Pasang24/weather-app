import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./LineChart.css";

function LineChart({ data, options }) {
  return (
    <div className="three-day-forecast">
      <Line
        data={data}
        options={options}
        style={{ background: "rgb(41, 40, 40)", borderRadius: "10px" }}
      />
    </div>
  );
}

export default LineChart;
