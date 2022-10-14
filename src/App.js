import {Routes, Route} from "react-router-dom";
import "../src/Style/global.scss"
import 'bootstrap/dist/css/bootstrap.css';
import "../src/Component/Home/style/style.scss"
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import Home from "./Component/Home/Home";
import Error404 from "./Component/Error/Error404/Error404";
import { wrapper } from "./Redux/store";
function App() {

  return (
      <>
          <Routes>
              <Route index element={<Home/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="*" element={<Error404/>}/>
          </Routes>
          <NotificationContainer/>
      </>
  );
}

export default wrapper.withRedux(App);