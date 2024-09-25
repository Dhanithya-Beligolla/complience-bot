import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState}  from 'react'
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo-dfccbank.png';
import Footer from './Footer';


function RegisterPage() {

    const navigate = useNavigate();


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await createUserWithEmailAndPassword(auth, email, password1);
          const user = auth.currentUser;
          console.log("User created successfully");
          console.log(user);
      
          if (user) {
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              firstName: firstName,
              lastName: lastName,
              mobile: mobile,
              password1: password1
            });
          }
          toast.success("User created successfully", { position: "top-center" });
          navigate('/login');
        } catch (error) {
          console.log(error);
          toast.error(error.message, { position: "bottom-center" });
        }
      };

    // Function to check password strength
    const checkPasswordStrength = (password) => {
      let strength = 0;
  
      // Check for uppercase letters
      if (/[A-Z]/.test(password)) strength++;
  
      // Check for lowercase letters
      if (/[a-z]/.test(password)) strength++;
  
      // Check for numbers
      if (/[0-9]/.test(password)) strength++;
  
      // Check for special characters
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      if (password.length < 8) strength = 0;
  
      switch (strength) {
          case 4:
              return 'Strong';
          case 3:
              return 'Medium';
          case 0:
              return 'Password must be at least 8 characters long';
          default:
              return 'Weak';
      }
    };

    const handlePasswordChange = (e, setPassword2, password1) => {
        setPassword2(e.target.value);
        if (e.target.value !== password1) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
        }
    };

  return (
    <div className="background-image">
        <div className="logo-image">
          <img src={logo} alt="DFCC Bank Logo" />
        </div>
        <br />
        <br />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <form style={{ backgroundColor: '#314250' }} onSubmit={handleSubmit} className="border border-gray-400 w-[30rem] p-5 flex flex-col gap-5 rounded-md shadow-md shadow-gray-400 m-5 lg:-0">

                <h1 className="text-center text-xl font-medium">Registration Form</h1>

                <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id='firstName' type="text" placeholder="First Name" pattern="[A-Za-z\s]{1,15}" title="First name should contain letters and spaces up to 15 characters" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id='lastName' type="text" placeholder="Last Name" pattern="[A-Za-z\s]{1,15}" title="Last name should contain letters and spaces up to 15 characters" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id='mobile' type="tel" placeholder="Mobile" pattern="0[0-9]{9}" title="Phone number should start with 0 and contain 10 digits" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id='email' type="email" placeholder="Email" pattern=".+@dfccbank\.com" title="Email should be a DFCCGmail address (someone@dfccbank.com)" value={email} onChange={(e) => setEmail(e.target.value)} required />
               

                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="pass1"
                        placeholder='Password'
                        type={showPassword ? 'text' : 'password'}
                        value={password1}
                        onChange={(e) => {
                            setPassword1(e.target.value);
                            setPasswordStrength(checkPasswordStrength(e.target.value));
                        }}
                    />
                    {/* Display password strength */}
                    <div className={passwordStrength.toLowerCase()}>Password Strength: {passwordStrength}</div>

                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="pass2"
                        placeholder='Confirm Password'
                        type={showPassword ? 'text' : 'password'}
                        value={password2}
                        onChange={(e) => handlePasswordChange(e, setPassword2, password1)}
                    />
                    {passwordError && <div className="error text-red-500">{passwordError}</div>}
                    {/* Show password checkbox */}
                    <div>
                        <input
                            id="check"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            value={showPassword}
                            onChange={() => setShowPassword((prev) => !prev)}
                        />
                        <label htmlFor="check">Show password</label>
                    </div>
                
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                </p>
            </form>
        </div>
        < Footer />
    </div>
  )
}

export default RegisterPage
