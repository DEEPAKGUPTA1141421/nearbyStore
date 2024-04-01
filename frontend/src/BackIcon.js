import React from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
 // Assuming you're using React Router for navigation

const BackIcon = () => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <Button
      position="fixed"
      top="1rem"
      left="1rem"
      zIndex="999"
      onClick={goBack}
      variant="outline"
      colorScheme="blue"
      leftIcon={<ArrowBackIcon />}
      style={{width: "10rem"}}
    >
      Back
    </Button>
  );
};

export default BackIcon;
