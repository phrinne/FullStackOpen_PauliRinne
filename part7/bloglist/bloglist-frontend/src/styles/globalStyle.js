import { createGlobalStyle } from 'styled-components'

export const theme = {
  primary: '#286382',
  bg: '#fff',
  textColor: '#000',
  invertedTextColor: '#fff',
  borderRadius: '0.5rem',
  success: '#3A8E4B',
  error: '#750A17'
}

const GlobalStyle = createGlobalStyle`
  body {
    max-width: 50rem;
    margin: 0 auto;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`

export default GlobalStyle