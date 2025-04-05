import { Box, Container, Heading, Text, VStack, Stat, StatLabel, StatNumber, SimpleGrid, useColorMode } from '@chakra-ui/react';

function Home() {
  const { colorMode } = useColorMode();

  const containerStyle = {
    bg: colorMode === 'light' ? 'gray.50' : 'gray.900',
    borderRadius: 'xl',
    p: 8,
    shadow: 'xl',
  };

  const statStyle = {
    p: 6,
    shadow: 'md',
    border: '1px',
    borderColor: colorMode === 'light' ? 'gray.200' : 'gray.700',
    borderRadius: 'lg',
    bg: colorMode === 'light' ? 'white' : 'gray.800',
    transition: 'all 0.2s',
    _hover: {
      transform: 'translateY(-2px)',
      shadow: 'lg',
    },
  };

  const featureBoxStyle = {
    p: 6,
    shadow: 'md',
    border: '1px',
    borderColor: colorMode === 'light' ? 'gray.200' : 'gray.700',
    borderRadius: 'lg',
    bg: colorMode === 'light' ? 'white' : 'gray.800',
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box {...containerStyle}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading mb={4} color={colorMode === 'light' ? 'blue.600' : 'blue.300'}>
              Student Dropout Prediction Model
            </Heading>
            <Text fontSize="lg" color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
              A simple machine learning model to predict student dropout probability, head to our prediction page for making predictions and about page for more infromation about the project.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Stat {...statStyle}>
              <StatLabel fontSize="lg" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                Model Accuracy
              </StatLabel>
              <StatNumber fontSize="3xl" color={colorMode === 'light' ? 'blue.500' : 'blue.300'}>
                89%
              </StatNumber>
            </Stat>
            <Stat {...statStyle}>
              <StatLabel fontSize="lg" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                ROC-AUC Score
              </StatLabel>
              <StatNumber fontSize="3xl" color={colorMode === 'light' ? 'blue.500' : 'blue.300'}>
                0.92
              </StatNumber>
            </Stat>
            <Stat {...statStyle}>
              <StatLabel fontSize="lg" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                F1 Score
              </StatLabel>
              <StatNumber fontSize="3xl" color={colorMode === 'light' ? 'blue.500' : 'blue.300'}>
                0.85
              </StatNumber>
            </Stat>
          </SimpleGrid>

          <Box {...featureBoxStyle}>
            <Heading size="md" mb={4} color={colorMode === 'light' ? 'blue.600' : 'blue.300'}>
              Model Features
            </Heading>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
              Our model uses key academic and demographic features including:
            </Text>
            <VStack align="start" mt={4} spacing={2} pl={4}>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Curricular units (1st sem) approved: Number of Subjects Passed</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Age at enrollment</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Admission grade: Grade in Admission test(0-200)</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Curricular units (1st sem) evaluations: Number of Subject's Exam Attempted</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Previous qualification grade</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Tuition fees up to date</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Application order</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Curricular units (1st sem) enrolled: Number of Subjects enrolled.</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Gender</Text>
            <Text color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>• Mother's qualification</Text>

            </VStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
}

export default Home;