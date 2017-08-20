import React from 'react';
import {expect} from 'chai';
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon'
import Weather from '../src/components/weather/weather';

// const window = {location: {origin: "http://localhost:8080"}}
// beforeEach(function() {
//   sinon.stub(window.location, 'origin')
// })
// afterEach(function () {
//   window.location.origin.restore()
// })
// window.location.origin.returns(window.location.origin)

const data =  {
    "latitude": 47.20296790272209,
    "longitude": -123.41670367098749,
    "timezone": "America/Los_Angeles",
    "currently": {
      "time": 1453402675,
      "summary": "Rain",
      "icon": "rain",
      "nearestStormDistance": 0,
      "precipIntensity": 0.1685,
      "precipIntensityError": 0.0067,
      "precipProbability": 1,
      "precipType": "rain",
      "temperature": 48.71,
      "apparentTemperature": 46.93,
      "dewPoint": 47.7,
      "humidity": 0.96,
      "windSpeed": 4.64,
      "windGust": 9.86,
      "windBearing": 186,
      "visibility": 4.3,
      "cloudCover": 0.73,
      "pressure": 1009.7,
      "ozone": 328.35
    },
    "minutely": {
      "summary": "Rain for the hour.",
      "icon": "rain",
      "data": [
        {
          "time": 1453402620,
          "precipIntensity": 0.1715,
          "precipIntensityError": 0.0066,
          "precipProbability": 1,
          "precipType": "rain"
        },
      ]
    },
    "hourly": {
      "summary": "Rain throughout the day.",
      "icon": "rain",
      "data": [
        {
          "time": 1453399200,
          "summary": "Rain",
          "icon": "rain",
          "precipIntensity": 0.1379,
          "precipProbability": 0.85,
          "precipType": "rain",
          "temperature": 48.16,
          "apparentTemperature": 46.41,
          "dewPoint": 46.89,
          "humidity": 0.95,
          "windSpeed": 4.47,
          "windGust": 10.22,
          "windBearing": 166,
          "visibility": 3.56,
          "cloudCover": 0.39,
          "pressure": 1009.97,
          "ozone": 328.71
        },
      ]
    },
    "daily": {
      "summary": "Light rain throughout the week, with temperatures bottoming out at 48°F on Sunday.",
      "icon": "rain",
      "data": [
        {
          "time": 1453363200,
          "summary": "Rain throughout the day.",
          "icon": "rain",
          "sunriseTime": 1453391560,
          "sunsetTime": 1453424361,
          "moonPhase": 0.43,
          "precipIntensity": 0.1134,
          "precipIntensityMax": 0.1722,
          "precipIntensityMaxTime": 1453392000,
          "precipProbability": 0.87,
          "precipType": "rain",
          "temperatureMin": 41.42,
          "temperatureMinTime": 1453363200,
          "temperatureMax": 53.27,
          "temperatureMaxTime": 1453417200,
          "apparentTemperatureMin": 36.68,
          "apparentTemperatureMinTime": 1453363200,
          "apparentTemperatureMax": 53.27,
          "apparentTemperatureMaxTime": 1453417200,
          "dewPoint": 46.79,
          "humidity": 0.95,
          "windSpeed": 4.26,
          "windBearing": 150,
          "visibility": 4.02,
          "cloudCover": 0.77,
          "pressure": 1009.35,
          "ozone": 326.69
        },
      ]
    },
    "alerts": [
      {
        "title": "Flood Watch for Mason, WA",
        "time": 1453375020,
        "expires": 1453407300,
        "description": "...FLOOD WATCH REMAINS IN EFFECT THROUGH LATE FRIDAY NIGHT...\nTHE FLOOD WATCH CONTINUES FOR\n* A PORTION OF NORTHWEST WASHINGTON...INCLUDING THE FOLLOWING\nCOUNTY...MASON.\n* THROUGH LATE FRIDAY NIGHT\n* A STRONG WARM FRONT WILL BRING HEAVY RAIN TO THE OLYMPICS\nTONIGHT THROUGH THURSDAY NIGHT. THE HEAVY RAIN WILL PUSH THE\nSKOKOMISH RIVER ABOVE FLOOD STAGE TODAY...AND MAJOR FLOODING IS\nPOSSIBLE.\n* A FLOOD WARNING IS IN EFFECT FOR THE SKOKOMISH RIVER. THE FLOOD\nWATCH REMAINS IN EFFECT FOR MASON COUNTY FOR THE POSSIBILITY OF\nAREAL FLOODING ASSOCIATED WITH A MAJOR FLOOD.\n",
        "uri": "http://alerts.weather.gov/cap/wwacapget.php?x=WA1255E4DB8494.FloodWatch.1255E4DCE35CWA.SEWFFASEW.38e78ec64613478bb70fc6ed9c87f6e6"
      },
    ]
  }

describe('<Weather />', () => {

  it('should render forecast data', () => {
    const props = {forecast: {data}};
    const wrapper = shallow(<Weather {...props} />);
    const component = wrapper.getNode();
    expect(wrapper).to.exist;

    const summary = wrapper.find('h3').getNode().props.children;
    expect(summary[1]).to.equal(data.currently.temperature.toFixed(0));
    expect(summary[4]).to.equal(data.currently.summary);

    const description = wrapper.find('h4').getNode().props.children;
    expect(description[1]).to.equal(data.daily.summary);

    const icon = wrapper.find('img').getNode();
    const iconName = data.daily.icon;
    expect(icon.props.src).to.equal(`/../assets/${iconName}.png`);

  });
});
