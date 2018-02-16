import React from "react";
import ReactDOM from "react-dom";
import{BrowserRouter as Router,browserHistory,Link} from "react-router-dom";
import Etiquetas from "./etiquetas.jsx";
import Entradas from "./entradas.jsx";
import Antiguos from "./antiguos.jsx";

class VisitorApp extends React.Component{	
	constructor(props){
		super(props);
		this.state={
			posts:[],
			etiquetas:[],
			categorias:[]
		};
		this.loadPosts();
		this.loadTags();
		this.loadCathegories();
	}
	//loadPosts deberia cargar los 5 posts siguientes al ultimo de this.state.posts
	loadPosts(){
		let lst=this.state.posts.length;
		fetch("/visitor/get/"+lst,
		{
			method:"GET",
			headers:{"Content-Type":"application/json"},
		}).then((resp)=>resp.json()).then((resp)=>{
			console.log("resp");
			console.log(resp);
			this.updateProps(["posts"],[resp]);
		}).catch((err)=>{
			console.log("something went wrong");
			console.log(err);
		});
	}

	loadMonth=(ev)=>{

	}

	loadTag=(ev)=>{
		
	}

	loadTags=()=>{
		fetch("visitor/tags",{
			method:"get",
			headers:{"Content-Type":"application/json"},
		})
		.then((resp)=>resp.json()).then((resp)=>{
			console.log("resp tags");
			console.log(resp);
			this.updateProps(["etiquetas"],[resp]);
		})
		.catch((err)=>{
			console.log("something went wronk");
			console.log(err);
		});
	}

	loadCathegories=()=>{
		fetch("visitor/cathegories",{
			method:"get",
			headers:{"Content-Type":"application/json"},
		})
		.then((resp)=>resp.json()).then((resp)=>{
			console.log("resp cath");
			console.log(resp);
			this.updateProps(["categorias"],[resp]);
		})
		.catch((err)=>{
			console.log("something went wronk");
			console.log(err);
		})
	}
	updateProps=(propnames,values)=>{
		var tmp={};
		Object.assign(tmp,this.state);
		propnames.map((el,ind)=>{
			tmp[el]=values[ind];
		});
		this.setState(tmp);
	}

	render(){
		return(
			<div>

			<h1>Welcome visitor, this is my blog, have fun</h1>
			
			<Router history={browserHistory}>
				<div>
				<Antiguos/>
				<Entradas posts={this.state.posts}/>
				<Etiquetas etiqs={this.state.etiquetas} name="Etiquetas"/>
				<Etiquetas etiqs={this.state.categorias} name="Categorias"/>
				</div>
			</Router>
			
			</div>
			);
	}
	
}



ReactDOM.render(<VisitorApp/>,document.getElementById("visitorApp"));
