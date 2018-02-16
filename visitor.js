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
	const months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	let month=months.indexOf(req.params.month);
	let last=parseInt(req.params.last);
	console.log("fetching from"+req.params.last+ "to ");
	req.postdao.fetchNMonth(last,last+5,month,(resp)=>{
		console.log("got answer");
		console.log(resp);
		res.send(resp);
	});
});

visitor.get("/gettag/:tag/:last",(req,res)=>{
	let last=parseInt(req.params.last);
	console.log("fetching from"+req.params.last+ "to ");
	req.postdao.fetchNTag(last,last+5,req.params.tag,(resp)=>{
		res.send(resp);
	});
});

visitor.get("/getcathegory/:cath/:last",(req,res)=>{
	let last=parseInt(req.params.last);
	console.log("fetching from"+req.params.last+ "to ");
	req.postdao.fetchNCath(last,last+5,req.params.cath,(resp)=>{
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

visitor.post("/comment/",(req,res)=>{
	//procesar info de formulario comentario
	comment="comment";
	req.postdao.addComment(req.id,comment);
});

module.exports=visitor;