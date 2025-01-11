import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import Face from './Face';
Amplify.configure(config);
function App({ signOut }) {
  return (
    <View className="App">
      {/* <Card> */}

        {/* <Heading level={1}>We now have Auth!</Heading> */}
    
      {/* </Card> */}
      <Face/>
      {/* <Button onClick={signOut}>Sign Out</Button> */}
    </View>
  );
}

export default withAuthenticator(App);

// import React, { useState } from 'react';
// import './App.css';
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
// import Face from './Face';
// // import { Clerk } from "@clerk/clerk-js";

// // const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// // const clerk = new Clerk(clerkPubKey);
// // await clerk.load({
// //   // Set load options here
// // });




// function App() {



//   return (
//     <div className="App flex justify-center items-center h-screen">
//         {/* <header> */}
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         {/* <UserButton /> */}
//         <Face/>
//       </SignedIn>
//     {/* </header> */}

//     </div>
//   );
// }

// export default App;



// import { Amplify } from 'aws-amplify';
// import config from './aws-exports';

// import "@aws-amplify/ui-react/styles.css";
// import {
//   withAuthenticator,
//   Button,
//   Heading,
//   Image,
//   View,
//   Card,
// } from "@aws-amplify/ui-react";
// import Face from './Face';
// // import NaviBar from './NaviBar';

// Amplify.configure(config);
// function App({ signOut }) {
//   return (
//     // <NaviBar/>
//     <Face/>
//     // <View className="App">
//     //   <Card>

//     //     <Heading level={1}>We now have Auth!</Heading>
    
//     //   </Card>
//     //   <Face/>
//     //   <Button onClick={signOut}>Sign Out</Button>
//     // </View>
//   );
// }

// // export default withAuthenticator(App);
// export default App;
// import React, { useState } from 'react';
// import './App.css';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import SendIcon from '@mui/icons-material/Send';


// let nextid = 0;

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// function App() {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [selectedFile, setSelectedFile] = useState([]);
//   const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     console.log("file",file)
//     setSelectedFile([...selectedFile,{id:nextid++,file:file}])
//     if (file) {
//       const src = URL.createObjectURL(file);
//       setVideoSrc(src);
//       // console.log("Video src",src)
//     }
//   };
  


//   const handleSubmit = async()=>{
//     console.log("selected file",selectedFile)
//     selectedFile.map(async(file) => {
//       // console.log("file",file.file.name);
//       console.log("filname",file.file.name)

      
//     const response = await axios({
//       method: "GET",
//       url: API_ENDPOINT,
//     });
//     console.log("response.data.uploadURL: ",response.data.uploadURL)
    
//     const result = await fetch(response.data.uploadURL, {
//       method: "PUT",
//       body: file.file,
//     });

//     console.log("Result",result)
      
//   })


//     setSelectedFile([])
    
//   }

//   return (
//     <div className="App flex justify-center items-center h-screen">
//       {/* <div className=''> */}
//       <div className="mx-auto bg-black" style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             // height: '80vh'
//         }}>
//       <Card variant="outlined" style={{width:'300px',height:"auto",  backgroundColor: '#FFFFFF',
//         borderRadius: 20,
//         padding: 16,
//         shadowColor: '#000000',
//         shadowOffset: { width: 10, height: 10 },
//         shadowOpacity: 1,
//         shadowRadius: 10,}}>
//         <CardContent>
//           <h2 className='text-center text-lg'>Face Recognition</h2>
//           <div className='flex justify-center'>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<CloudUploadIcon />}
//               className="mt-4"
//             >
//               Upload Video
//               <VisuallyHiddenInput
//                 accept="video/*"
//                 type="file"
//                 onChange={handleUpload}
//               />
//             </Button>

            
//             {videoSrc && (
//             <div className="mt-10" style={{marginTop:'10px'}}>

//       {selectedFile.map(file => (
//           <li style={{listStyleType:'none'} } key={file.id}>{file.file.name}{' '}  <button onClick={() => {
//             setSelectedFile(
//               selectedFile.filter(f =>
//                 f.id !== file.id
//               )
//             );
//           }}>
//             X
//           </button></li>

//         ))}
//               {/* {selectedFile.name} */}
              
//             </div>
//           )}
//           </div>
    
//         </CardContent>

//         <Button variant="contained" onClick={handleSubmit} endIcon={<SendIcon />} color="success">
//   Send
// </Button>
//       </Card>

      
//       </div>
  
// {/* 
//       </div> */}
      
//     </div>
//   );
// }

// export default App;



// import React, { useState, useRef } from 'react';
// import './App.css';
// import axios from 'axios';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// function App() {
//   // const [videoSrc, setVideoSrc] = useState(null);
//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   // // API Gateway URL to invoke function to generate presigned URL
//   const API_ENDPOINT = "https://69u9hu5gbi.execute-api.us-east-1.amazonaws.com/stage2/presigned_url";

//   const getPresignedUrl = async () => {
//     // Fetch the presigned URL from API Gateway
//     try {
//       const response = await axios({
//         method: 'GET',
//         url: API_ENDPOINT,
//         // params: { fileName: fileName }
//       });
//       return response.data.presignedUrl;
//     } catch (error) {
//       console.error('Error fetching presigned URL', error);
//       throw error;
//     }
//   };

//   const uploadToS3 = async (presignedUrl) => {
//     // Use the presigned URL to upload the file to S3
//     try {
//       const uploadResponse = await axios.put(presignedUrl, selectedFile, {
//         headers: {
//           'Content-Type': "video/mp4"
//         }
//       });
//       console.log('File successfully uploaded:', uploadResponse);
//     } catch (error) {
//       console.error('Error uploading file to S3', error);
//     }
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // const src = URL.createObjectURL(file);
//       // setVideoSrc(src);
//       setSelectedFile(file);
//     }
//     console.log("Selected file",selectedFile)

//     try {
//             const presignedUrl = await getPresignedUrl();
//             await uploadToS3(presignedUrl);
//             alert('Upload successful');
//           } catch (error) {
//             console.error('Upload failed:', error);
//           }
//   };

//   // const handleUpload = async () => {
//   //   if (!selectedFile) {
//   //     fileInputRef.current.click(); // Open file dialog
//   //   } else {
//   //     try {
//   //       const presignedUrl = await getPresignedUrl(selectedFile.name);
//   //       await uploadToS3(presignedUrl, selectedFile);
//   //       alert('Upload successful');
//   //     } catch (error) {
//   //       console.error('Upload failed:', error);
//   //     }
//   //   }
//   // };

//   return (
//     <div className="App flex justify-center items-center h-screen">
//       <div className="mx-auto" style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '80vh',
//             backgroundColor: 'black'
//         }}>
//         <Card variant="outlined" style={{
//           width: '300px',
//           height: '170px',
//           backgroundColor: '#FFFFFF',
//           borderRadius: 20,
//           padding: 16,
//           boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
//         }}>
//           <CardContent>
//             <h2 className='text-center text-lg'>Face Recognition</h2>
//             <div className='flex justify-center'>
//               <Button
//                 // onClick={handleFileChange}
//                 component="label"
//                 variant="contained"
//                 startIcon={<CloudUploadIcon />}
//                 className="mt-4"
//               >
//                 upload Video
//                 {/* {selectedFile ? "Upload Video" : "Select Video"} */}
//                 <VisuallyHiddenInput
//                   accept="video/mp4"
//                   type="file"
//                   onChange={handleFileChange}
//                   ref={fileInputRef}
//                 />
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* {videoSrc && (
//         <div className="mt-4">
//           <video controls className="w-full">
//             <source src={videoSrc} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )} */}
//     </div>
//   );
// }

// export default App;
