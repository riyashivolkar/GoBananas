import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const App = () => {
  // State for storing posts fetched from the API
  const [posts, setPosts] = useState([]);
  // State for storing the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect hook to fetch data from the API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on the search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {/* AppBar for the application header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">React Material-UI API GoBananas</Typography>
        </Toolbar>
      </AppBar>

      {/* TextField for the search input */}
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Grid container to display the filtered posts */}
      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            {/* Card component to display individual post details */}
            <Card>
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography>{post.body}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
