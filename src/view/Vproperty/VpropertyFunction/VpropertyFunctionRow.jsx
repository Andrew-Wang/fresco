import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Vfield from '../../Vfield';
import Valert from '../../Valert';
import VpropertyInfo from '../VpropertyInfo';

import styleSpec from '../../../vendor/style-spec/style-spec';

export default class VpropertyFunctionRow extends React.Component {

	static propTypes = {
		func: PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired, // string of position . separated
			//value: PropTypes.object,
			error: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.object
			])
		}),
		focus: PropTypes.string,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, func} = this.props;

		this.state = {
			open:true
		};

		this.handle = {
			toggleOpen:()=>{
				if (this.state.open){
					return this.setState({open:false});
				}
				this.setState({open:true});
			},
			remove:()=>{
				handle.remove({name:func.name});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

		this.fieldHandle = {
			change:handle.change,
			focus:handle.focus,

			/*

			focusNext:(pos)=>{
				let nextPos = getNextPos(pos);
				if (!handle.layerHasIn(nextPos)) return;
				this.handle.focus(nextPos);
			},
			focusPrev:(pos)=>{
				let prevPos = getPrevPos(pos);
				if (!handle.layerHasIn(prevPos)) return;
				this.handle.focus(prevPos);
			},

			enter:(f)=>{
				const pos = nameToPos(f.name);
				const nextPos = getNextPos(pos);

				console.log('enter:',nextPos, handle.layerHasIn(nextPos));

				if (!handle.layerHasIn(nextPos)){
					handle.change({
						name:posToName(nextPos),
						value:''
					});
				}
				handle.focus(posToName(nextPos));
			},
			backout:(f)=>{
				const pos = nameToPos(f.name);
				const prevPos = getPrevPos(pos);

				handle.layerRemoveIn(pos);
				handle.focus(posToName(prevPos));
			}
			*/
		};

		for (let i in this.fieldHandle){
			this.fieldHandle[i] = this.fieldHandle[i].bind(this);
		}

	}


	renderField (name,val,spec){
		const {handle, focus} = this.props;

		const autoFocus = (name === focus)? true: false;

		//console.log('field:',name,val);

		if (spec.type === 'number'){
			return <Vfield key={name} field={{
				type:'number',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>;
		} else if (spec.type === 'boolean'){
			return <Vfield key={name} field={{
				type:'boolean',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>;
		} else if (spec.type === 'enum'){
			console.log('enum:',spec);
			let options = [];
			for (let i in spec.values){
				options.push({
					name:i,
					value:i
				});
			}
			return <Vfield key={name} field={{
				type:'select',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus,
				options:options
			}} handle={this.fieldHandle}/>;
		} else { 
			return <Vfield key={name} field={{
				type:'string',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>;
		}
	}

	render (){
		const {func, focus} = this.props;
		const value = func.controlled ? this.state.value : func.value || null;

		const autoFocus = (func.name === focus)? true: false;

		if (!styleSpec.latest.function[func.type]) return <Valert message={func.type+' not found in spec'}/>;

		const spec = styleSpec.latest.function[func.type];

		const doc = spec.doc;

		const buildOptions = ()=>{
			let types = [spec.type];

			return <div>
				<div className="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{spec.type}
					<i className="material-icons md-14">arrow_drop_down</i>
				</div>
				<div className="dropdown-menu">
					<a key="remove" onClick={this.handle.remove} className="dropdown-item" href="javascript:">remove</a>
				</div>
			</div>;
		};

		//console.log('spec:',spec, 'value:',value);

		return <div className="form-group mb-0 position-relative">

			<label className="mb-0 d-block py-1 pl-1">
				{func.type+' '}
				<VpropertyInfo doc={doc} error={func.error}/>
				<span className="float-right">
					{buildOptions()}
				</span>
			</label>
			
			<div key={func.name} className="position-relative">
				{this.renderField(func.name,value,spec)}
			</div>

		</div>
	}
};