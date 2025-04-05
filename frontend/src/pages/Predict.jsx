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
    Curricular_units_1st_sem_approved: 0,
    Age_at_enrollment: 0,
    Admission_grade: 0,
    Curricular_units_1st_sem_evaluations: 0,
    Previous_qualification_grade: 0,
    Tuition_fees_up_to_date: 0,
    Application_order: 0,
    Curricular_units_1st_sem_enrolled: 0,
    Gender: 0,
    Mothers_qualification: 0,
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
    const mappedData = { ...formData }; // No need to map as the form data already uses the correct feature names
    console.log("Mapped form data before sending:", mappedData); 
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappedData),
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
      const response = await fetch('http://127.0.0.1:5000/predict-batch', {
        method: 'POST',
        body: formData,
      });

       console.log("Response status:", response.status); // Log the status

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch error:", response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
      }

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
      console.error("Prediction error:", error);
      toast({
        title: 'Error',
        description: 'Failed to process file: ' + error.message,
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
                      name="Curricular_units_1st_sem_approved"
                      value={formData.Curricular_units_1st_sem_approved}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                      min={0}
                      max={10}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Age at Enrollment</FormLabel>
                    <Input
                      type="number"
                      name="Age_at_enrollment"
                      value={formData.Age_at_enrollment}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Admission Grade(Out of 200)</FormLabel>
                    <Input
                      type="number"
                      name="Admission_grade"
                      value={formData.Admission_grade}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                      min={0}
                      max={200}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Previous Qualification Grade(Out of 200)</FormLabel>
                    <Input
                      type="number"
                      name="Previous_qualification_grade"
                      value={formData.Previous_qualification_grade}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                      min={0}
                      max={200}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Curricular Units 1st Sem Evaluations</FormLabel>
                    <Input
                      type="number"
                      name="Curricular_units_1st_sem_evaluations"
                      value={formData.Curricular_units_1st_sem_evaluations}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                      min={0}
                      max={10}
                    />
                  </FormControl>  
                  <FormControl isRequired>
                    <FormLabel>Curricular Units 1st Sem Enrolled</FormLabel>
                    <Input
                      type="number"
                      name="Curricular_units_1st_sem_enrolled"
                      value={formData.Curricular_units_1st_sem_enrolled}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                      min={0}
                      max={10}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                    >
                      <option value="">Select Gender</option>
                      <option value={1}>Male</option>
                      <option value={0}>Female</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tuition Fees Up-to-Date</FormLabel>
                    <Select
                      name="Tuition_fees_up_to_date"
                      value={formData.Tuition_fees_up_to_date}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                    >
                      <option value="">Select</option>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Application Order</FormLabel>
                    <Select
                      name="Application_order"
                      value={formData.Application_order}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                    >
                      <option value="">Select Application Order</option>
                      <option value="0">0 - First Choice</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9 - Last Choice</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Mother's Qualification</FormLabel>
                    <Select
                      name="Mothers_qualification"
                      value={formData.Mothers_qualification}
                      onChange={handleInputChange}
                      focusBorderColor="blue.400"
                    >
                      <option value="">Select Qualification</option>
                      <option value="1">1 - Secondary Education - 12th Year or Equivalent</option>
                      <option value="2">2 - Higher Education - Bachelor's Degree</option>
                      <option value="3">3 - Higher Education - Degree</option>
                      <option value="4">4 - Higher Education - Master's</option>
                      <option value="5">5 - Higher Education - Doctorate</option>
                      <option value="6">6 - Frequency of Higher Education</option>
                      <option value="9">9 - 12th Year - Not Completed</option>
                      <option value="10">10 - 11th Year - Not Completed</option>
                      <option value="11">11 - 7th Year (Old)</option>
                      <option value="12">12 - Other - 11th Year of Schooling</option>
                      <option value="14">14 - 10th Year of Schooling</option>
                      <option value="18">18 - General Commerce Course</option>
                      <option value="19">19 - Basic Education 3rd Cycle (9th/10th/11th Year)</option>
                      <option value="22">22 - Technical-professional Course</option>
                      <option value="26">26 - 7th Year of Schooling</option>
                      <option value="27">27 - 2nd Cycle of General High School</option>
                      <option value="29">29 - 9th Year - Not Completed</option>
                      <option value="30">30 - 8th Year of Schooling</option>
                      <option value="34">34 - Unknown</option>
                      <option value="35">35 - Can't Read or Write</option>
                      <option value="36">36 - Can Read (No 4th Year)</option>
                      <option value="37">37 - Basic Education 1st Cycle (4th/5th Year)</option>
                      <option value="38">38 - Basic Education 2nd Cycle (6th/7th/8th Year)</option>
                      <option value="39">39 - Technological Specialization Course</option>
                      <option value="40">40 - Higher Education - Degree (1st Cycle)</option>
                      <option value="41">41 - Specialized Higher Studies Course</option>
                      <option value="42">42 - Professional Higher Technical Course</option>
                      <option value="43">43 - Higher Education - Master (2nd Cycle)</option>
                      <option value="44">44 - Higher Education - Doctorate (3rd Cycle)</option>
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
                    borderColor={colorMode === 'light' ? 'blue.300' : 'blue.600'}
                  >
                    <Text fontSize="xl" fontWeight="bold">
                      Prediction:
                    </Text>
                    <Text fontWeight="bold" color={Number(results.prediction )=== 0 ? 'red' : 'green'}>
                    {Number(results.prediction) === 1 ? 'No Dropout Risk' : 'Dropout Risk'}
                    </Text>
                  </Box>
                )}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box {...formStyle}>
                <VStack spacing={4} as="form" onSubmit={handleBatchPrediction}>
                  <FormControl isRequired>
                    <FormLabel>Upload CSV File for Batch Prediction</FormLabel>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      focusBorderColor="blue.400"
                    />
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
                    Upload and Predict
                  </Button>
                </VStack>
              </Box>
              {chartData && (
                <Box mt={3}>
                  <Pie data={chartData} />
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Predict;
