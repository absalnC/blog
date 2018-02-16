import React from "react";
import PostView from "./postview.jsx";

class Entradas extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let els=[];
		let that = this;
		this.props.posts.map((el)=>{
			els.push(<PostView key={el._id}  post={el}/>)

		});
		return(<div>
			<h1>Entradas</h1>
			{els}
			<button>
				Cargar mas
			</button>
			</div>);


		
	}

	
}

export default Entradas;