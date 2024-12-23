import { Button, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  color: '#6C5DD3',
  textTransform: 'none',
  padding: '10px 24px',
  borderRadius: '12px',
  fontSize: '15px',
  fontWeight: 600,
  border: '1px solid #6C5DD3',
  '&:hover': {
    backgroundColor: '#F7F5FF',
    borderColor: '#5648B2',
    color: '#5648B2',
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
    borderColor: theme.palette.action.disabled,
  },
}));

export interface SecondaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton variant="outlined" {...props}>
      {children}
    </StyledButton>
  );
};
