import React from "react";
//posibles mejoras: anadir opcion de voto positivo y negativo, responder a comentario
class VisitorComment extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		return(
			<div className="comment"> 
				{this.props.comment}
			</div>
			)
	}
}

export default VisitorComment;
