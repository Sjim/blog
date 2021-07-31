const express=require('express');
const expressStatic=require('express-static');
const bodyParser=require('body-parser');
const bcrptyjs = require('bcryptjs');
const mysql=require('mysql');
//MySQL数据库连接
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123456',
	port:'3306',
	database:'User'
})
connection.connect(function(err){
	if(err){
		console.log('连接失败');
		console.log(err);
	}else{
		console.log('连接成功');
	}
})
//查询
function select(name){
	//异步
	var p=new Promise(function(resolve,reject){
        var sql='SELECT username,password,salt FROM USERINFO WHERE username=?';
		var f=[];
		f.push(name);
		connection.query(sql,f,function(err,result){
			if(err){
				console.log('[SELECT ERROR]-',err.message);
			}else{
				var dataString=JSON.stringify(result);
				var data=JSON.parse(dataString);
				console.log('data[0]为: ',data[0]);
				resolve(data[0]);
			}
		})
	})
	return p;
}
//插入
function insert(arr){
	var addsql='INSERT INTO USERINFO(id,username,password,salt) VALUES(0,?,?,?)';
	var addsqlStr=arr;
	connection.query(addsql,addsqlStr,function(err,result){
		if(err){
			console.log('[INSERT ERROR]-',err.message);
		}else{
			console.log('INSERT is success');
		}
	})
}
//关于注册---->post
var server=express();
server.use(bodyParser.urlencoded({extended: false}));
//解决跨域问题
server.use('*',function(req,res,next){
	    //支持cookie跨域 2
		res.header("Access-Control-Allow-Origin",req.headers.origin);
	    res.header("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    //支持cookie跨域 1
		res.header("Access-Control-Allow-Credentials",true);
		next();
})
server.use('/reg',function(req,res,next){
	var POST=req.body;
	var arr=[];
	var test=select(POST.name);
	var users;
	test.then(function(data){
		users=data;
		console.log('注册用户信息为:',users);
		//检查用户名是否存在
		if(users==undefined){
			if(POST.pass!==POST.rpass){
				res.send({ok:false,msg:"两次输入密码不一致!"});
			}else{
				const salt = bcrptyjs.genSaltSync(10);
			const password = bcrptyjs.hashSync(POST.pass,salt);
			console.log(password);
			arr.push(POST.name);
			arr.push(password);
			arr.push(salt);
			insert(arr);
			res.send({ok:true,msg:"注册成功"});
			}
		}else{
			res.send({ok:false,msg:"用户名已经存在"});
		}
	})
})
//关于登录----->GET
server.use('/login',function(req,res){
	var name=req.query['name'];//前端
	var pass=req.query['pass'];
	//1.检查用户名不存在
	//2.判断用户密码是否正确
	var test=select(name);//数据库
	var users;
	test.then(function(data){
		users=data;
		console.log('登陆用户信息为: ',users);
		if(users==undefined){
			res.send({ok:false,msg:"该用户不存在"});
		}else{
			const calculatedPassword = bcrptyjs.hashSync(pass,users['salt']);
			const flag = calculatedPassword===users['password'];
			console.log("计算密码："+calculatedPassword);
			console.log("数据库密码："+users['password']);
			if(!flag){
				res.send({ok:false,msg:"用户或者密码错误"});
			}
		else{
		
			res.send({ok:true,msg:"登录成功"});
		}
	}
	})
})
//退出------>GET
server.use('/quit',function(req,res){
    res.send('登出成功。重定向的事让前端做');
})
server.use('/favicon.ico',function(req,res){
	res.send('404');
})
server.use(expressStatic('./www'));
server.listen(8080);
