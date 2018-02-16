let express=require("express");
let app=express();
let MongoClient=require("mongodb").MongoClient,assert=require("assert");
let port=process.env.PORT||8080;
let bodyParser=require("body-parser");
let editor=require("./editor");
let visitor=require("./visitor");
let dao=require("./dao");

MongoClient.connect("mongodb://localhost:27017",function(err,db){
	assert.equal(null,err);
	console.log("set up succesfull");
	truedb=db.db("blog");
	postdao=new dao.PostDao(truedb);
	app.use("/",exposeDb);
	//setup
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:false}));
	app.set("view engine","pug");
	app.set("views",__dirname+"/views");
	app.use(express.static("./static"));

	//rutas
	app.use("/",visitor);
	app.use("/visitor",visitor);
	app.use("/editor",editor);

	//iniciar servidor
	app.listen(port);	

	function exposeDb(req, resp, next){
    	req.postdao = postdao;
    	next();
  	};
})