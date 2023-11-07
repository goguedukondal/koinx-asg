
import './App.css';
import Crypto from './components/Crypto';
import { Text ,Box,Stack,Image,Button} from '@chakra-ui/react';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Stack flexDir='row' >
      <Box border='0.5px solid gray' borderRadius={12} m={10} w='64%'>
      <Text fontSize='4xl' mt={10}> Free Crypto Tax Calculator Australia</Text>
     <Crypto/>
      </Box>
      <Box w='40%' bg='blue' color='white' h='85vh' mt={10} textAlign='center' p={10} borderRadius={12} mr={10}>
        <Stack flexDir='column' alignItems='center' gap={5}>
        <Text fontSize='4xl'>Get Started with KoinX for FREE</Text>
        <Image src='https://th.bing.com/th/id/OIP.-c4dVSnNGviIWdqooy6acgHaDx?w=291&h=178&c=7&r=0&o=5&dpr=1.5&pid=1.7' borderRadius='50%' height={100} w={100} />
        <Text>
          With our range of features that you can equip for free, KoinX allows you to be more educated and aware of your tax reports.
        </Text>
        <Button>Get Started for Free -&gt; </Button>
        </Stack>
      </Box>
      </Stack>
    </div>
  );
}

export default App;
