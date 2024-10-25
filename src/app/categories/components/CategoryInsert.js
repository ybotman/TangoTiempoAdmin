'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

function CategoryInsert({ onInsert }) {
  const [open, setOpen] = useState(false);

  const handleInsertClick = () => {
    setOpen(true);
  };

  const handleInsertDialogClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoryName = event.target.categoryName.value;
    const categoryCode = event.target.categoryCode.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/categories`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName, categoryCode }),
      }
    );

    if (res.ok) {
      onInsert();
      handleInsertDialogClose();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="primary" onClick={handleInsertClick}>
        Insert category
      </Button>
      <Dialog
        open={open}
        onClose={handleInsertDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Insert Category</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField id="categoryName" label="Category Name" />
            <TextField id="categoryCode" label="Category Code" />
            <DialogActions>
              <Button onClick={handleInsertDialogClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Insert
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

CategoryInsert.propTypes = {
  onInsert: PropTypes.func.isRequired,
};

export default CategoryInsert;
