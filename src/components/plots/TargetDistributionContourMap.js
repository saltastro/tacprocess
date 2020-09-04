import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { contourDensity as d3ContourDensity } from 'd3-contour'
import { interpolateOrRd } from 'd3-scale-chromatic'
/**
 * A component containing a contour map of the target distribution density. D3's contourDensity is used to
 * convert the target positions into a density.
 *
 * The following properties can be passed to this component.
 *
 * width: The width of the chart, including margins, in pixels. (optional)
 * height: The height of the chart, including margins, in pixels. (optional)
 * margin: The margin around the chart, with properties "top", "bottom", "left" and "right". (optional)
 * targets: The list of targets. Each target must have a property "ra" (with the right ascension in degrees)
 *          and a property "dec" (with the declination in degrees).
 *
 * The code is based on Mike Bostock’s Block 7f5f22524bd1d824dd53c535eda0187f,
 * https://bl.ocks.org/mbostock/7f5f22524bd1d824dd53c535eda0187f.
 */
class TargetDistributionContourMap extends React.Component {
  componentDidMount() {
	  this.updatePlot()
  }

  componentDidUpdate() {
	  this.updatePlot()
  }
	DEFAULT_WIDTH = 700;

	DEFAULT_HEIGHT = 500;

	updatePlot = () => {
	  const svg = d3.select(this.target)

	  // remove all existing content
	  svg.selectAll('*').remove()

	  // set up the geometry, using the margin pattern
	  const width = svg.attr('width')
	  const height = svg.attr('height')
	  const margin = this.props.margin || {
	    top: 20,
	    bottom: 60,
	    left: 65,
	    right: 20
	  }
	  const innerWidth = width - margin.left - margin.right
	  const innerHeight = height - margin.top - margin.bottom
	  const g = svg.append('g')
	    .attr('transform', `translate(${ margin.left }, ${ margin.top })`)

	  // spatial scales
	  const xTicks = 5
	  const yTicks = 10
	  const xScale = d3.scaleLinear()
	    .domain([-1, 25])
	    .range([0, innerWidth])
	  const yScale = d3.scaleLinear()
	    .domain([-80, 12])
	    .range([innerHeight, 0])

	  // color scale
	  const colorScale = d3.scaleSequential(interpolateOrRd)
		    .domain([0, 0.05])

	  // axes
	  const tickPadding = 10
	  const tickSizeInner = -5
	  const xAxisBottom = d3.axisBottom()
	    .scale(xScale)
	    .tickSizeInner(tickSizeInner)
	    .tickSizeOuter(0)
	    .tickPadding(tickPadding)
	    .ticks(xTicks)
	  const xAxisTop = d3.axisTop()
	    .scale(xScale)
	    .tickSizeInner(tickSizeInner)
	    .tickSizeOuter(0)
	    .tickPadding(tickPadding)
	    .ticks(xTicks)
	    .tickFormat('')
	  const yAxisLeft = d3.axisLeft()
	    .scale(yScale)
	    .tickSizeInner(tickSizeInner)
	    .tickSizeOuter(0)
	    .tickPadding(tickPadding)
	    .ticks(yTicks)
	  const yAxisRight = d3.axisRight()
	    .scale(yScale)
	    .tickSizeInner(tickSizeInner)
	    .tickSizeOuter(0)
	    .tickPadding(tickPadding)
	    .ticks(yTicks)
	    .tickFormat('')

	  // draw axes
	  const xAxisBottomG = g.append('g')
	    .attr('class', 'axis')
	    .attr('transform', `translate(0, ${ innerHeight })`)
	  xAxisBottomG.call(xAxisBottom)
	  const xAxisTopG = g.append('g')
		    .attr('class', 'axis')
	  xAxisTopG.call(xAxisTop)
	  const yAxisLeftG = g.append('g')
		    .attr('class', 'axis')
	  yAxisLeftG.call(yAxisLeft)
	  const yAxisRightG = g.append('g')
	    .attr('class', 'axis')
	    .attr('transform', `translate(${ innerWidth }, 0)`)
	  yAxisRightG.call(yAxisRight)

	  // add axis labels
	  xAxisBottomG.append('text')
	    .attr('class', 'label')
	    .attr('x', innerWidth / 2)
	    .attr('y', 50)
	    .text('RA')
	  yAxisLeftG.append('text')
	    .attr('class', 'label')
	    .attr('transform', 'rotate(-90)')
	    .attr('x', -innerHeight / 2)
	    .attr('y', -50)
	    .attr('text-anchor', 'middle')
	    .text('DEC')

	  // background to avoid that the contour lines overlap the axes
	  const passepartout = [
	    {x: -margin.left, y: -margin.top, width, height: margin.top},
	    {x: -margin.left, y: -margin.top, width: margin.left, height},
	    {x: -margin.left, y: innerHeight, width, height: margin.bottom},
	    {x: innerWidth, y: -margin.top, width: margin.right, height}
	  ]
	  g.append('g')
	    .classed('passepartout', true)
	    .lower()
	    .selectAll('rect')
	    .data(passepartout)
	    .enter()
	    .append('rect')
	    .attr('x', d => d.x)
	    .attr('y', d => d.y)
	    .attr('width', d => d.width)
	    .attr('height', d => d.height)
	    .style('stroke', 'none')
	    .style('fill', 'white')

	  // add contour lines
	  const h = 10
	  const contourDensity = d3ContourDensity()
	    .x(d => xScale(d.rightAscension / 15))  // 15 degrees in 1 hour
	    .y(d => yScale(d.declination))
	    .size([innerWidth, innerHeight])
	    .bandwidth(h)

	  // get a color range from 0 to the maximum contour value (i.e. target density)
	  const contourDensityData = contourDensity(this.props.targets)
	  /* below value was never used  and d3.max() raised an error some how */
	  // const maximumContourValue = d3.max()
	  g.append('g')
	    .lower()
	    .attr('fill', 'none')
	    .attr('stroke', 'black')
	    .attr('stroke-width', 0.5)
	    .attr('stroke-linejoin', 'round')
	    .selectAll('path')
	    .data(contourDensityData)
	    .enter()
	    .append('path')
	    .attr('fill', d => colorScale(d.value))
	    .attr('d', d3.geoPath())
	};

	render() {
	  const width = this.props.width || this.DEFAULT_WIDTH
	  const height = this.props.height || this.DEFAULT_HEIGHT
	  return (
	    <div>
	      <h2>Target Distribution</h2>
	      <svg className='plot'
				     width={ width }
				     height={ height }
				     ref={ (svg) => this.target = svg }
	      />
	    </div>
	  )
	}
}

TargetDistributionContourMap.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.object,
  targets: PropTypes.array.isRequired
}

export default TargetDistributionContourMap
