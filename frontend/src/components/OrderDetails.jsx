import { Checkbox } from 'antd';
import React, { useState } from 'react';
import '../styles/orderdetails.scss'


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // code to submit form data to server-side script goes here
  };

  return (
    <section className='order'>
      <h4>Order Details</h4>
      <form className='order-form' onSubmit={handleSubmit}>
        <table>
        <tr classname="item">
        <td>
        <label htmlFor="name">Name  </label>
        </td>
        <td>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </td>
        </tr>
        <tr classname="item">
        <td>
        <label htmlFor="email">Email</label>
        </td>
        <td>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        
        </td>
        </tr>
        <tr classname="item">
        <td>
        <label htmlFor="address">Address</label>
        </td>
        <td>
        <textarea id="address" name="address" value={formData.address} onChange={handleChange} required/>
        </td>
        </tr>
        <tr classname="item">
        <td>
        <label htmlFor="phone">Phone</label>
        </td>
        <td>
        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required/>
        </td>
        </tr>
        </table>

      <table>
        <tr>
          <td>
        <input className="form-check" type="checkbox" value=""  />
        </td>
        <td>
        <label htmlFor="Remember me!">I agree and acccept all the terms and conditions</label>
        </td>
        </tr>
        </table>
        <button style={{padding:"10px",maxWidth:"200px", backgroundColor:"gray", color:"white", borderRadius:"10px", marginTop:"10px"}} type="submit">Send</button>
      </form>
    </section>
  );
}

export default Contact;
