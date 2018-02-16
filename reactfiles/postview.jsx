import React from "react";
import{Link } from "react-router-dom";
class PostView extends React.Component{
	constructor(props){
		super(props);		
	}

	render(){
		let comms=[];
		this.props.post.comments.map(
			(el)=>{
				comms.push(<VisitorComment comment={el}/>)
			});	
		return(
			<div key={this.props.post._id}>
				<h1><Link to={"/view/"+this.props.post._id}>{this.props.post.title}</Link></h1>
				<h3>
					{this.props.post.created}
				</h3>
			</div>)
	}

}

export default PostView;