import React from "react";
import {Link} from "react-router-dom";

class Antiguos extends React.Component{

	constructor(props){
		super(props);
		this.meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

	}
		
	render(){
		let els=[];
		this.meses.map((el,ind)=>{
			els.push(<li  key={ind} ><Link to={"/month/"+el} onClick={this.props.load} name={el}>{el}</Link></li>)
		})
		return(
			<div className="antiguos">
			<h1>Antiguos</h1>
			<ul>
				{els}				
			</ul>
			</div>
			);
	}
}

export default Antiguos;