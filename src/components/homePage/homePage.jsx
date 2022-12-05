import React from 'react'
import Cards from '../cardsHighlights/cards'
import { HiHeart,HiOutlineDocumentAdd,HiOutlineClipboardCheck,HiOutlineUserGroup } from "react-icons/hi";
import "./homePage.css"

const HomePage = () => {
  return (
    <>
      <div className="cards">
        <Cards title="Votantes Registrados" number="+150" icon={<HiOutlineDocumentAdd size={50}  />}/>
        <Cards title="Eventos Exitosos" number="12" icon={<HiOutlineClipboardCheck size={50}/>}/>
        <Cards title="Lideres Activos" number="15" icon={<HiOutlineUserGroup size={50} />}/>
        <Cards title={`"Likes" en redes sociales`} number="+1200" icon={<HiHeart size={50}/>}/>
      </div>

      <div className="home__grid">
        <div>
          <div className="container__component">
            <div className="container__header">
              <h2>Novedades</h2>
              <button>Mas </button>
            </div>
            {/* <div>
              <div class="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Project Title</td>
                      <td>Department</td>
                      <td>Status</td>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Website</td>
                      <td>Frontend</td>
                      <td>
                        <span class="status purple"></span>
                        Review
                      </td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>Frontend</td>
                      <td>
                        <span class="status orange"></span>
                        Pending
                      </td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>Frontend</td>
                      <td>
                        <span class="status pink"></span>
                        In Progress
                      </td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>Frontend</td>
                      <td>
                        <span class="status purple"></span>
                        Review
                      </td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>Frontend</td>
                      <td>
                        <span class="status pink"></span>
                        In Progress
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div> */}

          </div>

        </div>

        <div>
          <div className="container__component">
            <div className="container__header">
              <h2>Proximos Eventos</h2>
              <button>Conoce Mas</button>
            </div>
            {/* <div>
              <div class="customer">
                <div class="info">
                  <img src="https://bit.ly/3bvT89p" height="40px" width="40px" alt="customer" />
                  <div>
                    <h4>Malik Abushabab</h4>
                    <small>CEO</small>
                  </div>
                </div>
                <div class="contact">
                  <span class="fas fa-user-circle"></span>
                  <span class="fas fa-comment"></span>
                  <span class="fas fa-phone-alt"></span>
                </div>
              </div>
              <div class="customer">
                <div class="info">
                  <img src="https://bit.ly/3bvT89p" height="40px" width="40px" alt="customer" />
                  <div>
                    <h4>Malik Abushabab</h4>
                    <small>CEO</small>
                  </div>
                </div>
                <div class="contact">
                  <span class="fas fa-user-circle"></span>
                  <span class="fas fa-comment"></span>
                  <span class="fas fa-phone-alt"></span>
                </div>
              </div>
              <div class="customer">
                <div class="info">
                  <img src="https://bit.ly/3bvT89p" height="40px" width="40px" alt="customer" />
                  <div>
                    <h4>Malik Abushabab</h4>
                    <small>CEO</small>
                  </div>
                </div>
                <div class="contact">
                  <span class="fas fa-user-circle"></span>
                  <span class="fas fa-comment"></span>
                  <span class="fas fa-phone-alt"></span>
                </div>
              </div>
              <div class="customer">
                <div class="info">
                  <img src="https://bit.ly/3bvT89p" height="40px" width="40px" alt="customer" />
                  <div>
                    <h4>Malik Abushabab</h4>
                    <small>CEO</small>
                  </div>
                </div>
                <div class="contact">
                  <span class="fas fa-user-circle"></span>
                  <span class="fas fa-comment"></span>
                  <span class="fas fa-phone-alt"></span>
                </div>
              </div>
              <div class="customer">
                <div class="info">
                  <img src="https://bit.ly/3bvT89p" height="40px" width="40px" alt="customer" />
                  <div>
                    <h4>Malik Abushabab</h4>
                    <small>CEO</small>
                  </div>
                </div>
                <div class="contact">
                  <span class="fas fa-user-circle"></span>
                  <span class="fas fa-comment"></span>
                  <span class="fas fa-phone-alt"></span>
                </div>
              </div>
              <div class="customer">
                <div class="info">
                  <img src="https://bit.ly/3bvT89p" height="40px" width="40px" alt="customer" />
                  <div>
                    <h4>Malik Abushabab</h4>
                    <small>CEO</small>
                  </div>
                </div>
                <div class="contact">
                  <span class="fas fa-user-circle"></span>
                  <span class="fas fa-comment"></span>
                  <span class="fas fa-phone-alt"></span>
                </div>
              </div>
              <div class="customer">
                <div class="info">
                  <img src="https://bit.ly/3bvT89p" height="40px" width="40px" alt="customer" />
                  <div>
                    <h4>Malik Abushabab</h4>
                    <small>CEO</small>
                  </div>
                </div>
                <div class="contact">
                  <span class="fas fa-user-circle"></span>
                  <span class="fas fa-comment"></span>
                  <span class="fas fa-phone-alt"></span>
                </div>
              </div>
            </div> */}
          </div>

        </div>

      </div>
      
    </>
  )
}

export default HomePage
