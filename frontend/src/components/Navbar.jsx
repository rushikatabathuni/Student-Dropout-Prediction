import { Box, Flex, Button, useColorMode, Link as ChakraLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkStyle = (path) => ({
    fontWeight: isActive(path) ? "bold" : "normal",
    color: isActive(path) ? (colorMode === 'light' ? "blue.500" : "blue.300") : "inherit",
    bg: isActive(path) ? (colorMode === 'light' ? "gray.100" : "gray.700") : "transparent",
    px: 3,
    py: 2,
    borderRadius: "md",
    transition: "all 0.2s",
    _hover: {
      bg: colorMode === 'light' ? "gray.100" : "gray.700",
    }
  });

  return (
    <Box px={4} shadow="base" bg={colorMode === 'light' ? 'white' : 'gray.800'}>
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        <Flex gap={8}>
          <ChakraLink as={Link} to="/" {...linkStyle("/")}>
            Home
          </ChakraLink>
          <ChakraLink as={Link} to="/predict" {...linkStyle("/predict")}>
            Predict
          </ChakraLink>
          <ChakraLink as={Link} to="/about" {...linkStyle("/about")}>
            About
          </ChakraLink>
        </Flex>
        <Button 
          onClick={toggleColorMode}
          variant="ghost"
          _hover={{
            bg: colorMode === 'light' ? "gray.100" : "gray.700",
          }}
        >
          {colorMode === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;