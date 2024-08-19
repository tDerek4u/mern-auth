import axios from 'axios';
import React, { useEffect, useState } from 'react';
axios.defaults.withCredentials = true;

// Declare the interface for the user data
interface UserData {
  name: string;
  email: string;
}

const Welcome = () => {
  // Initialize state as either UserData or null
  const [data, setData] = useState<UserData | null>(null);

  const getUser = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/api/v1/user", {
        withCredentials: true
      });
      setData(response.data);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Conditionally render content based on whether data is available
  return (
    <div>
      {data ? (
        <>
          Welcome, {data.name}!
          <br />
          Your email is: {data.email}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Welcome;
