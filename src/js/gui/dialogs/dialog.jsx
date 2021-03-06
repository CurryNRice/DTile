import React from "react";

import { PubSub, Events } from "../../event/pubSub.js";

export class DialogContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dialogs: []
		};

		PubSub.subscribe(Events.OPEN_DIALOG, dialog => {
			let dialogs = this.state.dialogs;
			dialogs.push(dialog);

			this.setState({ dialogs });
		});
	}

	close(index) {
		let dialogs = this.state.dialogs;
		dialogs.splice(index, 1);

		this.setState({ dialogs });
	}

	render() {
		let shown = this.state.dialogs.length > 0 ? " shown" : "";

		return (
			<div className={"dialogContainer" + shown }>
				{
					this.state.dialogs.map((Type, index) => {
						return (
							<Dialog key={ index }
								close={ this.close.bind(this, index) }
								Type={ Type } />
						);
					})
				}
			</div>
		);
	}
}

export default class Dialog extends React.Component {
	render() {
		return (
			<div className="card dialog">
				<this.props.Type close={ this.props.close } />
			</div>
		);
	}
}
