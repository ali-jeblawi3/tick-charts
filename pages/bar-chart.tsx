import React, { useEffect, useState } from 'react';
import BarChart from '../components/charts/bar-chart';
import { useRouter } from 'next/router';

export function getData() {
	const promiseBarData = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/barData.json")
		.then(response => response.json());
	return promiseBarData;
}

export default function BarChartPage() {
    const [data, setData] = useState<any>(null);
	const { query } = useRouter();
    const { lang, theme, heigth } = query;
    useEffect(() => {
        getData().then(data => {
            setData(data);
        });
        
    }, []);
    if (data === null) {
        return <div><h2>Loading...</h2></div>
    }
    return (
        <div style={{
            display: 'flex', alignItems: 'center',
            background:theme==='dark' ? '#1f1f1f':'#fff',
            justifyContent: 'center'
        }}>
            <BarChart type={"svg"} data={data} />
        </div>
    );
}
