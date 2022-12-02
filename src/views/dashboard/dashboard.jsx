import { useContext, useEffect } from 'react';
import './dashboard.css';
import { DataContext } from "../../context/userContext";
import { HiOutlineMenu, HiOutlineHome, HiOutlineDocumentText, HiOutlineChartBar, HiOutlineChatAlt2, HiOutlineCalendar, HiOutlineAtSymbol, HiOutlineInboxIn, HiOutlineLightningBolt } from "react-icons/hi";
// import RegisterForm from '../register/registerForm'
import HomePage from '../../components/homePage/homePage'
import FormTablePage from '../../components/formTablePage/formTablePage';

const Dashboard = () => {

  //set to global state 
  const { user, handelSession, setHDL, Handleonclick } = useContext(DataContext);

  useEffect(() => {
    handelSession();
    // editHDL("home");
  }, []);

  //role system (disable) and nav logic (active classname)
  //candidate and admin use everything
  //coordinator H,T,E,C,T
  //leader H,P

  const SelectionView = () => {
    switch (Handleonclick) {
      case "home":
        return <HomePage />;
      case "formTable":
        return (
          <>
            <FormTablePage />
          </>
        );
      default:
        return <HomePage/>;
    }
  };



  return (
    <>
      <input type="checkbox" id="nav__toggle" />
      <div className="sidebar">
        <div className="sidebar__brand">
          <h1> <HiOutlineAtSymbol size={40} />  <span>PoliticApp</span>
          </h1>
        </div>

        <div className="sidebar__menu">
          <ul>
            <li>
              <div className={`${Handleonclick === 'home' ? "active" : ""} itemMenu`} onClick={() => setHDL('home')} >
                <HiOutlineHome size={25} className="icon" />
                <span>Incio</span>
              </div>
            </li>
            <li>
              <div className={`${Handleonclick === 'formTable' ? "active" : ""} itemMenu`} onClick={() => setHDL('formTable') }>
                <HiOutlineDocumentText size={25} className='icon' />
                <span>Planillas</span>
              </div>
            </li>
            <li>
              <div className="itemMenu">
                <HiOutlineChartBar size={25} className='icon' />
                <span>Estadisticas</span>
              </div>
            </li>
            <li>
              <div className="itemMenu">
                <HiOutlineCalendar size={25} className='icon' />
                <span>Eventos</span>
              </div>
            </li>
            <li>
              <div className="itemMenu">
                <HiOutlineChatAlt2 size={25} className='icon' />
                <span>Comunicaciones</span>
              </div>
            </li>
            <li>
              <div className="itemMenu">
                <HiOutlineInboxIn size={25} className='icon' />
                <span>Testigos Electorales</span>
              </div>
            </li>
            <li>
              <div className="itemMenu">
                <HiOutlineLightningBolt size={25} className='icon' />
                <span>Extra</span>
              </div>
            </li>
          </ul>

        </div>
      </div>

      <div className="main__content">
        <header>
          <h2>
            <label htmlFor="nav__toggle">
              <HiOutlineMenu size={30} className="iconHeader" />
            </label>
            Dashboard
          </h2>

          <div className="user__wrapper">
            <div className='iconConteainer'>
              {user?.name
                ? `${user?.name
                  .substring(0, 1)
                  .toUpperCase()}${user?.surnames
                    .substring(0, 1)
                    .toUpperCase()}`
                : "JD"}

            </div>
            <div className="">
              <h4>{user?.name + " " + user?.surnames}</h4>
              <small>Role [{user?.role}]</small>
            </div>
          </div>
        </header>

        <main>
        <SelectionView/>
        </main>
      </div>
    </>
  )
}

export default Dashboard