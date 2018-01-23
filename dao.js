function PostDao(database){
	this.db=database;	
		this.insert=(obj,callback)=>{
		this.db.collection("post").insert(obj);
		callback();
	};
	this.update=(obj,callback)=>{
		//simplemente sustituir objeto anterior por nuevo objeto
		this.db.collection("post").update({_id:obj.id},{obj});
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
	this.fetchN=(n,callback)=>{
		this.db.collection("post").find({}).limit(n).toArray((err,res)=>{
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