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

const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </InputGroup>
      
      <ButtonContainer>
        <Button 
          type="submit" 
          fullWidth 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </ButtonContainer>
      
      <LinkText>
        Don't have an account? <Link to="/register">Register here</Link>
      </LinkText>
    </Form>
  );
};

export default LoginForm;