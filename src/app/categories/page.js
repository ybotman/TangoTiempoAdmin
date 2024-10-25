'use client';

import { Box, List, Skeleton, Typography } from '@mui/material';
import useSWR from 'swr';
import CategoryListItem from './components/CategoryListItem';
import CategoryInsert from './components/CategoryInsert';
import fetcher from '../utils/fetcher';

function CategoriesPage() {
  const {
    data: categories,
    isLoading,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_BE_URL}/api/categories`, fetcher);

  return (
    <Box>
      <Typography variant="h3">Categories</Typography>
      <CategoryInsert onInsert={mutate} />

      {isLoading ? (
        <Skeleton variant="rectangular" height={500} sx={{ mt: 1 }} />
      ) : (
        <List sx={{ bgcolor: 'grey.50', mt: 1 }}>
          {categories.map((category) => (
            <CategoryListItem
              key={category._id}
              category={category}
              onEdit={mutate}
            />
          ))}
        </List>
      )}
    </Box>
  );
}

export default CategoriesPage;
