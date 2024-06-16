import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
)
