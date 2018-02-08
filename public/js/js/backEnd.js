//后端运行js文件
var mysql = require("mysql");
var http = require("http");
var express = require("express");
var app = express();
//创建数据库连接
var connect = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'2907lrh',
	database:'bookmanagement'
});
// 处理post请求的请求体模块
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//开始连接
connect.connect();

//查询所有学生信息
app.get("/stu",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query('SELECT * FROM student', function(error, results, fields) {
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});
//查询借阅记录
app.get("/loan",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query('SELECT * FROM borrow', function(error, results, fields) {
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});
//通过作者名查询图书信息
app.get("/author",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query(`SELECT * FROM book WHERE author like '%${req.query.author}%'`, function(error, results, fields) {
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});
//查询有罚款的信息
app.get("/pena",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query(`SELECT * FROM borrow WHERE fine != '0'`, function(error, results, fields) {
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});
//执行还款操作
app.get("/pena_pay",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query(`UPDATE borrow SET fine=0 WHERE id = '${req.query.id}'`, function(error, results, fields) {
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});
//通过ID查询学生信息
app.get("/loan_stu",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query(`SELECT * FROM student WHERE stu_id = '${req.query.id}'`, function(error, results, fields) {
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});
//通过ID查询图书信息
app.get("/loan_book",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query(`SELECT * FROM book  WHERE book_id = '${req.query.id}'`, function(error, results, fields) {
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});
//登录验证
app.get("/login",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query(`SELECT id FROM maneger WHERE manager_name = '${req.query.name}' AND manager_pass = '${req.query.pass}'`, function(error, results, fields) {
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});


//查询所有图书
app.get("/getAllBook",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	connect.query('SELECT * FROM book', function (error, results, fields) {
		console.log(results);
		if (error) throw error;
		console.log(results);
		  res.send(JSON.stringify(results));
	});
    
	//关闭连接
//	connection.end();
})
//通过id来查询图书
app.post("/getBookById",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	console.log(req.body);
	connect.query(`SELECT * FROM book where book_id = ${req.body.bookId} `, function (error, results, fields) {
		console.log(results);
		if (error) throw error;
			console.log(results);
		res.send(JSON.stringify(results));
	});
})
//通过书名来查询图书
app.post("/getBookByName",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	console.log(req.body);
	connect.query(`SELECT * FROM book where book_name LIKE '%${req.body.bookName}%' `, function (error, results, fields) {
		console.log(results);
		if (error) throw error;
			console.log(results);
		res.send(JSON.stringify(results));
	});
})

//通过书的类别来查询图书
app.post("/getBookBySort",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	console.log(req.body);
	connect.query(`SELECT * FROM book where sort like '%${req.body.bookSort}%' `, function (error, results, fields) {
		console.log(results);
		if (error) throw error;
			console.log(results);
		res.send(JSON.stringify(results));
	});
})

//查询所有的借阅记录
app.get("/getAllBorrow",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	console.log(req.body);
	connect.query('SELECT * FROM borrow', function (error, results, fields) {
		console.log(results);
		if (error) throw error;
			console.log(results);
		res.send(JSON.stringify(results));
	});
})
//修改借阅状态
app.post("/checkStatus",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	console.log(req.body);
	connect.query(`UPDATE borrow SET status = '${req.body.status}',fine = ${req.body.fine},current = '${req.body.current}' where id = ${req.body.borrow_id}`, function (error, results, fields) {
		console.log("success");
		if (error) throw error;
			console.log("error");
		res.send(results);
	});
})
//续借图书  修改归还时间
app.post("/changeBoorrowTime",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	console.log(req.body);
	connect.query(`UPDATE borrow SET return_time = '${req.body.day}' where id = ${req.body.borrow_id}`, function (error, results, fields) {
		console.log("success");
		if (error) throw error;
			console.log("error");
		res.send(results);
	});
})
//添加图书
app.post("/addbook",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO book(book_id,book_name,sort,author,publish,pub_time,price,barcode,total_num,count,location) VALUES (${req.body.book_id},'${req.body.book_name}','${req.body.sort}','${req.body.author}','${req.body.publish}','${req.body.pub_time}','${req.body.price}','${req.body.barcode}',${req.body.total_num},${req.body.count},'${req.body.location}')`;
    connect.query(sql, function (error, results, fields){
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})
//添加学生
app.post("/addstu",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
    var sql = `INSERT INTO student(stu_id, stu_name, sex, age, major, grade) VALUES (${req.body.stu_id},'${req.body.stu_name}','${req.body.sex}',${req.body.age},'${req.body.major}','${req.body.grade}')`;
    console.log(sql)
    connect.query(sql, function (error, results, fields){
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
})
//显示图书
app.post("/showbook",function(req, res){
    res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * FROM book`;
    connect.query(sql, function (error, results, fields){
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})
//删除图书
app.post("/delbook",function(req, res){
    res.append("Access-Control-Allow-Origin","*");
	var sql = `DELETE FROM book WHERE book_id=${req.body.book_id}`;
    connect.query(sql, function (error, results, fields){
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})
//显示学生
app.post("/showstu",function(req, res){
    res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * FROM student`;
    connect.query(sql, function (error, results, fields){
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})
//删除学生
app.post("/delstu",function(req, res){
    res.append("Access-Control-Allow-Origin","*");
	var sql = `DELETE FROM student WHERE stu_id=${req.body.stu_id}`;
    connect.query(sql, function (error, results, fields){
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})
//修改密码
app.post("/change_pass",function(req, res){
    res.append("Access-Control-Allow-Origin","*");
	var sql = `UPDATE maneger SET manager_pass='${req.body.new_pass}' WHERE id=${req.body.manager_id}`;
	console.log(sql)
    connect.query(sql, function (error, results, fields){
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})
//获取所有学生信息
app.get("/getstudent",function(req,res){
	//解决跨域
	 res.append("Access-Control-Allow-Origin","*");
	 connect.query(`SELECT * FROM student`, function(error, results, fields) {
		if(error) throw error;
		//console.log(results);
		res.send(JSON.stringify(results));
	});
})
//修改学生信息
app.post("/editstudent",function(req,res){
	//解决跨域
	res.append("Access-Control-Allow-Origin","*");
	// 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
	console.log(req.body);
	var str=`UPDATE student SET stu_name ='${req.body.stu_name}',sex = '${req.body.sex}',age ='${req.body.age}',major ='${req.body.major}',grade ='${req.body.grade}' where stu_id =${req.body.id}`;
	console.log(str)
	connect.query(str, function(error, results, fields) {
		if(error) throw error;
		//console.log(results);
		res.send(JSON.stringify({
			
		}))
	});
})
//获取所有的图书数量
app.get("/getnum",function(req,res){
	//解决跨域
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	connect.query(`SELECT * FROM book`, function(error, results, fields) {
		if(error) throw error;
		//console.log(results);
		res.send(JSON.stringify(results));
	});
})
//修改图书数量
app.post("/editnum",function(req,res){
	//解决跨域
	res.append("Access-Control-Allow-Origin","*");
	var str=`UPDATE book SET book_name ='${req.body.book_title}',total_num =${req.body.book_store},count = ${req.body.current_no} where book_id =${req.body.id}`;
	//console.log(str)
	connect.query(str, function(error, results, fields) {
		if(error) throw error;
		//console.log(results);
		res.send(JSON.stringify({
			
		}))
	});
})
//编辑查找出来的图书
app.post("/editSearchBook",function(req, res){
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行——查询
	console.log(req.body);
	connect.query(`UPDATE book SET book_name ='${req.body.name}',sort='${req.body.sort}',author='${req.body.author}',publish='${req.body.publish}',price='${req.body.price}',barcode='${req.body.barcode}',total_num='${req.body.total_num}',count='${req.body.count}',location='${req.body.location}' where book_id = ${req.body.id} `, function (error, results, fields) {
		console.log(results);
		if (error) throw error;
			console.log(results);
		res.send(JSON.stringify(results));
	});
})
//监听端口
app.listen(2907);
console.log("开启服务器");
