import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PriceForm.css';

const PriceForm = () => {
  const { courseId, lectureIds, sectionIds, savedCourseLandingId } = useParams();
  const [currency, setCurrency] = useState('USD');
  const [priceTier, setPriceTier] = useState('Free');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/prices', {
        savedCourseLandingId,
        currency,
        priceTier,
      });
      toast.success('Price set successfully');
    } catch (error) {
      console.error('Error setting price:', error);
      toast.error('Failed to set price');
    }
  };

  return (

    <div>
      <header className='headers'>
        <h2>Udemy</h2>
      </header>
      <div className="price-form-container">
        <div>
          <h2>Pricing</h2>
          <hr></hr>
          <h4>Set price for course</h4>
          <p>Set a price for your course
            Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests can not be free.</p>
        </div>
        <form onSubmit={handleSubmit} className="price-form">
          <div className="form-group">
            <label htmlFor="currency">Currency:</label>
            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price-tier">Price Tier:</label>
            <select id="price-tier" value={priceTier} onChange={(e) => setPriceTier(e.target.value)}>
              <option value="Free">Free</option>
              <option value="$19.99">$19.99(tier 1)</option>
              <option value="$22.99">$22.99(tier 2)</option>
              <option value="$24.99">$24.99(tier 3)</option>
              <option value="$27.99">$27.99(tier 4)</option>
              <option value="$29.99">$29.99(tier 5)</option>
              <option value="$34.99">$34.99(tier 6)</option>
              <option value="$39.99">$39.99(tier 7)</option>
              <option value="$44.99">$44.99(tier 8)</option>
              <option value="$49.99">$49.99(tier 9)</option>
              <option value="$54.99">$54.99(tier 10)</option>

            </select>
          </div>
          <button type="submit" className="submit-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PriceForm;
