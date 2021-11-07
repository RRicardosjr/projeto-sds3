
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/request";

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    
    // Declaracao de chartData de forma sincrona
    //let chartData: ChartData = { labels: [], series: [] };
    // Carga de chartData de forma sincrona
    //chartData = { labels: myLabels, series: mySeries };

    // Carga considerando a renderização de tela e controle de estado

    // Este comando mantem o estado da constante no processo assincrono
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(BASE_URL + '/sales/amount-by-seller')
            .then((response) => {
                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);

                // Carga de chartData de forma assincrona
                setChartData({ labels: myLabels, series: mySeries });
            });
    },[]);


    const options = {
        legend: {
            show: true
        }
    }


    return (<Chart
        options={{ ...options, labels: chartData.labels }}
        series={chartData.series}
        type="donut"
        height="240"
    />);
}

export default DonutChart;