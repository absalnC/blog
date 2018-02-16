import React from "react";
class Post extends React.Component{
	constructor(props){
		super(props);
		console.log("ptops");
		console.log(this.props);
	}
	render(){

		return(
			<div>
				<span>Titulo </span>
				<span>{this.props.title} </span>
				<Link to ={`/edit/${this.props.id}`} >Editar </Link>
				<span>Eliminar </span>
			</div>
		);	
	}
}
export default Post;