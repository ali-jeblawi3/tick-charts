
import React, { useRef, useState } from "react";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import PropTypes from "prop-types";

import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import {
	BarSeries,
	CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const CandleStickChartWithZoomPan = (props) => {
	const [state, setState] = useState({
		suffix: 1
	});
	const saveNode = useRef(null);
	
	// constructor(props) {
	// 	super(props);
	// 	this.saveNode = this.saveNode.bind(this);
	// 	this.resetYDomain = this.resetYDomain.bind(this);
	// 	this.handleReset = this.handleReset.bind(this);
	// }

	
	const resetYDomain=()=> {
		;// this.node.resetYDomain();
	}
	const handleReset=()=> {
		setState({
			suffix: state.suffix + 1
		});
	}
		const { type, width, ratio } = props;
		const { mouseMoveEvent, panEvent, zoomEvent, zoomAnchor } = props;
		const { clamp } = props;

		const { data: initialData } = props;

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

		const margin = { left: 70, right: 70, top: 20, bottom: 30 };

		const height = 400;

		const gridHeight = height - margin.top - margin.bottom;
		const gridWidth = width - margin.left - margin.right;

		const showGrid = true;
		const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
		const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

		return (
			<ChartCanvas ref={saveNode} height={height}
				ratio={100}
				width={width}
				margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
				mouseMoveEvent={mouseMoveEvent}
				panEvent={panEvent}
				zoomEvent={zoomEvent}
				clamp={clamp}
				zoomAnchor={zoomAnchor}
				type={type}
				seriesName={`MSFT_${state.suffix}`}
				data={data}
				xScale={xScale}
				xExtents={xExtents}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
			>

				<Chart id={1}
					yExtents={d => [d.high, d.low]}
				>
					<XAxis axisAt="bottom"
						orient="bottom"
						zoomEnabled={zoomEvent}
						{...xGrid} />
					<YAxis axisAt="right"
						orient="right"
						ticks={5}
						zoomEnabled={zoomEvent}
						{...yGrid}
					/>

					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<CandlestickSeries />
					<OHLCTooltip origin={[-40, 0]}/>
					<ZoomButtons
						onReset={handleReset}
						
					/>
				</Chart>
				<Chart id={2}
					yExtents={d => d.volume}
					height={150} origin={(w, h) => [0, h - 150]}
				>
					<YAxis
						axisAt="left"
						orient="left"
						ticks={5}
						tickFormat={format(".2s")}
						zoomEnabled={zoomEvent}
					/>

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "#FF0000"} />
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	
}

CandleStickChartWithZoomPan.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithZoomPan.defaultProps = {
	type: "svg",
};
export default fitWidth(CandleStickChartWithZoomPan);
