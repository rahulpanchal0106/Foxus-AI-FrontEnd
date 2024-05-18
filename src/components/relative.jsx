// RelativeDate.js
import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const RelativeDate = ({ date }) => {
  //const parsedDate = parseISO(date);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true});

  return (
    <div>
      {relativeTime}
    </div>
  );
};

export default RelativeDate;
