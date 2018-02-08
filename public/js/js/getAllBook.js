function getAllBook(){
	$.ajax({
		url: 'http://120.78.142.165:2907/getAllBook',
		type: 'GET',
		dataType: 'json',
		success:function(data){
			var str = '';
			for(var i in data){
				str+=`<tr>
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