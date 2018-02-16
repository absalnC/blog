import React from "react";
import {Link} from "react-router-dom";
//etiquetas y categorias son practicamente lo mismo, la unica diferencia es la url de la api a la que se hace la peticion
//seria bueno cambiar nombre a vitrina o algo por el estilo
class Etiquetas extends React.Component{
	constructor(props){
		super(props);
		this.state={
			etiqs:this.props.etiqs
		}
	}


	componentWillReceiveProps(nextProps){
		
		if (!this.isEqual(nextProps.etiqs,this.props.etiqs)){
			this.setState({
				etiqs:nextProps.etiqs
			});
		}
	}

	isEqual=(arr1,arr2)=>{
		
		arr1.reduce((acc,val,ind)=>{
			return val==arr2[ind]&&acc;
		},true);
	}


	render(){
		let els=[];
		
		this.state.etiqs.map((el,ind)=>{
			els.push(<li key={ind}><Link to={"/etiquetas/"+el} onClick={this.props.load} name={el}>{el}</Link></li>)
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