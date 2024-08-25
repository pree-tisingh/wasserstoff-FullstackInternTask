
import React from 'react';
import GaugeChart from 'react-gauge-chart';

const UvIndexGauge = ({ uvIndex }) => {
  const gaugePercent = uvIndex / 11; 
  let color;
  
  if (uvIndex <= 2) {
    color = "#00ff00"; 
  } else if (uvIndex <= 5) {
    color = "#ffff00"; 
  } else if (uvIndex <= 7) {
    color = "#ff7f00"; 
  } else if (uvIndex <= 10) {
    color = "#ff0000"; 
  } else {
    color = "#8b00ff"; 
  }

  return (
    <div className="uv-index-gauge">
      <GaugeChart
        id="uv-index-gauge-chart"
        nrOfLevels={6}
        arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
        colors={[color]}
        percent={gaugePercent}
        textColor="#000000"
        needleColor="#464A4F"
        formatTextValue={() => `${uvIndex}`}
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="gauge-label"></div>
    </div>
  );
};

export default UvIndexGauge;
