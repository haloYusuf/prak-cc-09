import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

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

const SuccessMessage = styled.div`
  background-color: #e3f7ea;
  color: #2d8a59;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
`;

const LoginPage = ({ onLoginSuccess }) => {
  const location = useLocation();
  const message = location.state?.message;
  
  return (
    <PageContainer>
      <FormContainer>
        <Title>Welcome Back!</Title>
        <Subtitle>Sign in to continue to your account</Subtitle>
        
        {message && <SuccessMessage>{message}</SuccessMessage>}
        
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </FormContainer>
    </PageContainer>
  );
};

export default LoginPage;