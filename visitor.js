let express = require("express");
let visitor=express.Router();

visitor.get("/",(req,res)=>{
	res.render("index");

});

visitor.get("/get/:last",(req,res)=>{
	let last=parseInt(req.params.last);
	console.log("fetching from"+req.params.last+ "to ");
	req.postdao.fetchN(last,last+5,(resp)=>{
		res.send(resp);
	});
});


visitor.get("/getmonth/:month/:last",(req,res)=>{
	const months=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
	let month=months.indexOf(req.params.last);
	let last=parseInt(req.params.last);
	console.log("fetching from"+req.params.last+ "to ");
	req.postdao.fetchN(last,last+5,month,(resp)=>{
		res.send(resp);
	});
});

visitor.get("/gettag/:tag/:last",(req,res)=>{
	let last=parseInt(req.params.last);
	console.log("fetching from"+req.params.last+ "to ");
	req.postdao.fetchN(last,last+5,tag,(resp)=>{
		res.send(resp);
	});
});

visitor.get("/tags",(req,res)=>{
	req.postdao.fetchTags((resp)=>{
		res.send(resp);
	});
});

visitor.get("/cathegories",(req,res)=>{
	req.postdao.fetchCats((resp)=>{
		res.send(resp);
	});
});

visitor.post("/post/",(req,res)=>{
	//procesar info de formulario comentario
	comment="comment";
	req.postdao.addComment(req.id,comment);
});

module.exports=visitor;