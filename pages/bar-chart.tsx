import React, { useEffect, useState } from 'react';
import BarChart from '../components/charts/bar-chart';

export function getData() {
	const promiseBarData = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/barData.json")
		.then(response => response.json());
	return promiseBarData;
}

export default function BarChartPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getData().then(data => {
            setData(data);
        });
        
    }, []);
    if (data === null) {
        return <div><h2>Loading...</h2></div>
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <BarChart type={"svg"} data={data} /> */}
        </div>
    );
}
