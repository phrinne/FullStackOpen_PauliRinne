import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.theme.primary};
  color: ${props => props.theme.invertedTextColor};
  border: none;

  font-size: 1rem;
  margin: 1rem 0rem;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius};
`

export const SecondaryButton = styled(Button)`
  background: ${props => props.theme.bg};
  color: ${props => props.theme.primary};
  border: 2px solid;
  border-color: ${props => props.theme.primary};
`

export const SmallButton = styled(Button)`
  font-size: 1rem;
  margin: 0;
  padding: 0.5rem 1rem;
`
//border-color: ${props => props.secondary?props.theme.primary:'none'};
//border-style: ${props => props.secondary?'1px solid':'none'};
/*background: ${props => props.secondary?props.theme.bg:props.theme.primary};
color: ${props => props.secondary?props.theme.primary:props.theme.invertedTextColor};
border: 2px solid ${props => props.theme.primary}*/

export default Button