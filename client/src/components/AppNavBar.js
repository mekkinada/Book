import React, { Component } from 'react';
import {
	Container,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Nav,
	NavItem,
	Collapse
} from 'reactstrap';

import AddBookModal from './AddBookModal';
import FileUploadModal from './FileUploadModal';


class AppNavBar extends Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		return (
			<Navbar
				color="dark"
				dark
				expand="sm">
				<Container>
					<NavbarBrand
						className="font-weight-bold"
						href="/">
							Library Makiyat
					</NavbarBrand>
					<NavbarToggler
						onClick={ this.toggle }/>
					<Collapse
						isOpen={ this.state.isOpen }
						navbar>
						<Nav
							className="ml-auto"
							navbar>
							<NavItem>
								<AddBookModal/>
							</NavItem>
							
							<NavItem>
								<FileUploadModal/>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default AppNavBar;
