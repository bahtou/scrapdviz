import Proptypes from 'prop-types';
import ScrapdGenericBarChart from './scrapd-generic-bar-chart';
import moment from 'moment';
import { connect } from 'react-redux';

const ScrapdYearGraph = props => {
  let datamap = new Object();
  for (var i = 0; i < props.fatalities.length; i++) {
    const date = props.fatalities[i]['Date'];
    const year = moment(date, ['MM/DD/YYYY']).year();
    if (datamap[year] == undefined) {
      datamap[year] = 0;
    } else {
      datamap[year] = datamap[year] + 1;
    }
  }

  return <ScrapdGenericBarChart groupedItems={datamap} itemCount={props.fatalities.length} attribute="Year" />;
};

ScrapdYearGraph.propTypes = {
  fatalities: Proptypes.array,
  attribute: Proptypes.string
};

const mapStateToProps = state => {
  const { fatalities } = state;
  return { fatalities };
};

export default connect(mapStateToProps)(ScrapdYearGraph);