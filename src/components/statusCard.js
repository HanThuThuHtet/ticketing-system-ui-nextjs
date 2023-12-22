import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';



const StatusCard = ({id,title}) => {
  
  return (
    <Link href={`/statuses/${encodeURIComponent(id)}`}>
      <Card sx={{ minWidth: 250}}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StatusCard;
