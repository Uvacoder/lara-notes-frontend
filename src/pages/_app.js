import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
          <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
