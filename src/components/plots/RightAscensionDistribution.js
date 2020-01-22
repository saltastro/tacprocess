import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

/**
 * A component for displaying a bar chart for the distribution of right ascensions.
 *
 * The following properties can be passed to this component.
 *
 * width: The width of the chart, including margins, in pixels. (optional)
 * height: The height of the chart, including margins, in pixels. (optional)
 * margin: The margin around the chart, with properties "top", "bottom", "left" and "right". (optional)
 * targets: The list of targets. Each target must have a property "ra" (with the right ascension in degrees) and
 *          a property "optional" (which is true for optional targets).
 *
 * The chart contains bars for the mandatory targets, the optional targets and all targets together. The CSS
 * classes for these are "mandatory target", "optional target" and "target".
 */
class RightAscensionDistribution extends React.Component {
  componentDidMount() {
    this.createPlot()
  }
	
  componentDidUpdate() {
    this.createPlot()
  }
	
	createPlot = () => {
	  const svg = d3.select(this.target)
		
	  // remove any existing plot content
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
		
	  // prepare the data
	  const targetsHistogramData = targets => {
	    const histogram = d3.histogram()
	      .domain([0, 24])
	      .value(d => d.rightAscension)
	      .thresholds(d3.range(0, 49).map(n => n / 2))
	    return histogram(targets)
	  }
	  // eslint-disable-next-line
	  const targets = this.props.targets
	  const mandatoryTargets = targets.filter(target => !target.isOptional)
	  const mandatoryTargetsData = targetsHistogramData(mandatoryTargets)
	  const optionalTargets = targets.filter(target => target.isOptional)
	  const optionalTargetsData = targetsHistogramData(optionalTargets)
	  const targetsData = targetsHistogramData(targets)
		
	  // scales
	  const maxTargetCount = d3.max(targetsData, d => d.length)
	  const xTicks = 5
	  const yTicks = 5
	  const xScale = d3.scaleLinear()
		    .domain([0, 24])
		    .range([0, innerWidth])
	  const yScale = d3.scaleLinear()
		    .domain([0, maxTargetCount])
		    .range([innerHeight, 0])
		    .nice(yTicks)
		
	  // axes
	  const tickPadding = 10
	  const tickSizeInner = -5
	  const xAxisBottom = d3.axisBottom()
		    .scale(xScale)
		    .ticks(xTicks)
		    .tickSizeInner(tickSizeInner)
		    .tickSizeOuter(0)
		    .tickPadding(tickPadding)
	  const xAxisTop = d3.axisTop()
		    .scale(xScale)
		    .ticks(xTicks)
		    .tickSizeInner(tickSizeInner)
		    .tickSizeOuter(0)
		    .tickPadding(tickPadding)
		    .tickFormat('')
	  const yAxisLeft = d3.axisLeft()
		    .scale(yScale)
		    .ticks(yTicks)
		    .tickSizeInner(tickSizeInner)
		    .tickSizeOuter(0)
		    .tickPadding(tickPadding)
	  const yAxisRight = d3.axisRight()
		    .scale(yScale)
		    .ticks(yTicks)
		    .tickSizeInner(tickSizeInner)
		    .tickSizeOuter(0)
	    	.tickPadding(tickPadding)
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
		    .text('RA (hrs)')
	  yAxisLeftG.append('text')
		    .attr('class', 'label')
		    .attr('transform', 'rotate(-90)')
		    .attr('x', -innerHeight / 2)
		    .attr('y', -50)
		    .attr('text-anchor', 'middle')
		    .text('N')
		
	  // plot target counts
	  const data = {
	    all: targetsData,
	    mandatory: mandatoryTargetsData,
	    optional: optionalTargetsData
	  };
	  ['all', 'mandatory', 'optional']
	    .forEach(key => {
	    	let color = 'purple'
	    	if ( key === 'mandatory') { color='green'}
	    	if ( key === 'all') { color='blue'}
	      g.append('g')
	        .classed(key, true)
	        .classed('targets', true)
	        .selectAll('rect')
	        .data(data[ key ])
	        .enter()
	        .append('rect')
	        .style('opacity', .6)
	        .style('fill',  color)
	        .attr('x', d => xScale(d.x0))
	        .attr('y', d => yScale(d.length))
	        .attr('width', d => xScale(d.x1) - xScale(d.x0))
	        .attr('height', d => innerHeight - yScale(d.length))
	    })
		
	  const legend = svg.append('g')
	    .attr('class', 'legend')
	    .attr('x', 620)
	    .attr('y', 25)
	    .attr('height', 100)
	    .attr('width', 100);
		
	  [{color: 'green', text: 'all'}, {color: 'blue', text:'mandatory'}, {color: 'purple', text: 'optional'}]
		    .forEach( (t, i) => {
	      legend.append('rect')
	        .attr('x', 570)
	        .attr('y', 35 + 18*i)
	        .attr('width', 10)
	        .attr('height', 10)
	        .style('opacity', .6)
	        .style('fill', t.color)
	      legend.append('text')
	        .attr('x', 590)
	        .attr('y', 45 + 18*i)
	        .attr('width', 10)
	        .attr('height', 10)
	        .style('fill', 'black')
	        .text(t.text)
		    })
		
	};
	
	render() {
	  const width = this.props.width || 700
	  const height = this.props.height || 700
	  return (
	    <div className='stat-item'>
	      <svg
	        className='plot'
	        width={ width }
	        height={ height }
	        ref={ svg => this.target = svg }
	      />
	    </div>
	  )
	}
}

RightAscensionDistribution.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.object,
  targets: PropTypes.array.isRequired
}

export default RightAscensionDistribution
