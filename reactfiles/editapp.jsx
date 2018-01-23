import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router,Route,browserHistory,Link} from "react-router-dom";
import Editor from "./editor.jsx";
import Creator from "./creator.jsx";

class EditApp extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			editing:{
				currently:false,
				title:"",
				content:"",
				comments:[],
				dates:[]
			},
			posts:[]
		};
		this.getPosts();
	}
	getPosts= ()=>{
		let that =this;
		fetch("editor/obtain",{
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
			console.log(err);
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
				
				<Route path="/" exact component={()=>(<Editor entradas={this.state.posts}/>)}/>
				<Route path="/creator" component ={() => (<Creator editing={false} />) } />
				
				</div>	
			</Router>
		</div>
		)
	}
}

ReactDOM.render(<EditApp/>,document.getElementById("editApp"));