import React from "react";
import ReactDOM from "react-dom";
import{BrowserRouter as Router,browserHistory,Link,Route} from "react-router-dom";
import Etiquetas from "./etiquetas.jsx";
import Entradas from "./entradas.jsx";
import Antiguos from "./antiguos.jsx";
import PostVisitor from "./postvisitor.jsx"
class VisitorApp extends React.Component{	
	constructor(props){
		super(props);
		this.state={
			type:"default",
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
			
			this.updateProps(["posts"],[resp]);
		}).catch((err)=>{
			console.log("something went wrong");
			console.log(err);
		});
	}

	loadMonth=(ev)=>{
		let lst=this.state.type=="month"?this.state.posts.length:0;
		//console.log(`name:${ev.target.name}`);
		fetch(`/visitor/getmonth/${ev.target.name}/${lst}`,
			{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			})
		.then(resp=>resp.json()).then(resp=>{
			console.log("response to load month:");
			console.log(resp);
			if (lst==0){
				this.updateProps(["posts"],[resp]);
			}
			else{
				let temp=this.state.posts.map(el=>Object.assign({},el));
				this.updatePRops(["posts"],[temp.concat(resp)]);
			}
		})
	}

	loadTag=(ev)=>{
		console.log("loading tag");
		let lst   =   this.state.type == "tag" ?    this.state.posts.length    :    0;
		fetch(`/visitor/gettag/${ev.target.name}/${lst}`,
			{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			})
		.then(resp=>resp.json()).then(resp=>{
			if (lst==0){
				this.updateProps(["posts"],[resp]);
			}
			else{
				let temp=this.state.posts.map(el=>Object.assign({},el));
				this.updatePRops(["posts"],[temp.concat(resp)]);
			}
		})
		.catch(err=>{
			console.log("something went wrong");
			console.log(err);
		})
	}

	loadCath=(ev)=>{
		
		let lst=this.state.type=="cath"?this.state.posts.length:0;
		fetch(`/visitor/getcathegory/${ev.target.name}/${lst}`,
			{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			})
		.then(resp=>resp.json()).then(resp=>{
			if (lst==0){
				this.updateProps(["posts"],[resp]);
			}
			else{
				let temp=this.state.posts.map(el=>Object.assign({},el));
				this.updatePRops(["posts"],[temp.concat(resp)]);
			}
		})
	}

	loadTags=()=>{
		fetch("visitor/tags",{
			method:"get",
			headers:{"Content-Type":"application/json"},
		})
		.then((resp)=>resp.json()).then((resp)=>{
			
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
			<div className="app">

			<h1>Welcome visitor, this is my blog, have fun</h1>
			
			<Router history={browserHistory}>

				<div className="router">
					<Link to ="/">Inicio</Link>
					<div className="content">
						
						<Route path="/" exact render={props=>(<Entradas posts={this.state.posts} />)}/>
						<Route path="/month/:id" render={props=>(<Entradas posts={this.state.posts} 	/>)}/>
						<Route path="/etiquetas/:etiqueta" render={props=>(<Entradas posts={this.state.posts} 	/>)}/>

						<Route path="/view/:id" exact render={props=>(<PostVisitor 
							post={this.state.posts.find(
								(el)=>{							
									return el._id==props.match.params.id;
								})
						}/>)}/>
						<Route path="/" render={(props)=>(
							<div className="leftside">
								<Antiguos load={this.loadMonth}/>
								<Etiquetas etiqs={this.state.etiquetas} name="Etiquetas" load={this.loadTag}/>
								<Etiquetas etiqs={this.state.categorias} name ="Categorias" load={this.loadCath}/>
								
							</div>
							)}
							/>
						
					</div>
				</div>
			</Router>
			
			</div>
			);
	}
	
}



ReactDOM.render(<VisitorApp/>,document.getElementById("visitorApp"));
