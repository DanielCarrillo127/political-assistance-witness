import { useState } from 'react';
import './dashboard.css';
import { Menu, Segment, Button } from 'semantic-ui-react'


const Dashboard = () => {

  //set to global state 
  const [activeItem, setActiveItem] = useState("item1");

  const handleItemClick = (e) => setActiveItem(e);

  return (
    <>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'item1'}
            onClick={() => handleItemClick("item1")}
          />
          <Menu.Item
            name='item2'
            active={activeItem === 'item2'}
            onClick={() => handleItemClick("item2")}
          />
          <Menu.Item
            name='item3'
            active={activeItem === 'item3'}
            onClick={() => handleItemClick("item3")}
          />

          <Menu.Item inverted>
            <Button primary >Sign Up</Button>
          </Menu.Item>
        </Menu>
      </Segment>
      <Segment>

      </Segment>

    </>
  )
}

export default Dashboard