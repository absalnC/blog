let express = require("express");
let visitor=express.Router();

visitor.get("/",(req,res)=>{
	//obtener ultimas 5 entradas 
	res.render("index");

});
visitor.post("/post/:id/comment/",(req,res)=>{
	//procesar info de formulario comentario
	comment="comment";
	req.postdao.addComment(req.id,comment);
});

module.exports=visitor;