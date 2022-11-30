import { useContext, useEffect } from 'react';
import './dashboard.css';
// import { Segment, Menu } from 'semantic-ui-react'
import { DataContext } from "../../context/userContext";
import HeaderDashBoard from '../../components/headerDashBoard/headerDashBoard';
// import RegisterForm from '../register/registerForm'

const Dashboard = () => {

  //set to global state 
  const { user, handelSession } = useContext(DataContext);

  useEffect(() => {
    handelSession();
    // editHDL("home");
  }, []);

  return (
    <>
      <div className='background'>

        <HeaderDashBoard user={user} />
        {user?.name}

        {/* <Segment>
        <RegisterForm/>
      </Segment> */}


      </div>
    </>
  )
}

export default Dashboard