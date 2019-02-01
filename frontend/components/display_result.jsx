import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// import { spaceship } from '../utils/helpers';

const DisplayResult = (props) => {
  console.log("Result: ", props.result);
  console.log("Props: ", props);

  return (
    <li key={props.contractsPerTrade}>
      Hi
    </li>
  );
};

export default withRouter(DisplayResult);
