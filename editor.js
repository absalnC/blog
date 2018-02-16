let express =require("express");


let editor=express.Router();

editor.get("/", (req,res)=>{
	res.render("editor");
	
});
editor.get("/obtain",(req,res)=>{
	req.postdao.fetchN(5,(data)=>{res.json(data)});
})
editor.post("/update",(req,res)=>{
	//verificar credenciales(middleware?)
	//en el cuerpo del mensaje se incluye el _id
	console.log("updating to");
	console.log(req.body);
	req.postdao.update(req.body,function(resp){
		console.log("done");
		res.send(resp);
	})
	
});

editor.post("/delete/:id",(req,res)=>{
	//verificar credenciales
});


editor.post("/insert",(req,res)=>{
	//verificar credenciales
	console.log("request body");
	console.log(req.body);
	req.postdao.insert(req.body,function(){
		console.log("done");
	});
});
editor.get("/insert",(req,res)=>{
	res.send("you need to use post method to insert publication, not get method ");
});
module.exports = editor;