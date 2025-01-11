// import React, { useState, useRef, useEffect } from 'react';
// import './App.css';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import SendIcon from '@mui/icons-material/Send';
// import NaviBar from './NaviBar';
// import './Face.css';
// import ResTable from './ResTable';
// import { useUser } from '@clerk/clerk-react'

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

// const columns = [
//   { Header: 'Result', accessor: 'result' },  // Updated column for results
// ];

// let connections = {};
// let nextId = 1;

// function trackConnection(ws) {
//   const id = nextId;
//   connections[id] = ws;
//   nextId++;

//   return id;
// }

// function Face() {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [selectedFile, setSelectedFile] = useState([]);
//   const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
//   const [connectionId, setConnectionId] = useState(null); // Store connection ID
//   const [items, setItems] = useState([]);
//   const wsRef = useRef(null); // Use ref to store WebSocket

//   const { isSignedIn, user, isLoaded, signOut } = useUser()

//   // Handle file upload
//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     console.log("file", file);
//     setSelectedFile([...selectedFile, { id: nextid++, file: file }]);
//     if (file) {
//       const src = URL.createObjectURL(file);
//       setVideoSrc(src);
//       console.log("Video src", src);
//     }
//   };

//   // Handle submit (upload file to S3 and process it)
//   const handleSubmit = async () => {
//     console.log("selected file", selectedFile);
//     selectedFile.map(async (file) => {
//       console.log("file before submit", file.file);
//       console.log("filname", file.file.name);

//       const response = await axios({
//         method: "GET",
//         url: API_ENDPOINT + `?userId=${user.id}`,
//       });
//       console.log("response.data.uploadURL: ", response.data.uploadURL);
//       console.log("response.data: ", response.data);
//       console.log("file.file", file.file.name);
//       const result = await fetch(response.data.uploadURL, {
//         method: "PUT",
//         body: file.file,
//       });

//       console.log("User details", user.id, response.data.filename);
//       console.log("Result", result);

//       // Open WebSocket connection if not already established
//       if (!connectionId) {
//         const websocket_url = `wss://l71crjoo87.execute-api.us-east-1.amazonaws.com/production/?userId=${user.id}`;
//         wsRef.current = new WebSocket(websocket_url);

//         wsRef.current.onopen = () => {
//           console.log('WebSocket connected');
//         };
//         console.log('WebSocket readyState:', wsRef.current.readyState);


//         wsRef.current.onmessage = (evt) => {
//           console.log('WebSocket readyState inside on message:', wsRef.current.readyState);

//           console.log("In on message", evt.data)
//           const message = JSON.parse(evt.data);
//           console.log("inside on message", message.result);
//           setItems((prevItems) => [...prevItems, message.result]);
//         };

//         // Store connectionId after first WebSocket connection
//         setConnectionId(true);
//       } else {
//         console.log("Reusing existing WebSocket connection");
//       }
//     });

//     setSelectedFile([]);
//   };

//   // Handle sign-out and WebSocket disconnection
//   const handleSignOut = async () => {
//     // Close the WebSocket connection
//     if (wsRef.current) {
//       wsRef.current.close();
//       console.log('WebSocket closed');
//     }

//     // Call the WebSocket disconnect Lambda function to remove the connection ID from DynamoDB
//     // try {
//     //   const response = await axios.post('YOUR_DISCONNECT_LAMBDA_URL', {
//     //     userId: user.id,
//     //     connectionId: wsRef.current?.connectionId,  // Pass the current connectionId
//     //   });
//     //   console.log('WebSocket disconnect response:', response.data);
//     // } catch (error) {
//     //   console.error('Error during WebSocket disconnect:', error);
//     // }

//     // Sign out the user using Clerk
//     await signOut();
//   };

//   useEffect(() => {
//     // Cleanup WebSocket connection when component is unmounted or user signs out
//     return () => {
//       if (wsRef.current) {
//         wsRef.current.close();
//         console.log('WebSocket closed on cleanup');
//       }
//     };
//   }, []);

//   console.log("result", items);
//   return (
//     <div className='Face App'>
//       <NaviBar />
//       <div className="cardcontainer flex justify-center items-center h-screen">
//         Hello {user.fullName}
//         <div className="mx-auto bg-black" style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//           <Card variant="outlined" style={{
//             width: '300px', height: "auto", backgroundColor: '#FFFFFF',
//             borderRadius: 20,
//             padding: 16,
//             boxShadow: "3px 3px 3px 3px",
//             shadowColor: '#000000',
//             shadowOffset: { width: 10, height: 10 },
//             shadowOpacity: 1,
//             shadowRadius: 10,
//             marginTop: 80,
//           }}>
//             <CardContent className="Carditem">
//               <h2 className='text-center text-lg'>Face Recognition</h2>
//               <div className="upload-send">
//                 <Button
//                   component="label"
//                   variant="contained"
//                   startIcon={<CloudUploadIcon />}
//                   className="mt-4"
//                 >
//                   Upload Video
//                   <VisuallyHiddenInput
//                     accept="video/*"
//                     type="file"
//                     onChange={handleUpload}
//                   />
//                 </Button>

//                 {videoSrc && (
//                   <div className="mt-10" style={{ marginTop: '1em', display: "flex", justifyContent: "center", flexDirection: "column" }}>
//                     {selectedFile.map(file => (
//                       <li style={{ listStyleType: 'none', marginTop: '0.2em', marginLeft: "0.9em" }} key={file.id}>
//                         <button style={{ marginRight: "1em" }} onClick={() => {
//                           setSelectedFile(
//                             selectedFile.filter(f =>
//                               f.id !== file.id
//                             )
//                           );
//                         }}>
//                           X
//                         </button>
//                         {file.file.name}{' '}
//                       </li>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="Sendbutton">
//                 <Button variant="contained" onClick={handleSubmit} endIcon={<SendIcon />} color="success">
//                   Send
//                 </Button>
//               </div>

//             </CardContent>

//           </Card>
//         </div>
//       </div>

//       <div className="Tablecontainer">
//         <h1 className="text-2xl font-bold mb-4">User Table</h1>
//         <ResTable columns={columns} data={items} />
//       </div>

//       <div className="signout-container">
//         <Button variant="outlined" onClick={handleSignOut}>
//           Sign Out
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Face;

// import React, { useState, useRef, useEffect } from 'react';
// import './App.css';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import SendIcon from '@mui/icons-material/Send';
// import NaviBar from './NaviBar';
// import './Face.css';
// import ResTable from './ResTable';
// import { Amplify } from 'aws-amplify';
// import { signOut, getCurrentUser } from 'aws-amplify/auth';

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

// const columns = [
//   { Header: 'Result', accessor: 'result' },
// ];

// function Face() {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [selectedFile, setSelectedFile] = useState([]);
//   const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
//   const [connectionId, setConnectionId] = useState(null);
//   const [items, setItems] = useState([]);
//   const wsRef = useRef(null);

//   const [user, setUser] = useState(null);
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   // Fetch the current user on component mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const currentUser = await getCurrentUser();
//         console.log("Cognito User:", currentUser);
//         setUser({
//           id: currentUser.username,
//           fullName: currentUser.attributes?.name || currentUser.username,
//         });
//         setIsSignedIn(true);
//       } catch (error) {
//         console.log("No user is signed in.", error);
//         setIsSignedIn(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Handle file upload
//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     console.log("file", file);
//     setSelectedFile([...selectedFile, { id: nextid++, file: file }]);
//     if (file) {
//       const src = URL.createObjectURL(file);
//       setVideoSrc(src);
//       console.log("Video src", src);
//     }
//   };

//   // Handle submit (upload file to S3 and process it)
//   const handleSubmit = async () => {
//     console.log("selected file", selectedFile);
//     selectedFile.map(async (file) => {
//       console.log("file before submit", file.file);
//       console.log("filename", file.file.name);

//       const response = await axios({
//         method: "GET",
//         url: `${API_ENDPOINT}?userId=${user.id}`,
//       });
//       console.log("response.data.uploadURL: ", response.data.uploadURL);
//       const result = await fetch(response.data.uploadURL, {
//         method: "PUT",
//         body: file.file,
//       });

//       console.log("User details", user.id, response.data.filename);
//       console.log("Result", result);

//       if (!connectionId) {
//         const websocket_url = `wss://l71crjoo87.execute-api.us-east-1.amazonaws.com/production/?userId=${user.id}`;
//         wsRef.current = new WebSocket(websocket_url);

//         wsRef.current.onopen = () => {
//           console.log('WebSocket connected');
//         };

//         wsRef.current.onmessage = (evt) => {
//           const message = JSON.parse(evt.data);
//           console.log("WebSocket Message:", message.result);
//           setItems((prevItems) => [...prevItems, message.result]);
//         };

//         setConnectionId(true);
//       } else {
//         console.log("Reusing existing WebSocket connection");
//       }
//     });

//     setSelectedFile([]);
//   };

//   // Handle sign-out
//   const handleSignOut = async () => {
//     if (wsRef.current) {
//       wsRef.current.close();
//       console.log('WebSocket closed');
//     }

//     try {
//       await signOut();
//       setIsSignedIn(false);
//       setUser(null);
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (wsRef.current) {
//         wsRef.current.close();
//         console.log('WebSocket closed on cleanup');
//       }
//     };
//   }, []);

//   return (
//     <div className='Face_App'>
//       {/* <NaviBar /> */}
//       <div className="cardcontainer flex justify-center items-center h-screen">
//         {isSignedIn ? (
//           <>
//             Hello {user.fullName}
//             <div
//               className="mx-auto bg-black"
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <Card
//                 variant="outlined"
//                 style={{
//                   width: '300px',
//                   backgroundColor: '#FFFFFF',
//                   borderRadius: 20,
//                   padding: 16,
//                   boxShadow: "3px 3px 3px 3px",
//                   marginTop: 80,
//                 }}
//               >
//                 <CardContent className="Carditem">
//                   <h2 className='text-center text-lg'>Face Recognition</h2>
//                   <div className="upload-send">
//                     <Button
//                       component="label"
//                       variant="contained"
//                       startIcon={<CloudUploadIcon />}
//                       className="mt-4"
//                     >
//                       Upload Video
//                       <VisuallyHiddenInput
//                         accept="video/*"
//                         type="file"
//                         onChange={handleUpload}
//                       />
//                     </Button>

//                     {videoSrc && (
//                       <div className="mt-10" style={{ marginTop: '1em' }}>
//                         {selectedFile.map(file => (
//                           <li key={file.id}>
//                             <button onClick={() => {
//                               setSelectedFile(selectedFile.filter(f => f.id !== file.id));
//                             }}>
//                               X
//                             </button>
//                             {file.file.name}{' '}
//                           </li>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   <div className="Sendbutton">
//                     <Button
//                       variant="contained"
//                       onClick={handleSubmit}
//                       endIcon={<SendIcon />}
//                       color="success"
//                     >
//                       Send
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </>
//         ) : (
//           <h1>Please sign in</h1>
//         )}
//       </div>

//       <div className="Tablecontainer">
//         <h1 className="text-2xl font-bold mb-4">User Table</h1>
//         <ResTable columns={columns} data={items} />
//       </div>

//       <div className="signout-container">
//         {isSignedIn && (
//           <Button variant="outlined" onClick={handleSignOut}>
//             Sign Out
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import './Face.css';
import ResTable from './ResTable';
import { signOut, getCurrentUser } from 'aws-amplify/auth';

let nextid = 0;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

const columns = [
  { Header: 'Result', accessor: 'result' },
];

function Face() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState([]);
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [items, setItems] = useState([]);
  const wsRef = useRef(null);
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const websocket_api = process.env.REACT_APP_WEBSOCKET_URL;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser && currentUser.signInDetails.loginId) {
          const email = currentUser.signInDetails.loginId;

          setUser({
            id: currentUser.username,
            fullName: email.split('@')[0],
            email: email,
          });
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.log("No user is signed in.", error);
        setIsSignedIn(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile([...selectedFile, { id: nextid++, file: file }]);
    if (file) {
      const src = URL.createObjectURL(file);
      setVideoSrc(src);
    }
  };

  const handleSubmit = async () => {
    selectedFile.map(async (file) => {
      const response = await axios({
        method: "GET",
        url: `${API_ENDPOINT}?userId=${user.id}`,
      });
      await fetch(response.data.uploadURL, {
        method: "PUT",
        body: file.file,
      });

      if (!wsRef.current) {
        const websocket_url = `${websocket_api}?userId=${user.id}`;
        wsRef.current = new WebSocket(websocket_url);

        wsRef.current.onopen = () => console.log('WebSocket connected');
        wsRef.current.onmessage = (evt) => {
          const message = JSON.parse(evt.data);
          setItems((prevItems) => [...prevItems, message.result]);
        };
      }
    });
    setSelectedFile([]);
  };

  const handleSignOut = async () => {
    if (wsRef.current) wsRef.current.close();
    try {
      await signOut();
      setIsSignedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  return (
    <div className="Face_App">
      {/* Header Section */}
      <div className="header">
        <h1>Face Recognition App</h1>
        <p>Upload a video to analyze and get results</p>
      </div>

      {isSignedIn ? (
        <>
          {/* User Info */}
          <div className="user-info">
            <div className="greeting">
              Hello, <span className="username">{user.fullName}</span>
            </div>
            <Button
              variant="contained"
              onClick={handleSignOut}
              className="signout-button"
            >
              Sign Out
            </Button>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <h2>Upload Your Video</h2>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              className="upload-button"
              style={{marginBottom:"1rem"}}
            >
              Upload Video
              <VisuallyHiddenInput
                accept="video/*"
                type="file"
                onChange={handleUpload}
              />
            </Button>

            {selectedFile.length > 0 && (
              <ul className="file-list">
                {selectedFile.map((file) => (
                  <li key={file.id} className="file-item">
                    <span>{file.file.name}</span>
                    <button
                      onClick={() =>
                        setSelectedFile(selectedFile.filter((f) => f.id !== file.id))
                      }
                      className="remove-btn"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <Button
              variant="contained"
              onClick={handleSubmit}
              endIcon={<SendIcon />}
              color="success"
              className="send-button"
              style={{marginTop:"1rem"}}
            >
              Send
            </Button>
          </div>
        </>
      ) : (
        <h2>Please sign in to continue</h2>
      )}

      {/* Table Section */}
      <div className="Tablecontainer">
        <ResTable columns={columns} data={items} />
      </div>
    </div>
  );
}

export default Face;
