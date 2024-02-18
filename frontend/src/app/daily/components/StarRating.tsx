import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
    0.5: 'Terrible',
    1: 'Really Bad',
    1.5: 'Bad',
    2: 'Not Good',
    2.5: 'Average',
    3: 'Fair',
    3.5: 'Good',
    4: 'Really Good',
    4.5: 'Great',
    5: 'Amazing',
  };

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface StarRatingProps {
    setRating: (value: number) => void;
  }

const StarRating = (props: StarRatingProps) => {
  const handleRatingChange = (newRating: any) => {
      props.setRating(newRating);
  };
  const [value, setValue] = React.useState<number | null>(4);
  const [hover, setHover] = React.useState(-1);

  return (
    <>
    <h1> How was your day? </h1>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55}} fontSize="inherit" />}
        style={{ fontSize: 40 }} 
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
    </>
  );
}

export default StarRating;