// RelativeDate.js
import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const RelativeDate = ({ date }) => {
  try{
    //const parsedDate = parseISO(date);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true});

  return (
    <div>
      {relativeTime}
    </div>
  );
  }catch(e){
    console.log("Error at relative.jsx \n",e)
  }
  
};

export default RelativeDate;
