import React from "react";
import ReactDOM from "react-dom";


class Editor extends React.Component{	
	constructor(props){
		super(props);
	}

	render(){
		let els=[];
		this.props.entradas.map((el)=>{
			console.log("adding");
			console.log(el);
			els.push(<Post title={el.title} key={el._id} />)

		});
		console.log("els");
		console.log(els);
		return(
		<div>
			<h1>Entradas mas recientes</h1>
			<p>TEST WEBPACK</p>
			{els}
		</div>
		);
	};
};
class Post extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<h1>Titulo</h1>
				<p>{this.props.title}</p>
				<span>Editar</span>
			</div>
		);	
	}
}


export default Editor;