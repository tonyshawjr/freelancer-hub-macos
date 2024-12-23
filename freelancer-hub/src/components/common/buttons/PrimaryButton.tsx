import { Button, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#6C5DD3',
  color: '#FFFFFF',
  textTransform: 'none',
  padding: '10px 24px',
  borderRadius: '12px',
  fontSize: '15px',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#5648B2',
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton variant="contained" {...props}>
      {children}
    </StyledButton>
  );
};
