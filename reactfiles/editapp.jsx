import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router,Route,browserHistory,Link} from "react-router-dom";
import Editor from "./editor.jsx";
import Creator from "./creator.jsx";

class EditApp extends React.Component{
	constructor(props){
		super(props);
		this.current={};
		this.state={
			editing:false,
			posts:[]
		};
		this.getPosts();
	}

	edit=(ev)=>{
		id=ev.target.id;
		index=0;//buscar elemento de posts con id
		this.current=this.posts[index];
	}

	getPosts= ()=>{
		let that =this;
		fetch("../visitor/get/0",{
			method:"get",
			headers:{"Content-type":"application/json"},
		}).then(res=>res.json()).then(function(resp){
			
			console.log("got the data");
			console.log(resp);
			let temp={};
			Object.assign(temp,that.state);
			console.log("temp afer assignation");
			console.log(temp);
			temp.posts=temp.posts.concat(resp);
			that.setState(temp);	
			console.log("now posts are");
			console.log(that.state.posts);		
		}).catch(function(err){
			console.log("something went wrong");
			//console.log(err);
		});
	}
	render(){
		
		return(
		<div>
			<Router history={browserHistory} basename="editor">
				<div>
				<div>
					
					<Link to="/">Inicio del editor</Link>
					<Link to="/creator">Crear entrada</Link>
					
				</div>
				<Route path ="/creator" component={()=><Link to ="/">Cancelar</Link>}/>
				
				<Route path="/" exact component={()=>(<Editor  entradas={this.state.posts}/>)}/>
				<Route path="/creator" component ={() => (<Creator editing={false} />) } />
				<Route path="/edit/:id" render ={(those) => (<Creator  editing={true} those={those} posts={this.state.posts}   />) } />
				
				</div>	
			</Router>
		</div>
		)
	}
}

ReactDOM.render(<EditApp/>,document.getElementById("editApp"));