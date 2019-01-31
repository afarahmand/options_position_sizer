import React from 'react';
import { Link } from 'react-router-dom';

const DisplayResultsIndexItemSummary = ({ contractsPerTrade }) => {
  return (
    <li key={contractsPerTrade}>
      <Link to={`/view/${contractsPerTrade}`}>
        {contractsPerTrade}
      </Link>
    </li>
  );
};

export default DisplayResultsIndexItemSummary;
