import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9fafc;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 40px;
  width: 100%;
  max-width: 480px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  text-align: center;
`;

const RegisterPage = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  
  const handleRegisterSuccess = () => {
    // Call the prop if provided
    if (onRegisterSuccess) {
      onRegisterSuccess();
    }
    
    // Redirect to login page after successful registration
    navigate('/login', { 
      state: { 
        message: 'Registration successful. Please log in with your new account.' 
      } 
    });
  };
  
  return (
    <PageContainer>
      <FormContainer>
        <Title>Create Account</Title>
        <Subtitle>Join us today and get started</Subtitle>
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      </FormContainer>
    </PageContainer>
  );
};

export default RegisterPage;