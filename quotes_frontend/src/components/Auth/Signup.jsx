// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import authService from "../../services/authService";

// const Signup = () => {
//   const [registerformData, setRegisterFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setRegisterFormData({
//       ...registerformData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await authService.signup(registerformData);

//       if (response.status === 201) {
//         console.log("User registered successfully");
//         notify();
//       } else {
//         console.error("Failed to register user");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//     }
//   };

//   const notify = () => toast("User Registered Successfully👏");

//   return (
//     <div
//       className=" container d-flex justify-content-center align-items-center vh-100 p-5"
//       style={{ padding: "10px" }}
//     >
//       <div
//         className="card p-4"
//         style={{
//           display: "flex",
//           backgroundColor: "#8ec777",
//           width: "43rem",
//           borderRadius: "10px",
//           boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//         }}
//       >
//         <h2 className="card-title text-left mb-4">SignUp</h2>
//         <form onSubmit={handleSignup}>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               id="first_name"
//               placeholder="Enter your First Name"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               id="last_name"
//               placeholder="Enter your Last Name"
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group mb-3">
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               placeholder="Enter Email: example@email.com"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group mb-3">
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter Password"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <ToastContainer />
//             <div className="buttonset">
//               <button
//                 type="submit"
//                 className="btn btn-primary mr-5 px-0.5 py-2"
//               >
//                 Signup
//               </button>
//               <Link to="/login">
//                 <button className="btn btn-warning px-3 py-2">Login</button>
//               </Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from "../../services/authService";

const Signup = () => {

  const [registerformData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setRegisterFormData({
      ...registerformData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.signup(registerformData)
      
      if (response.status === 201) {
        console.log(registerformData)
        console.log("User registered successfully");
        notify()
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const notify = () => toast("User Registered Successfully👏");

  
  
  return (
<div className=" container d-flex justify-content-center align-items-center vh-100 p-5" style={{ padding: "10px" }}>
      <div className="card p-4" style={{ display: "flex", backgroundColor: "#8ec777", width: "43rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <h2 className="card-title text-left mb-4">SignUp</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input type="text" className="form-control" id="first_name" placeholder="Enter your First Name" onChange={handleChange} required/>
          </div>

          <div className="form-group mb-3">
            <input type="text" className="form-control" id="last_name" placeholder="Enter your Last Name" onChange={handleChange} required/>
          </div>
          <div className="form-group mb-3">
            <input type="email" className="form-control" id="email" placeholder="Enter Email: example@email.com" onChange={handleChange} required/>
          </div>

          <div className="form-group mb-3">
            <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={handleChange} required/>
          </div>

          <div>
              <ToastContainer />
            <div className="buttonset">
              <button type="submit" className="btn btn-primary mr-5 px-0.5 py-2">Signup</button>
              <Link to="/login">
                <button className="btn btn-warning px-3 py-2">Login</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Signup;
