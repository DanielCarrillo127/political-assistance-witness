import React, { useEffect, useState, useContext } from 'react'
import Cards from '../cardsHighlights/cards'
import { HiOutlineDocumentAdd, HiOutlineUserGroup, HiOutlineClipboardCheck, HiOutlineInboxIn } from "react-icons/hi"; //HiOutlineClipboardCheck
import "./homePage.css"
// import { getCountData, getAllVotersByLeaderApi } from '../../api/requestUsers';
import { getGeneralStatusApi } from '../../api/requestRegisterVote';
import { List, FlexboxGrid, Progress } from 'rsuite';
import { DataContext } from '../../context/userContext';
import { candidatesInfo } from '../../utils/constant'
import ProfileCard from './profileCard'


const TOTAL_TABLES = process.env.REACT_APP_TOTAL_TABLES
const TOTAL_VOTERS = process.env.REACT_APP_TOTAL_VOTERS


const HomePage = () => {

  const { user } = useContext(DataContext);
  const [stats, setStats] = useState({})
  const [votesByCandidate, setVotesByCandidate] = useState([])

  // async function fetchData() {
  //   if (user.role !== 'LEADER') {
  //     const resAllData = await getCountData(user?.cedula);
  //     if (resAllData?.status === 200) {
  //       setData(resAllData?.data?.result)
  //     } else {
  //       setData([])
  //     }
  //   } else if (user.role === 'LEADER') {
  //     const resAllData = await getAllVotersByLeaderApi(user?.cedula, user?.cedula);
  //     if (resAllData?.status === 200) {
  //       setData(resAllData?.data?.result)
  //     } else {
  //       setData([])
  //     }
  //   }

  // }
  // useEffect(() => {
  //     if(data.length === 0 && user !== null){
  //       fetchData()
  //     }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  async function fetchData() {
    if (user !== null) {
      const resAllData = await getGeneralStatusApi(user?.cedula);
      if (resAllData?.status === 200) {
        const { votesByCandidate, ...rest } = resAllData?.data;
        setStats(rest)
        // votesByCandidate
        const mergeData = votesByCandidate.map((candidate) => {
          return Object.assign({}, candidate, { img: candidatesInfo[candidate?.index - 1]?.img, politicalParty: candidatesInfo[candidate?.index - 1]?.politicalParty, color: candidatesInfo[candidate?.index - 1]?.color });
        })
        setVotesByCandidate(mergeData)

      } else {
        setStats({})
        setVotesByCandidate([])
      }
    }
  }
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    height: '60px'
  };
  const slimText = {
    fontSize: '0.966em',
    color: '#97969B',
    fontWeight: 'lighter',
  };
  const titleStyle = {
    whiteSpace: 'nowrap',
    fontWeight: 500
  };

  const style = {
    width: 120,
    display: 'inline-block',
    marginRight: 10
  };


  return (
    <>
      {/* <div className="cards">
        {user.role === 'LEADER' ?
          <>
            <Cards title={`Votantes Registrados por el líder`} number={data.length > 0 ? data.length : 0} icon={<HiOutlineClipboardCheck size={50} />} />
            <div className="card__single">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexDirection: 'column' }}>
                <span>Acceso al formulario de inscripción.</span>
                <button className='button_register' onClick={() => { window.open(`${window.location.origin}/registerForm?leaderid=${user?.cedula}`, '_blank') }}>Registro de Votantes</button>
              </div>
            </div>
          </>
          :
          <>
            <Cards title="Coordinadores Activos" number={data?.activeCoordinators ? data?.activeCoordinators : 0} icon={<HiOutlineDocumentAdd size={50} />} />
            <Cards title="Lideres Activos" number={data?.activeLeaders ? data?.activeLeaders : 0} icon={<HiOutlineUserGroup size={50} />} />
            <Cards title={`Votantes Registrados`} number={data?.voters ? data?.voters : 0} icon={<HiOutlineClipboardCheck size={50} />} />
            <Cards title="Porcentaje de éxito vs la meta proyectada (3000)" number={data?.voters ? Math.round((data?.voters / 3000) * 100) + "%" : '0%'} icon={<HiOutlineClipboardCheck size={50} />} />
          </>
        }
      </div> */}
      <div className="home__grid">
        <div className="container__component">
          <div className='stats__container'>
            <div className='stats__left'>
              <div className='stats__left__value'>
                <p style={{ fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>Mesas informadas</p>
                <div style={style}>
                  <Progress.Circle percent={stats?.totalTables ? ((stats?.totalTables / TOTAL_TABLES) * 100).toFixed(2) : 0} strokeColor="#FFD500" />
                </div>
                <p className='stats__info' style={{ marginLeft: '-15px' }}>
                  {stats?.totalTables + " " || 0}
                  de
                  {" " + TOTAL_TABLES}
                </p>
              </div>
              <div className='stats__left__value'>
                <p style={{ fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>Votantes</p>
                <div style={style}>
                  <Progress.Circle percent={stats?.totalVotes ? ((stats?.totalVotes / TOTAL_VOTERS) * 100).toFixed(2) : 0} strokeColor="#00509d" />
                </div>
                <p className='stats__info'>
                  {stats?.totalVotes + " " || 0}
                  de
                  {" " + TOTAL_VOTERS}
                </p>
              </div>
            </div>
            <div className='stats__right'>

              <div style={{ display: 'flex', flexDirection: 'column', }}>
                <p style={{ fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginLeft: '10px' }}>Votos</p>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyItems: 'flex-start' ,justifyContent: 'center',     alignItems: 'center' }}>
                  <div className="inner__card">
                    <div className='inner__card__value' style={{ borderBottom: "2px solid #ababab" }}>
                      VÁLIDOS <br />
                      {stats?.totalVotes - stats?.nullVotes - stats?.unmarkedVotes || 0} ({((stats?.totalVotes - stats?.nullVotes - stats?.unmarkedVotes) / stats?.totalVotes * 100).toFixed(2)}%)
                    </div>
                    <div className='inner__card__value'>
                      <div>
                        Por candidatos{" "}
                        {stats?.totalVotes - stats?.whiteVotes - stats?.nullVotes - stats?.unmarkedVotes || 0} ({((stats?.totalVotes - stats?.whiteVotes - stats?.nullVotes - stats?.unmarkedVotes) / stats?.totalVotes * 100).toFixed(2)}%)
                      </div>
                      <div>
                        En blanco{" "}
                        {stats?.whiteVotes || 0} ({((stats?.whiteVotes) / stats?.totalVotes * 100).toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                  <ul className='stats__extra__value__list' style={{marginTop: 10}}>
                    <li>NULOS o ANULADOS: <br/> {stats?.nullVotes || 0} ( {((stats?.nullVotes) / stats?.totalVotes * 100).toFixed(2)}%)</li>
                    <li>NO MARCADOS: <br/> {stats?.unmarkedVotes || 0} ( {((stats?.unmarkedVotes) / stats?.totalVotes * 100).toFixed(2)}%) </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="container__component">
          <div className="cards__container__votes" style={{ padding: 10, display: 'flex', gap: 10, flexDirection: 'column' }}>
            <Cards title={`Votantes hasta las 12:00pm`} number={stats?.partialVotesAt12 || 0} icon={<HiOutlineInboxIn size={50} />} />
            <Cards title="Votantes hasta las 04:00pm" number={stats?.partialVotesAt4 || 0} icon={<HiOutlineInboxIn size={50} />} />
          </div>
        </div>
      </div>


      <div className="home__grid">
        <div>
          <div className="container__component">
            <div className="container__header">
              <h5>RESULTADO POR CANDIDATOS</h5>
            </div>
            <div style={{ padding: '0 20px' }}>
              <List>
                {votesByCandidate?.map((item, index) => (
                  <List.Item key={item['index']} index={index + 1}>
                    <FlexboxGrid style={{ justifyContent: "space-between" }}>
                      <FlexboxGrid.Item
                        style={{
                          ...styleCenter,
                          alignItems: 'center',
                        }}
                      >
                        <img src={item['img']} alt={item['img']} style={{ marginLeft: '20px', marginRight: '10px', width: '60px', objectFit: 'fill', borderRadius: '5%' }} />
                        <div style={{ alignItems: 'center', marginLeft: '10px' }}>
                          <div style={titleStyle}>{item['name']}</div>
                          <div style={slimText}>
                            <div>{item['politicalParty']}</div>
                          </div>
                        </div>
                      </FlexboxGrid.Item>

                      <FlexboxGrid.Item
                        colspan={10}
                      >
                        <div style={{ alignItems: 'center', marginLeft: '10px' }}>
                          <div style={{ padding: "0px 17px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p>{((item['votes'] / stats.totalVotes) * 100).toFixed(2) + "%"} </p>
                            <p style={{ margin: '0px' }}>{item['votes']} Votos</p>
                          </div>
                          <Progress.Line percent={stats.totalVotes ? Math.round((item['votes'] / stats.totalVotes) * 100) : 0} strokeColor={item['color']} />
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                ))}
              </List>
            </div>
          </div>

        </div>

        <div>
          <div style={{ minHeight: 500 }} className="container__component">
            <div className="container__header">
              <h5>Información del candidato</h5>
            </div>
            <div className='container_event_body'>
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
