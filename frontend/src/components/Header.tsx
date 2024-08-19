import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';

const Header = () => {
  // Initialize state with a default value of 0 (first tab)
  const [value, setValue] = useState<number>(0);

  // Update handleChange to accept the new value as a number
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h3">MernAuth</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tabs value={value} onChange={handleChange} textColor="inherit">
              <Tab label="Home" href="/" />
              <Tab label="Register" href="/register" />
              <Tab label="Login" href="/login" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
