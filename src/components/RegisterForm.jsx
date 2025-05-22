import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4e7cff;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  
  a {
    color: #4e7cff;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #3a6aee;
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
`;

const RegisterForm = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onRegisterSuccess();
      }, 1500);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
      </InputGroup>
      
      <ButtonContainer>
        <Button 
          type="submit" 
          fullWidth 
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </Button>
      </ButtonContainer>
      
      <LinkText>
        Already have an account? <Link to="/login">Login here</Link>
      </LinkText>
    </Form>
  );
};

export default RegisterForm;