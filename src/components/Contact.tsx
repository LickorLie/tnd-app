import React, { useState } from 'react';
import Button from './Button';
import { supabase } from '../utils/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'idea'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Insert form data into Supabase
    supabase
      .from('contact')
      .insert([formData])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error submitting form:', error);
          alert('There was an error submitting your message. Please try again later.');
        } else {
          console.log('Form submitted successfully:', data);
          alert('Thank you for your message! We will get back to you soon.');
          setFormData({ name: '', email: '', message: '', type: 'idea' });
        }
      }
      );
    console.log('Form submitted:', formData);
    // alert('Thank you for your message! We will get back to you soon.');
    // setFormData({ name: '', email: '', message: '', type: 'idea' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="type" className="block mb-1">Message Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="idea">Idea</option>
            <option value="bug">Bug Report</option>
            <option value="question">Question</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
          ></textarea>
        </div>
        <Button type="submit" color="purple">Send Message</Button>
      </form>
    </div>
  );
};

export default Contact;