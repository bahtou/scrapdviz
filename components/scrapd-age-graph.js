import Proptypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { RadialChart } from 'react-vis';

function isBetween(x, min, max) {
  return x >= min && x <= max;
}

const ScrapdAgeGraph = props => {
  // The data should come directly from the API.
  let datamap = new Object();
  datamap['00-14'] = 0;
  datamap['15-24'] = 0;
  datamap['25-34'] = 0;
  datamap['35-44'] = 0;
  datamap['45-54'] = 0;
  datamap['55-64'] = 0;
  datamap['65-99'] = 0;
  for (var i = 0; i < props.fatalities.length; i++) {
    let age = props.fatalities[i]['Age'];
    if (isBetween(age, 0, 14)) {
      let ageCount = datamap['00-14'];
      datamap['00-14'] = ageCount + 1;
    } else if (isBetween(age, 15, 24)) {
      let ageCount = datamap['15-24'];
      datamap['15-24'] = ageCount + 1;
    } else if (isBetween(age, 25, 34)) {
      let ageCount = datamap['25-34'];
      datamap['25-34'] = ageCount + 1;
    } else if (isBetween(age, 35, 44)) {
      let ageCount = datamap['35-44'];
      datamap['35-44'] = ageCount + 1;
    } else if (isBetween(age, 45, 54)) {
      let ageCount = datamap['45-54'];
      datamap['45-54'] = ageCount + 1;
    } else if (isBetween(age, 55, 64)) {
      let ageCount = datamap['55-64'];
      datamap['55-64'] = ageCount + 1;
    } else if (isBetween(age, 65, 99)) {
      let ageCount = datamap['65-99'];
      datamap['65-99'] = ageCount + 1;
    } else {
      continue;
    }
  }

  let data = new Array();
  for (var key in datamap) {
    if (datamap[key] === 0) {
      continue;
    }
    let tmp = new Object();
    tmp.angle = datamap[key];
    tmp.label = key;
    data.push(tmp);
  }

  const Graph = styled.div({
    display: 'inline-block',
    borderRadius: '5px',
    border: '1px solid',
    textAlign: 'center',
    margin: '2em 0'
  });

  const GraphTitle = styled.p({
    fontSize: '2em',
    textAlign: 'center'
  });

  return (
    <Graph>
      <RadialChart data={data} width={300} height={300} showLabels={true} labelsStyle={{ backgroundColor: 'gray' }} />
      <GraphTitle>Age distribution</GraphTitle>
    </Graph>
  );
};

ScrapdAgeGraph.propTypes = {
  fatalities: Proptypes.array
};

const mapStateToProps = state => {
  const { fatalities } = state;
  return { fatalities };
};

export default connect(mapStateToProps)(ScrapdAgeGraph);