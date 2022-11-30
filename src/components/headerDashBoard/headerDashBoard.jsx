import React, {useState} from 'react'
import { Menu, Segment, Button } from 'semantic-ui-react'



const HeaderDashBoard = (props) => {

    const [activeItem, setActiveItem] = useState("item1");

    const handleItemClick = (e) => setActiveItem(e);

    return (
        <Segment inverted >
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

                <h2>
                    {props.user?.name}
                </h2>

            </Menu>
        </Segment>
    )
}

export default HeaderDashBoard