import React from "react";
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

		let comms=[];
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

export default Entradas;