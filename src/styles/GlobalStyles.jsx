import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f9fafc;
    color: #333;
    line-height: 1.6;
  }
  
  button, input, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyles;

// styles/AuthStyles.jsx
import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

export const AuthCard = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 40px;
  width: 100%;
  max-width: 480px;
`;

export const AuthTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

export const AuthSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  text-align: center;
`;