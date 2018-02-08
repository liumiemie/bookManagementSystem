function editStudent() {
	$.ajax({
		type: "get",
		url: "http://120.78.142.165:2907/getstudent",
		async: true,
		dataType: "json",
		success: function(data) {
			var str = '';
			for(var i in data) {
				str += `<tr>
					<td>${data[i].stu_id}</td>
					<td>${data[i].stu_name}</td>
					<td>${data[i].sex}</td>
					<td>${data[i].age}</td>
					<td>${data[i].major}</td>
					<td>${data[i].grade}</td>
					<td><span class="student_info" data-id="${data[i].stu_id}">修改</span></td>
				</tr>`
			}
			$(".bt table tbody").html(str);
			//点击修改后跳转到学生修改的详情页
			$(".student_info").click(function() {
				//获取到当前点击的内容
				var id = $(this).attr("data-id");
				var name = $(this).parent().prev().prev().prev().prev().prev().html();
				var sex = $(this).parent().prev().prev().prev().prev().html();
				var age = $(this).parent().prev().prev().prev().html();
				var major = $(this).parent().prev().prev().html();
				var grade = $(this).parent().prev().html();
				$("#cont").load("html/student_change.html", function() {
					//把获取到的内容显示在学生信息详情页面上
					$("#xuehao").val(id);
					$("#name").val(name);
					$("#sex").val(sex);
					$("#age").val(age);
					$("#major").val(major);
					$("#grade").val(grade);

					//点击保存
					$("#save").click(function() {
						$.ajax({
							type: "post",
							url: "http://120.78.142.165:2907/editstudent",
							async: true,
							dataType: "json",
							data: {
								id: id,
								stu_name: $("#name").val(),
								sex: $("#sex").val(),
								age: $("#age").val(),
								major: $("#major").val(),
								grade: $("#grade").val()
							},
							success: function() {
								$("#cont").load("html/student.html", function() {
									editStudent();
								});
							}
						});
					})
					//点击返回
					$("#back").click(function() {
						$("#cont").load("html/student.html", function() {
							editStudent();
						});
					})
				})
			})
		}
	});
}