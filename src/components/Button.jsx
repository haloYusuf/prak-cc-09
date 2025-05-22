import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.variant === 'primary' ? '#4e7cff' : '#fff'};
  color: ${props => props.variant === 'primary' ? '#fff' : '#4e7cff'};
  border: 2px solid ${props => props.variant === 'primary' ? 'transparent' : '#4e7cff'};
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.variant === 'primary' ? '#3a6aee' : '#f0f5ff'};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Button = ({ children, variant = 'primary', fullWidth = false, ...props }) => {
  return (
    <StyledButton variant={variant} fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;