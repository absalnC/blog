import React from "react";
import{Link} from "react-router-dom";
import VisitorComment from "./visitorcomment.js";
//PostVisitor siempre viene de un link
class PostVisitor extends React.Component{
	constructor(props){
		super(props);			
	}

	render(){
		let comms=[];
		this.props.post.comments.map(
			(el,ind)=>{
				comms.push(<VisitorComment comment={el} kei={ind}/>)
			});	
		return(
			<div key={this.props.post._id}>
				<h1><Link to={"/view/"+this.props.post._id}>{this.props.post.title}</Link></h1>
				<h3>
					{this.props.post.created}
				</h3>
				<div>
					{this.props.post.content}

				</div>
				<div>
					<h2>Comentarios</h2>
					{comms}
				</div>
			</div>)
	}
}

export default PostVisitor;