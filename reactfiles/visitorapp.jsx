import React from "react";
import ReactDOM from "react-dom";
import{BrowserRouter as Router,browserHistory,Link} from "react-router-dom";


class VisitorApp extends React.Component{	
	constructor(props){
		super(props);
		this.state={
			posts:[],
			etiquetas:[]
		}
	}
	render(){
		return(
			<div>

			<h1>Welcome visitor, this is my blog, have fun</h1>
			
			<Router history={browserHistory}>
				<div>
				<Antiguos/>
				<Entradas posts={this.state.posts}/>
				<Etiquetas etiqs={this.state.etiquetas}/>
				</div>
			</Router>
			
			</div>
			);
	}
}
class Antiguos extends React.Component{
	constructor(props){
		super(props);
		this.meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

	}	
	render(){
		let els=[];
		this.meses.map((el,ind)=>{
			els.push(<li  key={ind} ><Link to={"/categorias/"+el}>{el}</Link></li>)
		})
		return(
			<div>
			<h1>Antiguos</h1>
			<ul>
				{els}
			</ul>
			</div>
			);
	}
}
class Entradas extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let els=[];
		let that = this;
		this.props.posts.map((el)=>{
			els.push(that.build(el))

		});
		return(<div>
			<h1>Entradas</h1>
			{els}
			<button>
				Cargar mas
			</button>
			</div>);


		
	}

	build(post){

		comms=[];
		post.comments.map((el,ind)=>{
			comms.push(
			<div key={ind}>
				{el}
			</div>
			)
		})
		return (
			<div key={post._id}>
				<h1>{post.title}</h1>
				<h3>
					{post.date}
				</h3>
				<div>
					{post.content}

				</div>
				<div>
					{post.comms}
				</div>
			</div>
			)
	}
}
class Etiquetas extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let els=[];
		this.props.etiqs.map((el,ind)=>{
			els.push(<li key={ind}><Link to={"/etiquetas/"+{el}}>el</Link></li>)
		})
		return(<div>
			<h1>Etiquetas</h1>
			<ul>
				{els}
			</ul>
		</div>)
	}
}
ReactDOM.render(<VisitorApp/>,document.getElementById("visitorApp"));
