
import React from "react";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	AreaSeries,
} from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { hexToRGBA, last } from "react-stockcharts/lib/utils";
import { createVerticalLinearGradient } from "react-stockcharts/lib/utils";

const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

const AreaChart = (props) => {
	const { type, data: initialData, width, ratio } = props;

	const xScaleProvider = discontinuousTimeScaleProvider
		.inputDateAccessor(d => d.date);
	const {
		data,
		xScale,
		xAccessor,
		displayXAccessor,
	} = xScaleProvider(initialData);

	const start = xAccessor(last(data));
	const end = xAccessor(data[Math.max(0, data.length - 150)]);
	const xExtents = [start, end];
	return (
		<ChartCanvas height={375}
			ratio={100}
			width={width}
			margin={{ left: 45, right: 50, top: 20, bottom: 30 }}
			type={type}
			seriesName="MSFT"
			data={data}
			xScale={xScale}
			xAccessor={xAccessor}
			displayXAccessor={displayXAccessor}
			xExtents={xExtents}
		>
			<Chart id={1}
				yExtents={d => [d.high, d.low]}
			>
				<defs>
					<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
						<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
						<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
						<stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
					</linearGradient>
				</defs>
				<XAxis axisAt="bottom" orient="bottom" />
				<YAxis axisAt="right" orient="right" ticks={6} />

				<MouseCoordinateX
					at="bottom"
					orient="bottom"
					displayFormat={timeFormat("%Y-%m-%d")} />
				<MouseCoordinateY
					at="right"
					orient="right"
					displayFormat={format(".2f")} />

				<AreaSeries
					yAccessor={d => d.close}
					canvasGradient={canvasGradient}
					fill="url(#MyGradient)"

				/>

				<SingleValueTooltip
					xLabel="Date" /* xLabel is optional, absence will not show the x value */
					yLabel="C"
					yAccessor={d => d.close}
					xDisplayFormat={timeFormat("%Y-%m-%d")} yDisplayFormat={format(".2f")}
					/* valueStroke="green" - optional prop */
					/* labelStroke="#4682B4" - optional prop */
					origin={[-40, 0]} />
				<SingleValueTooltip
					yLabel="Volume" yAccessor={(d) => d.volume}
					origin={[-40, 20]} />
			</Chart>
			<CrossHairCursor />
		</ChartCanvas>
	);
	
}



export default fitWidth(AreaChart);
