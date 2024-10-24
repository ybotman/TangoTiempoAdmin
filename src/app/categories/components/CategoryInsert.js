'use client';

const { Button, Box } = require('@mui/material');

function CategoryInsert() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log('Insert category')}
      >
        Insert category
      </Button>
    </Box>
  );
}

export default CategoryInsert;
