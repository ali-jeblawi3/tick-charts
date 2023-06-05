import React, { useEffect, useState } from 'react';
import Kagi from '../components/charts/kagi-chart';
import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse:any) {
	return function(d:any) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

export default function KagiChartPage() {
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
            <Kagi type={"svg"} data={data} />
            
        </div>
    );
}
