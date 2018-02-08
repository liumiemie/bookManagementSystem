//前端js代码
var  $=require("../lib/jquery-3.2.1.js");
$(function() {
	//默认页面
	getAllBook();
	//头部
	$("#header").load("html/header.html");
	//查询
	//通过id查找书
	$("#sear_byBookId").click(function() {
		$("#cont").load("html/search_id.html", function() {
			//先显示所有图书的信息
			getAllBook();
			//点击查询按钮后显示图书
			$("#sBookById").click(function() {
				//如果搜索的内容为空，则直接显示所有的内容
				if($("#bookId").val() == '') {
					getAllBook();
				} else {
					$.ajax({
						url: 'http://120.78.142.165:2907/getBookById',
						type: 'post',
						data: {
							bookId: $("#bookId").val()
						},
						dataType: 'json',
						success: function(data) {
							console.log(data);
							var str = '';
							for(var i in data) {
								str += `<tr>
									<td>${data[i].book_id}</td>
									<td>${data[i].book_name}</td>
									<td>${data[i].sort}</td>
									<td>${data[i].author}</td>
									<td>${data[i].publish}</td>
									<td>${data[i].price}</td>
									<td>${data[i].barcode}</td>
									<td>${data[i].total_num}</td>
									<td>${data[i].count}</td>
									<td>${data[i].location}</td>
									<td><a href="##" class="del">删除</a><a href="##" class="edit">修改</a></td>
								</tr>`
							}
							if(data.length == 0) {
								str = "未查询到信息";
								$(".con-book table tbody").css({
									"line-height": "80px",
									"text-align": "center"
								})
							}
							$(".con-book table tbody").html(str);
							//点击修改执行事件
							$(".edit").click(function(){
								$(".filter").css('display', 'block');
								$(".editBox").css('display', 'block');
								var id = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
								var name = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
								var sort = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().html();
								var author = $(this).parent().prev().prev().prev().prev().prev().prev().prev().html();
								var publish = $(this).parent().prev().prev().prev().prev().prev().prev().html();
								var price = $(this).parent().prev().prev().prev().prev().prev().html();
								var barcode = $(this).parent().prev().prev().prev().prev().html();
								var total_num = $(this).parent().prev().prev().prev().html();
								var count = $(this).parent().prev().prev().html();
								var location = $(this).parent().prev().html();
								$(".editBox input:eq(0)").val(id);
								$(".editBox input:eq(1)").val(name);
								$(".editBox input:eq(2)").val(sort);
								$(".editBox input:eq(3)").val(author);
								$(".editBox input:eq(4)").val(publish);
								$(".editBox input:eq(5)").val(price);
								$(".editBox input:eq(6)").val(barcode);
								$(".editBox input:eq(7)").val(total_num);
								$(".editBox input:eq(8)").val(count);
								$(".editBox input:eq(9)").val(location);
								$(".certain_edit").click(function() {
									$.ajax({
										url: 'http://120.78.142.165:2907/editSearchBook',
										type: 'post',
										dataType: 'json',
										data: {
											id:$(".editBox input:eq(0)").val(),
											name:$(".editBox input:eq(1)").val(),
											sort:$(".editBox input:eq(2)").val(),
											author:$(".editBox input:eq(3)").val(),
											publish:$(".editBox input:eq(4)").val(),
											price:$(".editBox input:eq(5)").val(),
											barcode:$(".editBox input:eq(6)").val(),
											total_num:$(".editBox input:eq(7)").val(),
											count:$(".editBox input:eq(8)").val(),
											location:$(".editBox input:eq(9)").val()
										},
										success:function(data){
											$(".filter").css('display', 'none');
											$(".editBox").css('display', 'none');
											getAllBook();
										}
									})	
								});
							})
							//点击返回按钮执行事件
							$(".delay_back").click(function(){
								$(".filter").css('display', 'none');
								$(".editBox").css('display', 'none');
							})
							//点击删除执行事件
							$(".del").click(function(){
								$(this).parent().parent().remove();
								var id = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
								$.ajax({
									url: 'http://120.78.142.165:2907/delbook',
									type: 'POST',
									dataType: 'json',
									data: {book_id: id},
									success:function(data){
										console.log(1);
									}
								})
							})
						}
					})
				}

			});
		});
	})
	//通过书名查找书
	$("#sear_byBookName").click(function() {
		$("#cont").load("html/search_byName.html", function() {
			//先显示所有图书的信息
			getAllBook();
			//点击查询按钮后显示图书
			$("#sBookByName").click(function() {
				//如果搜索的内容为空，则直接显示所有的内容
				if($("#search_bookName").val() == '') {
					getAllBook();
				} else {
					$.ajax({
						url: 'http://120.78.142.165:2907/getBookByName',
						type: 'post',
						data: {
							bookName: $("#search_bookName").val()
						},
						dataType: 'json',
						success: function(data) {
							console.log(data);
							var str = '';
							for(var i in data) {
								str += `<tr>
									<td>${data[i].book_id}</td>
									<td>${data[i].book_name}</td>
									<td>${data[i].sort}</td>
									<td>${data[i].author}</td>
									<td>${data[i].publish}</td>
									<td>${data[i].price}</td>
									<td>${data[i].barcode}</td>
									<td>${data[i].total_num}</td>
									<td>${data[i].count}</td>
									<td>${data[i].location}</td>
									<td><a href="##" class="del">删除</a><a href="##" class="edit">修改</a></td>
								</tr>`
							}
							if(data.length == 0) {
								str = "未查询到信息";
								$(".con-book table tbody").css({
									"line-height": "80px",
									"text-align": "center"
								})
							}
							$(".con-book table tbody").html(str);
							//点击修改执行事件
							$(".edit").click(function(){
								$(".filter").css('display', 'block');
								$(".editBox").css('display', 'block');
								var id = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
								var name = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
								var sort = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().html();
								var author = $(this).parent().prev().prev().prev().prev().prev().prev().prev().html();
								var publish = $(this).parent().prev().prev().prev().prev().prev().prev().html();
								var price = $(this).parent().prev().prev().prev().prev().prev().html();
								var barcode = $(this).parent().prev().prev().prev().prev().html();
								var total_num = $(this).parent().prev().prev().prev().html();
								var count = $(this).parent().prev().prev().html();
								var location = $(this).parent().prev().html();
								$(".editBox input:eq(0)").val(id);
								$(".editBox input:eq(1)").val(name);
								$(".editBox input:eq(2)").val(sort);
								$(".editBox input:eq(3)").val(author);
								$(".editBox input:eq(4)").val(publish);
								$(".editBox input:eq(5)").val(price);
								$(".editBox input:eq(6)").val(barcode);
								$(".editBox input:eq(7)").val(total_num);
								$(".editBox input:eq(8)").val(count);
								$(".editBox input:eq(9)").val(location);
								$(".certain_edit").click(function() {
									$.ajax({
										url: 'http://120.78.142.165:2907/editSearchBook',
										type: 'post',
										dataType: 'json',
										data: {
											id:$(".editBox input:eq(0)").val(),
											name:$(".editBox input:eq(1)").val(),
											sort:$(".editBox input:eq(2)").val(),
											author:$(".editBox input:eq(3)").val(),
											publish:$(".editBox input:eq(4)").val(),
											price:$(".editBox input:eq(5)").val(),
											barcode:$(".editBox input:eq(6)").val(),
											total_num:$(".editBox input:eq(7)").val(),
											count:$(".editBox input:eq(8)").val(),
											location:$(".editBox input:eq(9)").val()
										},
										success:function(data){
											$(".filter").css('display', 'none');
											$(".editBox").css('display', 'none');
											getAllBook();
										}
									})	
								});
							})
							//点击返回按钮执行事件
							$(".delay_back").click(function(){
								$(".filter").css('display', 'none');
								$(".editBox").css('display', 'none');
							})
							//点击删除执行事件
							$(".del").click(function(){
								$(this).parent().parent().remove();
								var id = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
								$.ajax({
									url: 'http://120.78.142.165:2907/delbook',
									type: 'POST',
									dataType: 'json',
									data: {book_id: id},
									success:function(data){
										console.log(1);
									}
								})
							})
						}
					})
				}

			});
		});
	})
	//通过类别查找书
	$("#sear_byBookSort").click(function() {
		$("#cont").load("html/search_byBookSort.html", function() {
			//先显示所有图书的信息
			getAllBook();
			//类别的点击事件，点击哪个类别就显示某个类别的信息
			$(".book_sort_box p a").click(function() {
				console.log($(this).html());
				$.ajax({
					url: 'http://120.78.142.165:2907/getBookBySort',
					type: 'post',
					data: {
						bookSort: $(this).html()
					},
					dataType: 'json',
					success: function(data) {
						console.log(data);
						var str = '';
						for(var i in data) {
							str += `<tr>
									<td>${data[i].book_id}</td>
									<td>${data[i].book_name}</td>
									<td>${data[i].sort}</td>
									<td>${data[i].author}</td>
									<td>${data[i].publish}</td>
									<td>${data[i].price}</td>
									<td>${data[i].barcode}</td>
									<td>${data[i].total_num}</td>
									<td>${data[i].count}</td>
									<td>${data[i].location}</td>
									<td><a href="##" class="del">删除</a><a href="##" class="edit">修改</a></td>
								</tr>`
						}
						if(data.length == 0) {
							str = "未查询到信息";
							$(".con-book table tbody").css({
								"line-height": "80px",
								"text-align": "center"
							})
						}
						$(".con-book table tbody").html(str);
						//点击修改执行事件
						$(".edit").click(function(){
							$(".filter").css('display', 'block');
							$(".editBox").css('display', 'block');
							var id = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
							var name = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
							var sort = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().html();
							var author = $(this).parent().prev().prev().prev().prev().prev().prev().prev().html();
							var publish = $(this).parent().prev().prev().prev().prev().prev().prev().html();
							var price = $(this).parent().prev().prev().prev().prev().prev().html();
							var barcode = $(this).parent().prev().prev().prev().prev().html();
							var total_num = $(this).parent().prev().prev().prev().html();
							var count = $(this).parent().prev().prev().html();
							var location = $(this).parent().prev().html();
							$(".editBox input:eq(0)").val(id);
							$(".editBox input:eq(1)").val(name);
							$(".editBox input:eq(2)").val(sort);
							$(".editBox input:eq(3)").val(author);
							$(".editBox input:eq(4)").val(publish);
							$(".editBox input:eq(5)").val(price);
							$(".editBox input:eq(6)").val(barcode);
							$(".editBox input:eq(7)").val(total_num);
							$(".editBox input:eq(8)").val(count);
							$(".editBox input:eq(9)").val(location);
							$(".certain_edit").click(function() {
								$.ajax({
									url: 'http://120.78.142.165:2907/editSearchBook',
									type: 'post',
									dataType: 'json',
									data: {
										id:$(".editBox input:eq(0)").val(),
										name:$(".editBox input:eq(1)").val(),
										sort:$(".editBox input:eq(2)").val(),
										author:$(".editBox input:eq(3)").val(),
										publish:$(".editBox input:eq(4)").val(),
										price:$(".editBox input:eq(5)").val(),
										barcode:$(".editBox input:eq(6)").val(),
										total_num:$(".editBox input:eq(7)").val(),
										count:$(".editBox input:eq(8)").val(),
										location:$(".editBox input:eq(9)").val()
									},
									success:function(data){
										$(".filter").css('display', 'none');
										$(".editBox").css('display', 'none');
										getAllBook();
									}
								})	
							});
						})
						//点击返回按钮执行事件
						$(".delay_back").click(function(){
							$(".filter").css('display', 'none');
							$(".editBox").css('display', 'none');
						})
						//点击删除执行事件
						$(".del").click(function(){
							$(this).parent().parent().remove();
							var id = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();
							$.ajax({
								url: 'http://120.78.142.165:2907/delbook',
								type: 'POST',
								dataType: 'json',
								data: {book_id: id},
								success:function(data){
									console.log(1);
								}
							})
						})
					}
				})
			})
		});
	})

	//修改学生信息
		$("#edit").click(function() {
			$("#cont").load("html/student.html", function() {
				editStudent();
		});
	})
		
	//修改图书数量
	$("#loss").click(function() {
		$("#cont").load("html/book_num.html", function() {
			editNum();
		});
	})
	
	//修改密码
	$("#pass").click(function() {
		$("#cont").load("html/pass_change.html",function(){
			var arr=location.href.split("?");
			var Num=arr[1];
			$(".pass_box").css("cursor","pointer")
			$(".pass_box").click(function(){
				$.ajax({
					url:"http://120.78.142.165:2907/change_pass",
					type:"post",
					data:{
						manager_id:Num,
						new_pass:$(".new input").val()
					},
					success:function(){
						if($(".new input").val()==$(".sure input").val()){
							alert("修改成功！")
						}else{
							alert("两次输入的密码不一样！")
						}
					}
				})
			})
		});
	})

	//图书状态审核
	$("#checkStatus").click(function(){
		$("#cont").load("html/check_borrowStatus.html",function(){
			//先获取所有的借阅记录
			$.ajax({
				url: 'http://120.78.142.165:2907/getAllBorrow',
				type: 'GET',
				dataType: 'json',
				success:function(data){
					console.log(data);
					var str = '';
					for(var i in data){
						str+=`<tr>
								<td>${data[i].id}</td>
								<td>${data[i].stu_id}</td>
								<td>${data[i].book_id}</td>
								<td>${data[i].borrow_time}</td>
								<td>${data[i].return_time}</td>
								<td class="borrow_status">${data[i].status}</td>
								<td>${data[i].fine}</td>
								<td>${data[i].current}</td>
								<td><a href="#" class="editStatus" data-status="${data[i].status}" data-id="${data[i].id}" data-return = "${data[i].return_time}">更改状态</a></td>
							</tr>`
					}
					$(".con-book table tbody").html(str);
					//如果状态为yes为绿色  为no为红色
					$.each($(".borrow_status"),function(index, el) {
						console.log($(el));
						if($(el).html()=='yes'){
						    $(el).css({"color":"green","font-weight":"800"});
						}
						if($(el).html()=='no'){
							$(el).css({"color":"red","font-weight":"800"});
						}
					});
					//点击修改状态后，修改状态并结算罚款，并确定还书时间
					$(".editStatus").click(function(){
						
						//s表示状态，fine表示罚款
						var s = '';
						var fine = 0;
						if($(this).parent().prev().prev().prev().html() == "yes"){
							s = 'no';
						}else{
							s = 'yes';
						}
						//计算还书时间和应还时间之间的天数，算出罚款
						if(timeDiff(StringTime(new Date(),"-"),$(this).attr("data-return"))>0){
							fine = Number.parseInt(Number(timeDiff(StringTime(new Date(),"-"),$(this).attr("data-return")))*0.1*10)/10;
						}else{
							fine = 0;
						}
						console.log(fine);
						console.log(s);
						//计算两个时间的天数差值
						function timeDiff(date1,date2){
							var d1 = Date.parse(date1);
							var d2 = Date.parse(date2);
							var day = Math.abs(Math.floor(d1/(24*3600*1000)) - Math.floor(d2/(24*3600*1000)));
							return day;
						}
						//将还书时间，罚款，状态更新到页面上
						$(this).parent().prev().html(StringTime(new Date(),"-"));
						$(this).parent().prev().prev().html(fine);
						$(this).parent().prev().prev().prev().html(s);
						$.each($(".borrow_status"),function(index, el) {
							console.log($(el));
							if($(el).html()=='yes'){
							    $(el).css({"color":"green","font-weight":"800"});
							}
							if($(el).html()=='no'){
								$(el).css({"color":"red","font-weight":"800"});
							}
						});
						//请求后台，后台对状态进行改变
						$.ajax({
							url: 'http://120.78.142.165:2907/checkStatus',
							type: 'post',
							dataType: 'json',
							data: {
								status: s,
								borrow_id:$(this).attr("data-id"),
								current:StringTime(new Date(),"-"),
								fine:fine
							},
							success:function(data){
								console.log(data)
							}
						})
					})
				}
			})
		});
	})
	//图书续借
	$("#delayBorrow").click(function(){
		$("#cont").load("html/delayBorrow.html",function(){
			$.ajax({
				url: 'http://120.78.142.165:2907/getAllBorrow',
				type: 'GET',
				dataType: 'json',
				success:function(data){
					console.log(data);
					var str = '';
					for(var i in data){
						str+=`<tr>
								<td>${data[i].id}</td>
								<td>${data[i].stu_id}</td>
								<td>${data[i].book_id}</td>
								<td>${data[i].borrow_time}</td>
								<td class="r_time" data-my="${data[i].id}">${data[i].return_time}</td>
								<td>${data[i].status}</td>
								<td>${data[i].fine}</td>
								<td>${data[i].current}</td>
								<td><a href="##" class="editStatus" data-id="${data[i].id}">续借</a></td>
							</tr>`
					}
					$(".con-book table tbody").html(str);
					$(".editStatus").click(function(){
						$(".filter").css('display', 'block');
						$(".alertbox").css('display', 'block');
						var return_time = new Date($(this).parent().prev().prev().prev().prev().html());
						var id =$(this).attr("data-id");
						$(".certain").click(function(){
							var val = $("#daycount").val();//获取输入的天数
							var newDate=new Date(return_time.setDate(return_time.getDate()+Number(val)));
							$.ajax({
								url: 'http://120.78.142.165:2907/changeBoorrowTime',
								type: 'post',
								dataType: 'json',
								data: {
									day: StringTime(newDate,'-'),
									borrow_id:id
								},
								success:function(data){

								}
							})
							$(".filter").css('display', 'none');
							$(".alertbox").css('display', 'none');
							$.each($(".r_time"),function(index, el) {
								if($(el).attr("data-my")==id){
									$(el).html(StringTime(newDate,'-'));
								}
							})
							
						})
					})
					
					$(".delay_back").click(function(){
						$(".filter").css('display', 'none');
						$(".alertbox").css('display', 'none');
					})
				}
			})
		});
	})
	//增加图书
	$("#addbook").click(function(){
		$("#cont").load("html/AddBook.html",function(){
			//获取到页面上输入的值
			$(".add_box").click(function(){
				$.ajax({
					url:'http://120.78.142.165:2907/addbook',
					type:'post',
					data:{
						book_id:$("input:eq(0)").val(),
						book_name:$("input:eq(1)").val(),
						sort:$("#add_sort option:selected").text(),
						author:$("input:eq(2)").val(),
						publish:$("input:eq(3)").val(),
						pub_time:$("input:eq(4)").val(),
						price:$("input:eq(5)").val(),
						barcode:$("input:eq(6)").val(),
						total_num:$("input:eq(7)").val(),
						count:$("input:eq(8)").val(),
						location:$("input:eq(9)").val()
					},
					success:function(data){
						alert("添加成功！")
					}
				})
				
			})
		});
	})
	//增加学生
	$("#addstu").click(function(){
		$("#cont").load("html/AddStu.html",function(){
			$(".add_box").click(function(){
				$.ajax({
					url:'http://120.78.142.165:2907/addstu',
					type:'post',
					data:{
						stu_id:$("input:eq(0)").val(),
						stu_name:$("input:eq(1)").val(),
						sex:$("input:eq(2)").val(),
						age:$("input:eq(3)").val(),
						major:$("input:eq(4)").val(),
						grade:$("input:eq(5)").val()
					},
					success:function(data){
						alert("添加成功！")
					}
				})
			})
		});
	})

	//删除图书
	$("#deletebook").click(function(){
		$("#cont").load("html/DeleteBook.html",function(){
			//显示在页面上
			$.ajax({
				type:"post",
				url:"http://120.78.142.165:2907/showbook",
				dataType:"json",
				success:function(data){
					var str='';
					for(var i in data){
						str+=`<tr>
							<td>${data[i].book_id}</td>
							<td>${data[i].book_name}</td>
							<td>${data[i].sort}</td>
							<td>${data[i].author}</td>
							<td>${data[i].publish}</td>							
							<td>${data[i].price}</td>
							<td id="delbtn"><span>删除</span></td>
						</tr>`
					}
					$(".delete_ta table tbody").html(str);
					$("#delbtn span").css("cursor","Pointer");
					//删除数据
					$("#delbtn span").each(function(){						
						$(this).click(function(){
							$.ajax({
								url:"http://120.78.142.165:2907/delbook",
								type:"post",
								data:{
									book_id:$(this).parent().parent().children().eq(0).html()
								}
							});
							$(this).parent().parent().remove();
							alert("删除成功！")		
						})
					})
				}
			})
		})
	})

	//删除学生
	$("#deletestu").click(function(){
		$("#cont").load("html/DeleteUser.html",function(){
			//显示在页面上
			$.ajax({
				type:"post",
				url:"http://120.78.142.165:2907/showstu",
				dataType:"json",
				success:function(data){
					var str='';
					for(var i in data){
						str+=`<tr>
							<td>${data[i].stu_id}</td>
							<td>${data[i].stu_name}</td>
							<td>${data[i].sex}</td>
							<td>${data[i].age}</td>
							<td>${data[i].major}</td>							
							<td>${data[i].grade}</td>
							<td id="delbtn"><span>删除</span></td>
						</tr>`
					}
					$(".delete_ta table tbody").html(str);
					$("#delbtn span").css("cursor","Pointer");
					//删除数据
					$("#delbtn span").each(function(){						
						$(this).click(function(){
							$.ajax({
								url:"http://120.78.142.165:2907/delstu",
								type:"post",
								data:{
									stu_id:$(this).parent().parent().children().eq(0).html()
								}
							});
							$(this).parent().parent().remove();
							alert("删除成功！")		
						})
					})
				}
			})
		});
	})
	//通过作者查询图书信息
	$("#authorSearch").click(function() {
		$("#cont").load("html/search_author.html", function() {
			var btn = $("#author").next();
			btn.click(function() {
				var val = $("#author").val();
				var str = `
				<tr>
					<th>图书编号</th><th>书名</th><th>作者</th><th>类别</th><th>出版时间</th>
					<th>出版社</th><th>库存</th><th>价格</th><th>可借数量</th>
				</tr>
				`;
				$.ajax({
					type: "get",
					url: "http://120.78.142.165:2907/author",
					async: true,
					data: {
						author: val
					},
					success: function(data) {
						data = JSON.parse(data);
						var str1 = '';
						//如果没有该信息显示提示信息
						if(data.length == 0) {
							str1 = '<tr><td colspan="9">经查询无该作者图书</td></tr>'
						} else {
							//如果有将数据全部输出显示
							for(var i in data) {
								str1 += `
								<tr>
									<td>${data[i].book_id}</td><td>${data[i].book_name}</td><td class="find_color">${data[i].author}</td><td>${data[i].sort}</td><td>${data[i].pub_time}</td>
									<td>${data[i].publish}</td><td>${data[i].total_num}</td><td>${data[i].price}</td><td>${data[i].count}</td>
								</tr>
								`;
							}
						}
						$(".author_cont table").html(str + str1);
						//清空输入框
						$("#author").val('');
					}
				});
			});
		});
	})
	//学生信息查询
	$("#stuSearch").click(function() {
		$("#cont").load("html/stu_search.html", function() {
			var str = `<tr>
				<th>学号</th><th>姓名</th><th>性别</th>
				<th>专业</th><th>年龄</th><th>年级</th>
			</tr>`;
			var str1 = '';
			$.ajax({
				type: "get",
				url: "http://120.78.142.165:2907/stu",
				async: true,
				success: function(data) {
					data = JSON.parse(data);
					for(var i in data) {
						str1 += `
						<tr>
							<td>${data[i].stu_id}</td><td>${data[i].stu_name}</td><td>${data[i].sex}</td>
							<td>${data[i].major}</td><td>${data[i].age}</td><td>${data[i].grade}</td>
						</tr>
						`;
					}
					$(".stu_findway_cont>table").html(str + str1);
					var li = $(".stu_findway ul").find('li');
					//通过ID查询学生信息
					li.eq(1).on('click', function() {
						var val = li.eq(0).children().val();
						var str2 = '';
						var count = 0;
						if(val.length != 0) {
							for(var i in data) {
								if(data[i].stu_id == val) {
									str2 = `
									<tr>
										<td class="find_color">${data[i].stu_id}</td><td>${data[i].stu_name}</td><td>${data[i].sex}</td>
										<td>${data[i].major}</td><td>${data[i].age}</td><td>${data[i].grade}</td>
									</tr>
									`;
									count++;
								}
							}
							if(count == 0) {
								str2 = '<tr><td colspan="6">无此信息！</td></tr>';
							}
							$(".stu_findway_cont>table").html(str + str2);
						}
						li.eq(0).children().val('');
					});
					//通过姓名查找学生信息
					li.eq(2).on('click', function() {
						var val = li.eq(0).children().val();
						var str2 = '';
						var count = 0;
						if(val.length != 0) {
							for(var i in data) {
								if(data[i].stu_name.indexOf(val) != -1) {
									str2 += `
									<tr>
										<td>${data[i].stu_id}</td><td class="find_color">${data[i].stu_name}</td><td>${data[i].sex}</td>
										<td>${data[i].major}</td><td>${data[i].age}</td><td>${data[i].grade}</td>
									</tr>
									`;
									count++;
								}
							}
							if(count == 0) {
								str2 = '<tr><td colspan="6">无此信息！</td></tr>';
							}
							$(".stu_findway_cont>table").html(str + str2);
						}
						li.eq(0).children().val('');
					});
					//通过专业查询学生信息——模糊查询
					li.eq(3).on('click', function() {
						var val = li.eq(0).children().val();
						var str2 = '';
						var count = 0;
						if(val.length != 0) {
							for(var i in data) {
								if(data[i].major.indexOf(val) != -1) {
									str2 += `
									<tr>
										<td>${data[i].stu_id}</td><td>${data[i].stu_name}</td><td>${data[i].sex}</td>
										<td class="find_color">${data[i].major}</tdh><td>${data[i].age}</td><td>${data[i].grade}</td>
									</tr>
									`;
									count++;
								}
							}
							if(count == 0) {
								str2 = '<tr><td colspan="6">无此信息！</td></tr>';
							}
							$(".stu_findway_cont>table").html(str + str2);
						}
						li.eq(0).children().val('');
					});
					//通过年级查询学生信息
					li.eq(4).on('click', function() {
						var val = li.eq(0).children().val();
						var str2 = '';
						var count = 0;
						if(val.length != 0) {
							for(var i in data) {
								if(data[i].grade == val) {
									str2 += `
									<tr>
										<td>${data[i].stu_id}</td><td>${data[i].stu_name}</td><td>${data[i].sex}</td>
										<td>${data[i].major}</td><td>${data[i].age}</td><td class="find_color">${data[i].grade}</td>
									</tr>
									`;
									count++;
								}
							}
							if(count == 0) {
								str2 = '<tr><td colspan="6">无此信息！</td></tr>';
							}
							$(".stu_findway_cont>table").html(str + str2);
						}
						li.eq(0).children().val('');
					});
					//显示所有学生信息
					li.eq(5).on('click', function() {
						$(".stu_findway_cont>table").html(str + str1);
					});

				}
			});

		});
	})
	//借阅记录查询
	$("#loanSearch").click(function() {
		$("#cont").load("html/loaningRecord.html", function() {
			$.ajax({
				type: "get",
				url: "http://120.78.142.165:2907/loan",
				async: true,
				success: function(data) {
					data = JSON.parse(data);
					var str = `
					<tr>
						<th>编号</th><th>学号</th><th>书籍编号</th>
						<th>借书时间</th><th>还书时间</th><th>状态</th>
						<th>罚款</th><th colspan="2">操作</th>
					</tr>
					`;
					var str1 = '';
					for(var i in data) {
						var btime = data[i].borrow_time.split(' ')[0];
						var rtime = data[i].return_time.split(' ')[0];
						str1 += `
						<tr>
							<td>${data[i].id}</td><td>${data[i].stu_id}</td><td>${data[i].book_id}</td>
							<td>${btime}</td><td>${rtime}</td><td>${data[i].status}</td>
							<td>${data[i].fine}</td><td><a href="#" class="loan_stuid">查看学生信息</a></td>
							<td><a href="#" class="loan_books">查看图书信息</a></td>
						</tr>
						`;
					}
					$(".loan_cont table").html(str + str1);
					//显示未归还记录
					$("#loan_noReturn").on("click", function() {
						str1 = '';
						for(var j in data) {
							if(data[j].status == 'no') {
								var btime = data[j].borrow_time.split(' ')[0];
								var rtime = data[j].return_time.split(' ')[0];
								str1 += `
								<tr>
									<td>${data[j].id}</td><td>${data[j].stu_id}</td><td>${data[j].book_id}</td>
									<td>${btime}</td><td>${rtime}</td><td>${data[j].status}</td>
									<td>${data[j].fine}</td><td><a href="#" class="loan_stuid">查看学生信息</a></td>
									<td><a href="#" class="loan_books">查看图书信息</a></td>
								</tr>
								`;
							}
						}
						$(".loan_cont table").html(str + str1);
						$("#loan_noReturn").attr({"class": 'loat_check'});
						$("#loan_all").attr({"class": ''});
						str1 = '';
						a = $(".loan_stuid");
						a.click(function(){
							var stu_id = $(this).parent().parent().children().eq(1).html();
							getStuMess(stu_id);
						});
						books = $(".loan_books");
						books.click(function(){
							var book_id = $(this).parent().parent().children().eq(2).html();
							getBookMess(book_id);
						});
					});
					
					//显示所有记录
					$("#loan_all").on("click", function() {
						str1 = '';
						for(var j in data) {
							var btime = data[j].borrow_time.split(' ')[0];
							var rtime = data[j].return_time.split(' ')[0];
							str1 += `
							<tr>
								<td>${data[j].id}</td><td>${data[j].stu_id}</td><td>${data[j].book_id}</td>
								<td>${btime}</td><td>${rtime}</td><td>${data[j].status}</td>
								<td>${data[j].fine}</td><td><a href="#" class="loan_stuid">查看学生信息</a></td>
								<td><a href="#" class="loan_books">查看图书信息</a></td>
							</tr>
							`;
						}
						$(".loan_cont table").html(str + str1);
						$("#loan_all").attr({"class": 'loat_check'});
						$("#loan_noReturn").attr({"class": ''});
						a = $(".loan_stuid");
						a.click(function(){
							var stu_id = $(this).parent().parent().children().eq(1).html();
							getStuMess(stu_id);
						});
						books = $(".loan_books");
						books.click(function(){
							var book_id = $(this).parent().parent().children().eq(2).html();
							getBookMess(book_id);
						});
					});
					//查看当前记录的学生信息
					var a = $(".loan_stuid");
					a.click(function(){
						var stu_id = $(this).parent().parent().children().eq(1).html();
						getStuMess(stu_id);
					});
					var books = $(".loan_books");
					books.click(function(){
						var book_id = $(this).parent().parent().children().eq(2).html();
						getBookMess(book_id);
					});
					//获取学生信息方法
					function getStuMess(stu_id){
						$.ajax({
							type:"get",
							url:"http://120.78.142.165:2907/loan_stu",
							data:{
								id:stu_id
							},
							async:true,
							success:function(datas){
								datas = JSON.parse(datas);
								var str2 = `<tr>
									<th>学号</th><th>姓名</th><th>性别</th>
									<th>专业</th><th>年龄</th><th>年级</th>
								</tr>
								`;
								for(var j in datas){
									str2 += `
									<tr>
										<td>${datas[j].stu_id}</td><td>${datas[j].stu_name}</td><td>${datas[j].sex}</td>
										<td>${datas[j].major}</td><td>${datas[j].age}</td><td>${datas[j].grade}</td>
									</tr>
									`;
								}
								$(".loan_cont table").html(str2);
							}
						});
					}
					//获取图书信息方法
					function getBookMess(book_id){
						$.ajax({
							type:"get",
							url:"http://120.78.142.165:2907/loan_book",
							data:{
								id:book_id
							},
							async:true,
							success:function(datas){
								datas = JSON.parse(datas);
								var str2 = `
								<tr>
									<th>图书编号</th><th>书名</th><th>作者</th><th>类别</th><th>出版时间</th>
									<th>出版社</th><th>库存</th><th>价格</th><th>可借数量</th>
								</tr>
								`;
								for(var j in datas){
									str2 += `
									<tr>
										<td>${datas[j].book_id}</td><td>${datas[j].book_name}</td><td>${datas[j].author}</td><td>${datas[j].sort}</td><td>${datas[j].pub_time}</td>
										<td>${datas[j].publish}</td><td>${datas[j].total_num}</td><td>${datas[j].price}</td><td>${datas[j].count}</td>
									</tr>
									`;
								}
								$(".loan_cont table").html(str2);
							}
						});
					}
				}
			});
		});
	});
	//罚款管理
	$("#pena").click(function() {
		$("#cont").load("html/penalty.html", function() {
			$.ajax({
				type: "get",
				url: "http://120.78.142.165:2907/pena",
				async: true,
				success: function(data) {
					data = JSON.parse(data);
					var str1 = '';
					var str = `
					<tr>
						<th>编号</th><th>学号</th><th>书籍编号</th>
						<th>应还时间</th><th>还书时间</th><th>状态</th>
						<th>罚款</th><th>操作</th>
					</tr>
					`;
					for(var i in data) {
						var btime = data[i].return_time.split(' ')[0];
						str1 += `
						<tr>
							<td>${data[i].id}</td><td>${data[i].stu_id}</td><td>${data[i].book_id}</td>
							<td>${btime}</td><td>${data[i].current}</td><td>${data[i].status}</td>
							<td>${data[i].fine}</td><td><a href="#">还款</a></td>
						</tr>
						`;
					}
					$(".penalty_cont table").html(str + str1)
					//通过学号查询
					$("#search_noReturn").on("click", function() {
						str1 = '';
						var num = 0;
						var vals = $("#search_noReturn").prev().val();
						for(var j in data) {
							if(data[j].stu_id == vals) {
								var btime = data[j].return_time.split(' ')[0];
								str1 += `
								<tr>
									<td>${data[j].id}</td><td>${data[j].stu_id}</td><td>${data[j].book_id}</td>
									<td>${btime}</td><td>${data[j].current}</td><td>${data[j].status}</td>
									<td>${data[j].fine}</td><td><a href="#">还款</a></td>
								</tr>
								`;
								num++;
							}
						}
						if(num == 0) {
							str1 = `<tr><td colspan="8">该学生无罚款</td></tr>`;
						}
						$("#search_noReturn").prev().val('')
						$(".penalty_cont table").html(str + str1);
						a = $(".penalty_cont table tr td a");
						a.click(function() {
							var tr = $(this).parent().parent();
							returnFine(tr);
						})
					});
					//显示所有记录
					$("#loan_all").on("click", function() {
						str1 = '';
						var num = 0;
						$.ajax({
							type: "get",
							url: "http://120.78.142.165:2907/pena",
							async: true,
							success: function(data) {
								data = JSON.parse(data);
								for(var j in data) {
									var btime = data[j].borrow_time.split(' ')[0];
									var rtime = data[j].return_time.split(' ')[0];
									str1 += `
									<tr>
										<td>${data[j].id}</td><td>${data[j].stu_id}</td><td>${data[j].book_id}</td>
										<td>${btime}</td><td>${rtime}</td><td>${data[j].status}</td>
										<td>${data[j].fine}</td><td><a href="#">还款</a></td>
									</tr>
									`;
									num++;
								}
								if(num == 0) {
									str1 = `<tr><td colspan="8">无未缴纳罚款</td></tr>`;
								}
								$(".penalty_cont table").html(str + str1);
								a = $(".penalty_cont table tr td a");
								a.click(function() {
									var tr = $(this).parent().parent();
									returnFine(tr);
								})
							}
						})
					});
					//点击还款：将未归还图书归还改变状态，已归还图书罚款金额变为0
					var a = $(".penalty_cont table tr td a");
					a.click(function() {
						var tr = $(this).parent().parent();
						returnFine(tr);
					})
					function returnFine(tr){
						var id = tr.children(0).html();
						var return_time = tr.children().eq(4).html();
						if(return_time.length != 0){
							var status = tr.children().eq(5);
							status.html('yes');
							var money = tr.children().eq(6);
							status.html('0');
							$.ajax({
								type: "get",
								url: "http://120.78.142.165:2907/pena_pay",
								async: true,
								data: {
									id: id
								}
							});
							tr.remove();
						}
					}
				}
			});
		});
	})
	//将时间转换为字符串
	function StringTime(d,sign){
		if(!sign){
			sign = '/'
		}

		return d.getFullYear()+sign+String3num((d.getMonth()+1))+sign+String3num(d.getDate())+' '+String3num(d.getHours())+':'+String3num(d.getMinutes())+':'+String3num(d.getSeconds());
	}
	//不足2位补0
	function String3num(num){
		if(num<10){
			num = '0'+num
		}
		return num;
	}
})