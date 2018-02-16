import React from "react";
import ReactDOM from "react-dom";
import Post from "./post.jsx";
import {Link} from "react-router-dom";


class Editor extends React.Component{	
	constructor(props){
		super(props);
		console.log("props");
		console.log(this.props);
		
	}
	
	render(){
		let els=[];
		this.props.entradas.map((el)=>{
			console.log("adding");
			console.log(el);
			els.push(<Post title={el.title} key={el._id} id={el._id} />)

		});
		console.log("els");
		console.log(els);
		return(
		<div>
			<h1>Entradas mas recientes</h1>
			
			{els}

		</div>
		);
	};
};



export default Editor;