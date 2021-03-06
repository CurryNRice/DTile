import React from "react";

import { Button, TextInput } from "../guiComponents.jsx";

import { PubSub, Events } from "../../event/pubSub.js";

export default class AddLayerDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = { layerNameText: "New Layer" };
	}

	success(e) {
		if (typeof e != "undefined") e.preventDefault();

		PubSub.publish(Events.ADD_LAYER, this.state.layerNameText);
		this.props.close();
	}

	abort() {
		this.props.close();
	}

	onChange(e) {
		this.setState({ layerNameText: e.target.value });
	}

	render() {
		return (
			<form onSubmit={ e => { this.success(e); } }>
				<h2 className="primary">Add Layer</h2>
				<TextInput name="layerName" label="Layer Name"
					value={ this.state.layerNameText }
					onChange={ this.onChange.bind(this) } />
				<div className="actionButtonContainer">
					<Button onClick={ () => this.abort() } text="Cancel" />
					<Button onClick={ () => this.success() } text="Add"
						disabled={ this.state.layerNameText == "" } />
				</div>
			</form>
		);
	}
}
