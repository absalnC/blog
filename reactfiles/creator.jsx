import React from "react";
import ReactDOM from "react-dom";
import Link from "react-router-dom";
class Creator extends React.Component{

	constructor(props){
		super(props);
		console.log("editing?"+this.props.editing);
		this.state={
			titulo:"",
			contenido:"",
			etiquetas:""
		}
	}
	handle=(ev)=>{
		console.log("input executed");
		let temp={};
		Object.assign(temp,this.state);
		temp[ev.target.name]=ev.target.value;
		this.setState(temp);
		console.log("new state:");
		console.log(this.state);
	}
	save=()=>{
		let that=this;
		console.log("clicked publicar");
		fetch("/editor/insert",{
			method:"post",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(that.state)
		}).then(function(resp){
			console.log("everything smooth");
			console.log(resp);
			that.setState({
				titulo:"",
				contenidos:"",
				etiquetas:""
			});
		}).catch(function(err){
			console.log("something went wrong");
			console.log(err);
		});
	}
	render(){
		return(
			<div>
			
				<h1>Titulo</h1>
				<input type="text" onChange={this.handle} name="titulo"/>
				<h3>Contenido</h3>
				<textarea name="contenido" onChange={this.handle}>
				</textarea>
				<h4>Etiquetas</h4>
				<input type="text" name="etiquetas" onChange={this.handle}/>
				<h4>Comentarios</h4>
				<div> En esta seccion deberan cargarse algunos comentarios, cuando se trate de la edicion de algun post</div>
				<button onClick={this.save}>Publicar</button>
			</div>
			)
	}
}

export default Creator;