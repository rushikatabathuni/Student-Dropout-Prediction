import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Link,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function About() {
  const { colorMode } = useColorMode();

  const containerStyle = {
    bg: colorMode === 'light' ? 'gray.50' : 'gray.900',
    borderRadius: 'xl',
    p: 8,
    shadow: 'xl',
  };

  const sectionStyle = {
    bg: colorMode === 'light' ? 'white' : 'gray.800',
    p: 6,
    borderRadius: 'lg',
    shadow: 'md',
    border: '1px',
    borderColor: colorMode === 'light' ? 'gray.200' : 'gray.700',
  };

  return (
    <Container maxW="container.lg" py={10}>
      <Box {...containerStyle}>
        <VStack spacing={8} align="stretch">
          <Heading 
            textAlign="center" 
            color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
            mb={4}
          >
            About the Project
          </Heading>
          
          <Box {...sectionStyle}>
            <Text fontSize="lg" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
              This student dropout prediction model was developed to help educational institutions
              identify students at risk of dropping out. The model uses machine learning
              algorithms trained on historical student data to make predictions.
            </Text>
          </Box>

          <Box {...sectionStyle}>
            <Heading 
              size="md" 
              mb={4}
              color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
            >
              Model Details
            </Heading>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
              [Model description to be filled]
            </Text>
          </Box>

          <Box {...sectionStyle}>
            <Heading 
              size="md" 
              mb={4}
              color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
            >
              Author
            </Heading>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
              [Author information to be filled]
            </Text>
          </Box>

          <HStack spacing={4} justify="center">
            <Link href="[Your GitHub URL]" isExternal>
              <Button 
                leftIcon={<FaGithub />} 
                colorScheme="gray"
                size="lg"
                _hover={{ 
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                }}
                transition="all 0.2s"
              >
                GitHub
              </Button>
            </Link>
            <Link href="[Your LinkedIn URL]" isExternal>
              <Button 
                leftIcon={<FaLinkedin />} 
                colorScheme="linkedin"
                size="lg"
                _hover={{ 
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                }}
                transition="all 0.2s"
              >
                LinkedIn
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
}

export default About;