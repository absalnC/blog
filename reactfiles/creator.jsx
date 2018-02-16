import React from "react";
import ReactDOM from "react-dom";
import Link from "react-router-dom";
class Creator extends React.Component{

	constructor(props){
		super(props);
		console.log("editing?"+this.props.editing);
		if(this.props.editing){
			//encontrar post correcto y colocarlo en el estado
			console.log("props on constructor");
			console.log(this.props);
			//let post={... (this.props.post)};
			let temp=this.props.posts.find(
				(element)=>{
					return element._id==this.props.those.match.params.id;					
				});
			
			
			let post=Object.assign({},temp);
			post["tags"]=post["tags"].join(",");
			post["cathegories"]=post["cathegories"].join(",");
			this.state=post;
			console.log("final state editing");
			console.log(this.state);
		}
		else{
			this.state={
				title:"",
				content:"",
				tags:[],
				created:"",
				comments:[],
				cathegories:[]

			}	
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
		if(!this.props.editing){
			let that=this;
			console.log("clicked publicar");
			let temp=Object.assign({},this.state);
			temp["created"]=new Date();
			temp["tags"]=temp["tags"].split(",");
			temp["cathegories"]=temp["cathegories"].split(",");
			//manejar string de arreglos para que queden como arreglos

			fetch("/editor/insert",{
				method:"post",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(temp)
			}).then(function(resp){
				console.log("everything smooth");
				console.log(resp);
				that.setState({
					title:"",
					content:"",
					tags:[],
					created:{},
					comments:[],
					cathegories:[]
				});
			}).catch(function(err){
				console.log("something went wrong");
				console.log(err);
			});
		}
		else{
			//actualizar
			//let temp={...this.state};
			console.log("updating");
			let temp=Object.assign({},this.state);
			temp["tags"]=temp["tags"].split(",");
			temp["cathegories"]=temp["cathegories"].split(",");
			fetch("/editor/update",{
				method:"post",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(temp)
			})
			.then((resp)=>{
				console.log("everything fine");
				console.log(resp);
				//this.props.history.push("/editor");

			})
			.catch((err)=>{
				console.log("something went wrong");
				console.log(err);
			});
		}
		
	}
	render(){
		return(
			<div>
			
				<h1>Titulo</h1>
				<input type="text" onChange={this.handle} value={this.state.title} name="title"/>
				<h3>Contenido</h3>
				<textarea name="content" onChange={this.handle} value={this.state.content}>
				</textarea>
				<h4>Etiquetas</h4>
				<input type="text" name="tags" onChange={this.handle} value={this.state.tags} />
				<h4>Categorias</h4>
				<input type="text" name="cathegories" onChange={this.handle} value={this.state.cathegories}/>
				<h4>Comentarios</h4>
				<div> En esta seccion deberan cargarse algunos comentarios, cuando se trate de la edicion de algun post</div>
				<button onClick={this.save}>Publicar</button>
			</div>
			)
	}
}

export default Creator;