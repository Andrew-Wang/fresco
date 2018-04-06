import React from 'react';

import Msource from '../../model/Msource';

export default class VsourceAdd extends React.Component {
	constructor(props) {
		super(props);
		const {handle} = props;

		this.state = {
			url:''
		};

		console.log('props:',props);

		this.handle = {
			submit:(e)=>{
				e.preventDefault();
				//if (this.state.url.length < 1){
					// error!
					//return;
				//}
				Msource.add({
					url:this.state.url,
					type:'vector'
				}).then((source)=>{
					handle.route('source/'+encodeURIComponent(source.url));
				});
			},
			urlChange:(e)=>{
				this.setState({url: e.target.value});
			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		//const {match} = this.props;

		return <form onSubmit={this.handle.submit}>
			<h2 className="px-2 py-1 m-0 text-nav bg-light">Add Source</h2>
			<div className="py-3 px-2">

				<div className="form-group">
					<label>URL</label>
					<input type="text" className="form-control" placeholder="Capabilities endpoint for source"
						value={this.state.url} onChange={this.handle.urlChange}/>
				</div>
				<button type="submit" className="btn btn-primary">Add</button>
			</div>
			
		</form>
	}
};