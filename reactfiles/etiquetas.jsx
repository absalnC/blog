import React from "react";
import {Link} from "react-router-dom";
//etiquetas y categorias son practicamente lo mismo, la unica diferencia es la url de la api a la que se hace la peticion
class Etiquetas extends React.Component{
	constructor(props){
		super(props);
		this.state={
			etiqs:this.props.etiqs
		}
	}
	componentWillReceiveProps(nextProps){
		console.log("cwrp");
		if (!this.isEqual(nextProps.etiqs,this.props.etiqs)){
			this.setState({
				etiqs:nextProps.etiqs
			});
		}
	}
	isEqual=(arr1,arr2)=>{
		console.log("are they the same?");
		console.log(arr1);
		console.log(arr2);
		arr1.reduce((acc,val,ind)=>{
			return val==arr2[ind]&&acc;
		},true);
	}
	render(){
		console.log("etiqs"+this.props.name);
		console.log(this.state.etiqs);
		let els=[];
		this.state.etiqs.map((el,ind)=>{
			els.push(<li key={ind}><Link to={"/etiquetas/"+{el}}>{el}</Link></li>)
		})
		return(<div>
			<h1>{this.props.name}</h1>
			<ul>
				{els}
			</ul>
		</div>)
	}
}

export default Etiquetas;