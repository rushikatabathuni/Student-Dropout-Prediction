import { useState } from 'react';
import {
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Predict() {
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    curricular_units_1st_sem_approved: '',
    age_at_enrollment: '',
    admission_grade: '',
    curricular_units_1st_sem_evaluations: '',
    previous_qualification_grade: '',
    tuition_fees_up_to_date: 'yes',
    application_order: '',
    curricular_units_1st_sem_enrolled: '',
    gender: '',
    mothers_qualification: '',
  });
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSinglePrediction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get prediction',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleBatchPrediction = async (e) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict-batch', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResults(data.predictions);
      
      const dropouts = data.predictions.filter(p => p === 1).length;
      const nonDropouts = data.predictions.filter(p => p === 0).length;
      
      setChartData({
        labels: ['Dropout Risk', 'No Dropout Risk'],
        datasets: [{
          data: [dropouts, nonDropouts],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }],
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const containerStyle = {
    bg: colorMode === 'light' ? 'gray.50' : 'gray.900',
    borderRadius: 'xl',
    p: 8,
    shadow: 'xl',
  };

  const formStyle = {
    bg: colorMode === 'light' ? 'white' : 'gray.800',
    p: 6,
    borderRadius: 'lg',
    shadow: 'md',
  };

  return (
    <Container maxW="container.lg" py={10}>
      <Box {...containerStyle}>
        <Heading mb={6} textAlign="center" color={colorMode === 'light' ? 'blue.600' : 'blue.300'}>
          Predict Student Dropout
        </Heading>
        
        <Tabs isFitted variant="enclosed" colorScheme="blue">
          <TabList mb="1em">
            <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500', fontWeight: 'bold' }}>
              Single Prediction
            </Tab>
            <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500', fontWeight: 'bold' }}>
              Batch Prediction
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box {...formStyle}>
                <VStack spacing={4} as="form" onSubmit={handleSinglePrediction}>
                  <FormControl isRequired>
                    <FormLabel>Curricular Units 1st Sem Approved</FormLabel>
                    <Input
                      type="number"
                      name="curricular_units_1st_sem_approved"
                      value={formData.curricular_units_1st_sem_approved}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Age at Enrollment</FormLabel>
                    <Input
                      type="number"
                      name="age_at_enrollment"
                      value={formData.age_at_enrollment}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </Select>
                  </FormControl>

                  <Button 
                    type="submit" 
                    colorScheme="blue" 
                    width="full"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    transition="all 0.2s"
                  >
                    Predict
                  </Button>
                </VStack>

                {results && (
                  <Box 
                    mt={6} 
                    p={4} 
                    borderRadius="md" 
                    borderWidth={1}
                    bg={colorMode === 'light' ? 'blue.50' : 'blue.900'}
                    borderColor={colorMode === 'light' ? 'blue.200' : 'blue.700'}
                  >
                    <Heading size="md" mb={2}>Prediction Result</Heading>
                    <Text fontWeight="bold" color={results === 1 ? 'red.500' : 'green.500'}>
                      {results === 1 ? 'High risk of dropout' : 'Low risk of dropout'}
                    </Text>
                  </Box>
                )}
              </Box>
            </TabPanel>

            <TabPanel>
              <Box {...formStyle}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Upload CSV File</FormLabel>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      p={2}
                      focusBorderColor="blue.400"
                    />
                  </FormControl>

                  <Button
                    onClick={handleBatchPrediction}
                    colorScheme="blue"
                    width="full"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    transition="all 0.2s"
                  >
                    Upload and Predict
                  </Button>

                  {chartData && (
                    <Box 
                      mt={6} 
                      w="full" 
                      maxW="400px" 
                      p={4} 
                      bg={colorMode === 'light' ? 'white' : 'gray.700'}
                      borderRadius="lg"
                      shadow="md"
                    >
                      <Pie data={chartData} />
                    </Box>
                  )}
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Predict;