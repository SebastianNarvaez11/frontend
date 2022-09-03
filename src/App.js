import Router from "./router/Router";
import { Provider } from 'react-redux'
import store from './redux/store'
import { initAxiosInterceptors } from './helpers/axiosInterceptors'

initAxiosInterceptors()

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
