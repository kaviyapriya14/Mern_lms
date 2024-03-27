import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import CartPage from './Cart'; 
import QuestionsWithOptions from './teaching_experience';
import { ToastContainer } from 'react-toastify';
import CourseCreation from './courses_dashboard';
import CourseForm from './courseForm';
import IntendedLearner from './intended_learner';
import SectionForm from './SectionForm';
import TeachOnUdemyDashboard from './teach_on_udemy_dashboard';
import LecturePreviewPage from './LecturePreviewPage';
import CourseLandingPage from './CourseLandingPage';
import CourseLandingPreview from './CourseLandingPreview';
import PriceForm from './Price';
import Checkout from './Checkout';
import ViewPage from './viewPage'; 

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    setCartItems([...cartItems, course]);
  };
  
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item._id !== itemId));
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home addToCart={addToCart} cartItems={cartItems} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/teach-on-udemy" element={<TeachOnUdemyDashboard />} />
        <Route path="/teaching_experience" element={<QuestionsWithOptions />} />
        <Route path="/course" element={<CourseCreation />} />
        <Route path="/teach" element={<CourseForm />} />
        <Route path="/intended/:courseId" element={<IntendedLearner />} />
        <Route path="/curriculum/:courseId" element={<SectionForm />} />
        <Route path="/intended-learner" element={<IntendedLearner />} />
        <Route path="/preview/:courseId/:lectureIds/:sectionIds" element={<LecturePreviewPage />} />
        <Route path="/courselanding/:courseId/:lectureIds/:sectionIds" element={<CourseLandingPage />} />
        <Route path="/section-form/:courseId" element={<IntendedLearner />} />
        <Route path="/courselandingpreview/:savedCourseLandingId/:courseId/:sectionIds/:lectureIds" element={<CourseLandingPreview />} />
        <Route path="/pricing/:courseId/:lectureIds/:sectionIds/:savedCourseLandingId" element={<PriceForm />} />
        <Route path="/checkout" element={<Checkout />} />
<Route path="/courses/:id" element={<ViewPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
