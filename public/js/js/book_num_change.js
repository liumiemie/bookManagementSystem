function editNum(){
	$.ajax({
		type: "get",
		url: "http://120.78.142.165:2907/getnum",
		async: true,
		dataType: "json",
		success: function(data) {
			var str = '';
			for(var i in data) {
				str += `<tr>
				<td>${data[i].book_id}</td>
				<td>${data[i].book_name}</td>
				<td>${data[i].sort}</td>
				<td>${data[i].author}</td>
				<td>${data[i].price}</td>
				<td>${data[i].total_num}</td>
				<td>${data[i].count}</td>
				<td>${data[i].location}</td>
				<td><span class="num" data-id="${data[i].book_id}">修改</span></td>
			</tr>`
			}
			$(".bt table tbody").html(str);
			//点击修改后跳转到数量修改的详情页
			$(".num").click(function() {
				//获取到当前点击的内容
				var id = $(this).attr("data-id");
				var book_title = $(this).parent().prev().prev().prev().prev().prev().prev().prev().html();
				var current_no = $(this).parent().prev().prev().html();
				var book_store = $(this).parent().prev().prev().prev().html();
				$("#cont").load("html/book_num_change.html",function(){
					//把获取到的内容显示在图书数量详情页面上
					$(".num_info p input:eq(0)").val(id);
					$(".num_info p input:eq(1)").val(book_title);
					$(".num_info p input:eq(2)").val(current_no);
					$(".num_info p input:eq(3)").val(book_store);
					
					//点击保存
					$(".num_info div:eq(0)").click(function() {
						$.ajax({
							type: "post",
							url: "http://120.78.142.165:2907/editnum",
							async: true,
							dataType: "json",
							data: {
								id: id,
								book_title: $(".num_info p input:eq(1)").val(),
								current_no: $(".num_info p input:eq(2)").val(),
								book_store: $(".num_info p input:eq(3)").val()
							},
							success: function() {
								$("#cont").load("html/book_num.html",function(){
									editNum();
								});
							}
						});
					})
					//点击返回
					$(".num_info div:eq(1)").click(function(){
						$("#cont").load("html/book_num.html",function(){
							editNum();
						});
					})
				})
			})
		}
	});
}
