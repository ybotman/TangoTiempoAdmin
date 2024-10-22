import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

async function CategoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/categories`);
  const categories = await res.json();

  return (
    <Box>
      <Typography variant="h3">Categories</Typography>

      <List sx={{ bgcolor: 'grey.50', mt: 2 }}>
        {categories.map((category) => (
          <ListItem
            key={category._id}
            secondaryAction={
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemText primary={category.categoryName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default CategoriesPage;
