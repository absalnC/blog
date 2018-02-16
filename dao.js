var ObjectID=require("mongodb").ObjectID;
function PostDao(database){
	this.db=database;	


	this.insert=(obj,callback)=>{

		/*Para insertar un documento este debe cumplir con:
			Titulo
			Arreglo etiquetas
			Created(fecha de creacion)
			Contenido
			Arreglo comentarios
			Arreglo categorias
		*/
		obj.created=new Date(obj.created);
		this.db.collection("post").insert(obj);
		callback();
	};


	this.update=(obj,callback)=>{
		//simplemente sustituir objeto anterior por nuevo objeto
		obj._id=ObjectID(obj._id);
		this.db.collection("post").update({_id:obj._id},obj);
		callback();
	};


	this.delete=(id,callback)=>{
		this.db.collection("post").remove({_id:id});
		callback();
	};


	this.fetchAll=(callback)=>{
		this.db.collection("post").find({}).toArray((err,res)=>{
			if(err){
				console.log("something went wrong with fetch all");
				console.log(err);
			}
			else{
				callback(res);
			}
		});
	};


	this.fetchOne=(obj,callback)=>{
		this.db.collection("post").findOne(obj,(err,res)=>{
			if(err){
				console.log("something went wrong with fetch one");
				console.log(err);
			}
			else{
				callback(res);
			}
		});
	}


	this.fetchN=(from,to,callback)=>{
		this.db.collection("post").find({}).skip(from).limit(to).toArray((err,res)=>{
			if(err){
				console.log("something went wrong with fetch one");
				console.log(err);
			}
			else{
				callback(res);
			}
		});	
	}

	this.fetchNMonth=(from,to,month,callback)=>{
		const year = (new Date()).getFullYear();
		const start= new Date(year,month,0);
		const end = new Date(year,month+1,0);
		console.log("year:"+year);
		console.log(`month:${month}`);
		console.log("looking for month in range:");
		console.log(start);
		console.log(end);
		console.log(`from${from}to${to}`);
		this.db.collection("post").find({created:{"$gt":start,"$lte":end}}).skip(from).limit(to).toArray((err,res)=>{
			if(err){
				console.log("something went wrong with fetch month");
				console.log(err);
			}
			else{
				console.log("got a month");
				console.log(res);
				callback(res);
			}
		});	
	}


	this.fetchNTag=(from,to,tag,callback)=>{
		this.db.collection("post").find({tags:tag}).skip(from).limit(to).toArray((err,res)=>{
			if(err){
				console.log("something went wrong with fetch tag");
				console.log(err);
			}
			else{
				console.log("got the asked tag");
				console.log(res);
				callback(res);
			}
		});	
	}


	this.fetchNCath=(from,to,cath,callback)=>{
		this.db.collection("post").find({cathegories:cath}).skip(from).limit(to).toArray((err,res)=>{
			if(err){
				console.log("something went wrong with fetch cath");
				console.log(err);
			}
			else{
				console.log("got cath");
				console.log(res);
				callback(res);
			}
		});	
	}


	this.fetchTags=(callback)=>{
		this.db.collection("post").distinct("tags",(err,res)=>{
			if(err){
				console.log("something went wrong with fetch one");
				console.log(err);
			}
			else{
				callback(res);
			}
		});	
	}


	this.fetchCats=(callback)=>{
		this.db.collection("post").distinct("cathegories",(err,res)=>{
			if(err){
				console.log("something went wrong with fetch one");
				console.log(err);
			}
			else{
				callback(res);
			}
		});	
	}


	this.addComment=(id,comment,callback)=>{
		this.db.collection("post").update({_id:id},{$push:{comments:comment}});
	}
};
let dao={PostDao};
module.exports=dao;