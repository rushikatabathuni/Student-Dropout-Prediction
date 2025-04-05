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
            The prediction model is a Random Forest Classifier (RFC) designed to predict student status as Dropout, Graduate, or Enrolled. It utilizes a set of key features including curricular units approved and enrolled, age at enrollment, admission grade, tuition fees status, and more. The model was trained on a balanced dataset using SMOTE to address class imbalance, achieving an accuracy of approximately 74% and a weighted-average F1 score of 0.7386482525504112. With a robust ensemble approach and strong ROC-AUC score, the model effectively distinguishes between classes, providing a reliable tool for predicting student outcomes.
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
              This project is done by Rushi Katabathuni, a student pursuing B.Tech in Computer Science and Engineering at Keshav Memorial College Of Engineering. This project is done aiming to improve understanding of various machine learning and deep learning models and also enter the field of FrontEnd Development using React JS.
            </Text>
          </Box>

          <HStack spacing={4} justify="center">
            <Link href="https://github.com/rushikatabathuni/" isExternal>
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
            <Link href="https://www.linkedin.com/in/rushi-katabathuni-3851072b7/" isExternal>
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