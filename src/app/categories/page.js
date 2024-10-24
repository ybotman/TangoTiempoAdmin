import { Box, List, Typography } from '@mui/material';
import CategoryListItem from './CategoryListItem';

async function CategoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/categories`, {
    cache: 'no-cache',
  });
  const categories = await res.json();

  return (
    <Box>
      <Typography variant="h3">Categories</Typography>

      <List sx={{ bgcolor: 'grey.50', mt: 2 }}>
        {categories.map((category) => (
          <CategoryListItem key={category._id} category={category} />
        ))}
      </List>
    </Box>
  );
}

export default CategoriesPage;
