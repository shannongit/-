//var url = 'http://192.168.1.41:1337/'
var lineId;
var poleId;

$.ajax({
	url: url + 'voltageline',
	type: "get",
	dataType: 'json',
	success: function(data) {
		console.log('获取资产信息成功');
		//					console.log(Object)
		console.log(data);
		console.log(data.data);
		console.log(data.data.name);
		var jsv = JSON.parse(data.data);
		console.log(jsv.length);
		console.log(jsv);
		var trend = '';
		for(var i = 0; i < jsv.length; i++) {
			
			trend += '<thead>'
			trend += '</thead>'
			trend += '<tbody>'
			trend += '<tr>'
			//			            trend +='<td>'+js[i].id+'</td>' 
			//						trend += '<td>' + js[i].lineId + '</td>'
			trend += '<td class="dianya" id="' + jsv[i].voltageClass + '" >' + jsv[i].voltageClass + '</td>'
			trend += '</tbody>'
		}
		$('#play4').append(trend);
		$(document.body).on('click', ".dianya", function() {
			$("#LuXian td").remove();
			//			    $(".dianya").html(dianya);
			var dianya = $(this).attr("id");
			//			var v = '';
			//			var v = $(".dianya").index($(this));
			//			//			$(".dianya").html(jsv[v].voltageClass);
			//
			//			var dianya = jsv[v].voltageClass;

			console.log(dianya);
			//			console.log("点击了第" + v + "个")
			//			console.log(jsv[v].voltageClass)

			//			var FileList=document.getElementById("ssi-upload").files;
			$.ajax({
				//				url: 'http://192.168.1.41:1337/peopleLineList',
				//				url: url + 'lineList', //url: url + 'linePoles/' + 504,
				url: url + 'voltageline',
				//data: "127605d5-ee91-4557-a7fe-fb096918b6bc",
				type: "post",
				dataType: 'json',
				data: {
					"voltage": dianya,

				},
				success: function(data) {
					console.log('获取资产信息成功');
					//					console.log(Object)
					console.log(data);
					console.log(data.data);

					var js = JSON.parse(data.data);
					console.log(js.length);
					console.log(js);

					var trend = '';
					for(var i = 0; i < js.length; i++) {
						var Distance = js[i].distance * 1

						trend += '<tr>'
						//			            trend +='<td>'+js[i].id+'</td>' 
						//						trend += '<td>' + js[i].lineId + '</td>'
						trend += '<td class="line" id="' + js[i].lineId + '" >' + js[i].name + '</td>'
						trend += '<td>' + js[i].num + '</td>'
						trend += '<td>' + Distance.toFixed(2) + 'm' + '</td>'
						//						trend += '<td class="Edit">' + '修改' + '</td>'
						trend += '<td id="lineid_' + js[i].lineId + '" class="Delete">' + '删除' + '</td>'
						//			            trend +='<td class="Add">'+'存入文件'+'</td>'
						//			            trend +='<td class="Selch">'+'查看文件'+'</td>'
						trend += '</tr>'

					}
					$('#luxian').html(trend);
					//					form_luxian();

					$(document.body).on('click', ".line", function() {
						//     					$("#play3 td").remove();

						//			$("#GanTa td").remove();
						//			$('#GanTa').children('th').remove();
						$("#gt").remove();
						//						var x = $(".line").index($(this));
						var line_id = $(this).attr("id");
						//						console.log("点击了第" + x + "个");
						console.log("lineID:" + line_id)
						//					  console.log("7777777")
						$.ajax({
							//url: 'http://192.168.1.41:1337/peopleLineList',
							url: url + 'voltageline' + '/' + line_id + '/' + dianya,
							//data: "127605d5-ee91-4557-a7fe-fb096918b6bc",
							type: 'get',
							dataType: 'json',

							success: function(data) {
								console.log('获取单个信息成功');
								console.log(data.data)
								var js = JSON.parse(data.data);
								console.log(js.length);
								console.log(js)
								$(document.body).on('click', ".Add", function() {
									//     								$('.Add').index().remove();
									var Addindex = $(".Add").index($(this));

									console.log(Addindex)
									console.log("666666666666")
									console.log(js[Addindex].lineId)
									console.log(js[Addindex].PoleID)
									//									  console.log(JSON)
									lineId = js[Addindex].lineId;
									poleId = js[Addindex].PoleID;
								});
								//					$('#GanTa').children('tbody').remove();
								var trend1 = '';
								for(var q = 0; q < js.length; q++) {
									trend1 += '<tr>'
									trend1 += '<td>' + js[q].id + '</td>'
									trend1 += '<td id="' + js[q].lineId + '" >' + js[q].LineName + '</td>'
									trend1 += '<td class="bianhao" title="点击查看台账详细信息" id="' + js[q].PhyID + '" >' + js[q].PoleName + '</td>'
									trend1 += '<td>' + js[q].clockNum + '</td>'
									trend1 += '<td class="Add">' + '存' + '</td>'
									trend1 += '<td class="Selch" id="' + js[q].PoleID + '">' + '查' + '</td>'
									trend1 += '<td class="SelchVideo" id="' + js[q].PoleID + "_____" + '">' + '视频' + '</td>'
									trend1 += '<td class="AddQJT"><a href="panorama.html"  target=_blank>添加全景图</a></td>'
									//						trend1 += '<td class="AddQJT">' + '查看全景图' + '</td>'
									trend1 += '</tr>'

								}
								$('#ganta').html(trend1);
								//					form_ganta();
								//									$('#played').children('tbody').remove();
								//点击获取路线和杆塔的id

							}
						});
					}); //杆塔循环结束
				} //获取路线结束
			}); //ajax结束
		})
	}
})

//								

//弹出一个页面层
$(document.body).on('click', '.Add', function() {
	layer.open({
		type: 1,
		area: ['720px', '720px'],
		shadeClose: true, //点击遮罩关闭
		content: '<div id="urlTest">' +
			'<div class="container">' +
			'<div class="container">' +
			//										'<h3>注意：如果选择的文件格式错误将无法得到上传程序的支持，点击上传按钮时会返回错误信息！</h3>'+
			'<div class="row">' +
			'<div class="col-md-12">' +
			'<h3>图片上传  支持格式：jpg、gif、txt、png和pdf格式文件</h3>' +
			'<br/>' +
			'<input type="file"  multiple accept=".jpg,.jpeg,.doc,.docx,.xls,.xlsx,.pdf" id="ssi-upload" name="ipt1" />' +
			'<button id="Button1">点击上传图片</button>' +
			'<br/>' +

			//												'<hr/>'+
			'<br/>' +
			'<h3>视频上传  支持格式：mp4格式文件</h3>' +
			'<br/>' +
			'<input type="file"  multiple id="ssi-upload2"accept=".mp4" name="ipt2" />' +

			'<button id="Button2">点击上传视频</button>' +
			'<br/>' +
			//												'<hr/>'+
			'<br/>' +
			'<h3>表格上传  支持格式：xls格式文件</h3>' +
			'<br/>' +
			'<input type="file"  multiple id="ssi-upload3"accept=".xls" name="ipt3" />' +

			'<button id="Button3">点击上传表格</button>' +
			'<br/>' +
			//												'<hr/>'+
			'<br/>' +
			'<h3>模型上传  支持格式：gltf格式文件</h3>' +
			'<br/>' +
			'<input type="file"  multiple id="ssi-upload4" accept=".gltf" name="ipt4" />' +

			'<button id="Button4">点击上传模型</button>' +
			'<br/>' +
			//												'<hr/>'+
			'<br/>' +
			'<h3>导线表格上传  支持格式：xls格式文件</h3>' +
			'<br/>' +
			'<input type="file"  multiple id="ssi-upload5" accept=".xls" name="ipt5" />' +

			'<button id="Button5">点击上传表格</button>' +
			'<br/>' +
			//												'<hr/>'+
			'<br/>' +
			'<h3>绝缘子表格上传  支持格式：xls格式文件</h3>' +
			'<br/>' +
			'<input type="file"  multiple id="ssi-upload6" accept=".xls" name="ipt6" />' +

			'<button id="Button6">点击上传表格</button>' +
			'<br/>' +
			//												'<hr/>'+
			'<br/>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'
	});
});

//上传图片
$(document.body).on("click", "#Button1", function(event) {

	console.log('vvvvvvvvvv')
	//					console.log(document.getElementById("ssi-upload").files)
	var List = document.getElementById("ssi-upload").files;
	// 阻止表单的默认提交事件
	event.preventDefault();
	//	发送数据到后端

	// 	data.append("fileName","后富线_3");
	if(List[0] == undefined) {

		layer.msg("上传失败，缺少图片文件");
	}
	for(var i = 0; i < List.length; i++) {

		var data = new FormData;
		//	console.log('qqqqq')
		//	console.log(document.getElementById("ssi-upload").files[0])

		data.append("lineId", lineId);
		data.append("poleId", poleId);
		//          		var filess = files[i];
		console.log('qqqqq')
		console.log(List[i]);
		data.append("upfile", List[i]);
		//	console.log("这是第"+i+"个文件")
		//	console.log("在传第几个"+document.getElementById("ssi-upload").file)
		$.ajax({
			//  parent.location.reload()
			type: "post",
			url: url + "polePhoto",
			dataType: 'json',
			data: data,
			//				        {
			//						poleId:'A2EF6173844B4620825CCA786A1DBF6C21030100001',
			//						lineId:1053,
			//						upfile:$("#ssi-upload").val()
			//						},
			processData: false,
			contentType: false,
			cache: false,
			//

			success: function(data, status) {
				console.log(data)
				console.log(status)
				console.log(data.message)
				//				        	console.error(err)
				//				        	console.log($("#ssi-upload").val())

				if(data.message == "上传成功") {
					setTimeout(function() {
						//add your code
						layer.msg("图片上传成功");
					}, 3000); //延迟500毫米
				}
				//				        	location.reload()
				//				        	clearInterval()
			}
		}); //ajax结束
	}; //循环结束
}); //点击事件结束

//点击上传视频
$(document.body).on("click", "#Button2", function(event) {
	//					console.log('uuuuuuuuuuu')
	//					console.log(document.getElementById("ssi-upload2").files[0])
	var videoList = document.getElementById("ssi-upload2").files[0];
	var VideoName = videoList.name;
	VName = VideoName.replace('.mp4', '');
	// 阻止表单的默认提交事件
	event.preventDefault();
	alert('视频开始上传,请耐心等待!');
	//	发送数据到后端
	//				    if(videoList[0] == undefined){
	//			        		
	//			        		 layer.msg("上传失败，缺少视频文件");
	//				    }
	//					for (var i = 0; i <videoList.length; i++) {
	var data = new FormData;
	//					console.log('qqqqq')
	//					console.log(document.getElementById("ssi-upload").files[0])

	data.append("lineId", lineId);
	data.append("poleId", poleId);
	data.append("fileName", VName);
	// 					for (var i = 0; i < files.Length; i++) {
	//          		var filess = files[i];
	data.append("upvideo", videoList);
	//		            console.log("这是第"+i+"个文件")
	//					console.log("在传第几个"+document.getElementById("ssi-upload").file)
	$.ajax({
		//   	parent.location.reload()
		type: "post",
		url: url + "poleVideo",
		dataType: 'json',
		data: data,
		//				        {
		//						poleId:'A2EF6173844B4620825CCA786A1DBF6C21030100001',
		//						lineId:1053,
		//						upfile:$("#ssi-upload").val()
		//						},
		processData: false,
		contentType: false,
		cache: false,
		//

		success: function(data, status) {
			console.log(data)
			console.log(status)
			console.log(data.message)

			if(data.message == "上传成功") {

				layer.open({
					type: 1,
					area: ['320px', '160px'],
					shadeClose: true, //点击遮罩关闭
					content: '<div style="padding:10px;color:black;text-align: center;top: 5px;">' +
						'视频上传成功！' +
						'</div>'
				});
			}
			//				        	location.reload()
			//				        	clearInterval()
		}
	}); //ajax结束
	//				   };//循环结束
}); //点击事件结束

//点击上传表格
$(document.body).on("click", "#Button3", function(event) {
	//					console.log('tttttttttttttttttable')
	//					console.log(document.getElementById("ssi-upload3").files[0]);
	// 阻止表单的默认提交事件
	event.preventDefault();
	//	发送数据到后端
	var data = new FormData;
	//					console.log('qqqqq')
	//					console.log(document.getElementById("ssi-upload").files[0])

	//					data.append("lineId",lineId);
	// 					data.append("poleId",poleId);
	// 					data.append("fileName","666");

	// 					for (var i = 0; i < files.Length; i++) {
	//          		var filess = files[i];
	data.append("poleExcel", document.getElementById("ssi-upload3").files[0]);
	//		            console.log("这是第"+i+"个文件")
	//					console.log("在传第几个"+document.getElementById("ssi-upload").file)
	$.ajax({
		//   	parent.location.reload()
		type: "post",
		url: url + "poleExcel",
		dataType: 'json',
		data: data,
		//				        {
		//						poleId:'A2EF6173844B4620825CCA786A1DBF6C21030100001',
		//						lineId:1053,
		//						upfile:$("#ssi-upload").val()
		//						},
		processData: false,
		contentType: false,
		cache: false,
		success: function(data, status) {
			console.log(data)
			console.log(status)
			console.log(data.message)
			console.log($("#ssi-upload3").val())

			if(data.message == "上传成功") {

				layer.msg("表格上传成功");
			}
			//				        	location.reload()
			//				        	clearInterval()
		}
	}); //ajax结束
	//				   };//循环结束
}); //点击事件结束

$(document.body).on("click", "#Button4", function(event) {
	//					console.log('modelFile')
	//					console.log(document.getElementById("ssi-upload4").files[0])
	var FilesMode = document.getElementById("ssi-upload4").files[0]
	var ModeName = FilesMode.name;
	ModeName = ModeName.replace('.gltf', '');
	// 阻止表单的默认提交事件
	event.preventDefault();
	//	发送数据到后端
	var data = new FormData;
	//					console.log('qqqqq')
	//					console.log(document.getElementById("ssi-upload").files[0])

	//					data.append("lineId",lineId);
	// 					data.append("poleId",poleId);
	data.append("modelName", ModeName);
	// 					for (var i = 0; i < files.Length; i++) {
	//          		var filess = files[i];
	data.append("upmodel", document.getElementById("ssi-upload4").files[0]);
	//		            console.log("这是第"+i+"个文件")
	//					console.log("在传第几个"+document.getElementById("ssi-upload").file)
	$.ajax({
		//   	parent.location.reload()
		type: "post",
		url: url + "modelFile",
		dataType: 'json',
		data: data,
		//				        {
		//						poleId:'A2EF6173844B4620825CCA786A1DBF6C21030100001',
		//						lineId:1053,
		//						upfile:$("#ssi-upload").val()
		//						},
		processData: false,
		contentType: false,
		cache: false,
		success: function(data, status) {
			console.log(data)
			console.log(status)
			console.log(data.message)
			console.log($("#ssi-upload4").val())
			if(data.message == "上传成功") {
				layer.msg("模型上传成功");
			}
			//				        	location.reload()
			//				        	clearInterval()
		}
	}); //ajax结束
	//				   };//循环结束
}); //点击事件结束

//点击上传导线表格
$(document.body).on("click", "#Button5", function(event) {
	//					console.log('tttttttttttttttttable')
	//					console.log(document.getElementById("ssi-upload3").files[0]);
	// 阻止表单的默认提交事件
	event.preventDefault();
	//	发送数据到后端
	var data = new FormData;
	//					console.log('qqqqq')
	//					console.log(document.getElementById("ssi-upload").files[0])

	//					data.append("lineId",lineId);
	// 					data.append("poleId",poleId);
	// 					data.append("fileName","666");

	// 					for (var i = 0; i < files.Length; i++) {
	//          		var filess = files[i];
	data.append("wireExcel", document.getElementById("ssi-upload5").files[0]);
	//		            console.log("这是第"+i+"个文件")
	//					console.log("在传第几个"+document.getElementById("ssi-upload").file)
	$.ajax({
		//   	parent.location.reload()
		type: "post",
		url: url + "wiresExcel",
		dataType: 'json',
		data: data,
		//				        {
		//						poleId:'A2EF6173844B4620825CCA786A1DBF6C21030100001',
		//						lineId:1053,
		//						upfile:$("#ssi-upload").val()
		//						},
		processData: false,
		contentType: false,
		cache: false,
		success: function(data, status) {
			console.log(data)
			console.log(status)
			console.log(data.message)
			console.log($("#ssi-upload5").val())

			if(data.message == "上传成功") {

				layer.msg("表格上传成功");
			}
			//				        	location.reload()
			//				        	clearInterval()
		}
	}); //ajax结束
	//				   };//循环结束
}); //点击事件结束

//点击绝缘子表格
$(document.body).on("click", "#Button6", function(event) {
	//					console.log('tttttttttttttttttable')
	//					console.log(document.getElementById("ssi-upload3").files[0]);
	// 阻止表单的默认提交事件
	event.preventDefault();
	//	发送数据到后端
	var data = new FormData;
	//					console.log('qqqqq')
	//					console.log(document.getElementById("ssi-upload").files[0])

	//					data.append("lineId",lineId);
	// 					data.append("poleId",poleId);
	// 					data.append("fileName","666");

	// 					for (var i = 0; i < files.Length; i++) {
	//          		var filess = files[i];
	data.append("insuExcel", document.getElementById("ssi-upload6").files[0]);
	//		            console.log("这是第"+i+"个文件")
	//					console.log("在传第几个"+document.getElementById("ssi-upload").file)
	$.ajax({
		//   	parent.location.reload()
		type: "post",
		url: url + "insulatorExcel",
		dataType: 'json',
		data: data,
		//				        {
		//						poleId:'A2EF6173844B4620825CCA786A1DBF6C21030100001',
		//						lineId:1053,
		//						upfile:$("#ssi-upload").val()
		//						},
		processData: false,
		contentType: false,
		cache: false,
		success: function(data, status) {
			console.log(data)
			console.log(status)
			console.log(data.message)
			console.log($("#ssi-upload6").val())

			if(data.message == "上传成功") {

				layer.msg("表格上传成功");
			}
			//				        	location.reload()
			//				        	clearInterval()
		}
	}); //ajax结束
	//				   };//循环结束
}); //点击事件结束


//弹出显示详细信息的页面层
$(document.body).on('click', '.bianhao', function() {
	//									var js = JSON.parse(data.data);
	var bh = $(".bianhao").index($(this));
	var phy = $(this).attr("id");
	var parent1 = window.parent.document.getElementById('' + phy + '').parentNode;
	var aLineName = parent1.children[1].textContent;
	//									var aLineName = $(this).html();
	console.log("aLineName:" + aLineName);
	//									console.log(js[bh].PhyID);
	$.ajax({
		//   	parent.location.reload()
		type: "post",
		url: url + 'poleInfomation',
		dataType: 'json',
		data: {
			"phy_id": phy,
			"line_name": aLineName
		},
		success: function(data, status) {
			console.log(data)
			console.log(status)

			console.log(js)
			var bh = $(".bianhao").index($(this));

			var jsbh = JSON.parse(data.data);
			var js = JSON.parse(data.data);
			console.log("js:" + JSON.parse(data.data));
			console.log(js[0])
			var T = jsbh[0]
			layer.open({
				type: 1,
				area: ['720px', '720px'],
				shadeClose: true, //点击遮罩关闭
				content: '<div id="gt">' +
					'<div class="container">' +
					'<div class="poleShow">' +
					'<button type="submit" id="EditTZ">修改台账信息</button>' +
					'<label for="">杆塔序号：</label><input type="text" id="TZ1" placeholder="可修改" value=' + T.tower_sequence + ' />' +
					'<label for="">杆塔高：</label><input type="text" id="TZ2" placeholder="可修改" value=' + T.nominal_height + ' />' +
					'<label for="">呼称高(m)：</label><input type="text"  id="TZ3" placeholder="可修改" value=' + T.nominal_height + ' />' +
					'<label for="">杆塔高(m)：</label><input type="text"  id="TZ4" placeholder="可修改" value=' + T.tower_height + ' />' +
					'<label for="">标高(m)：</label><input type="text"  id="TZ5" placeholder="可修改" value=' + T.elevation + ' />' +
					'<label for="">重量(t)：</label><input type="text"  id="TZ6" placeholder="可修改" value=' + T.weight + ' />' +
					'<label for="">杆塔类型：</label><input type="text"  id="TZ7" placeholder="可修改" value=' + T.PoleType + ' />' +
					'<label for="">所属线路：</label><input type="text"  id="TZ8" placeholder="可修改" value=' + T.line_name + ' />' +
					'<label for="">所属市局：</label><input type="text"  id="TZ9" placeholder="可修改" value=' + T.company + ' />' +
					'<label for="">维护班组：</label><input type="text"  id="TZ10" placeholder="可修改" value=' + T.maintenance_team + ' />' +
					'<label for="">三十年一遇覆冰：</label><input type="text"  id="TZ11" placeholder="可修改" value=' + T.ice_of_thirty_years + ' />' +
					'<label for="">三十年一遇风速：</label><input type="text"  id="TZ12" placeholder="可修改" value=' + T.wind_of_thirty_years + ' />' +
					'<label for="">五十年一遇覆冰：</label><input type="text"  id="TZ13" placeholder="可修改" value=' + T.ice_of_fifty_years + ' />' +
					'<label for="">五十年一遇风速：</label><input type="text"  id="TZ14" placeholder="可修改" value=' + T.wind_of_fifty_years + ' />' +
					'<label for="">运行状态：</label><input type="text"  id="TZ15" placeholder="可修改" value=' + T.running_status + ' />' +
					'<label for="">杆塔形式：</label><input type="text"  id="TZ16" placeholder="可修改" value=' + T.tower_shape + ' />' +
					'<label for="">杆塔材质：</label><input type="text"  id="TZ17" placeholder="可修改" value=' + T.tower_material + ' />' +
					'<label for="">塔处污级：</label><input type="text"  id="TZ18" placeholder="可修改" value=' + T.area_pollution + ' />' +
					'<label for="">污源状况：</label><input type="text"  id="TZ19" placeholder="可修改" value=' + T.pollution_cause + ' />' +
					'<label for="">塔处地形：</label><input type="text"  id="TZ20" placeholder="可修改" value=' + T.tower_terrain + ' />' +
					'<label for="">设备编号：</label><input type="text"  id="TZ21" placeholder="可修改" value=' + T.equipment_num + ' />' +
					'<label for="">ERP资产所属：</label><input type="text"  id="TZ22" placeholder="可修改" value=' + T.erp_company + ' />' +
					'<label for="">资产性质：</label><input type="text"  id="TZ23" placeholder="可修改" value=' + T.asset_property + ' />' +
					'<label for="">垂直档距(m)：</label><input type="text"  id="TZ24" placeholder="可修改" value=' + T.vertical_distance + ' />' +
					'<label for="">小号档距(m)：</label><input type="text"  id="TZ25" placeholder="可修改" value=' + T.small_distance + ' />' +
					'<label for="">大号档距(m)：</label><input type="text"  id="TZ26" placeholder="可修改" value=' + T.big_distance + ' />' +
					'<label for="">水平档距(m)：</label><input type="text"  id="TZ27" placeholder="可修改" value=' + T.horizontal_distance + ' />' +
					'<label for="">转角方向：</label><input type="text"  id="TZ28" placeholder="可修改" value=' + T.corner_direction + ' />' +
					'<label for="">转角度数：</label><input type="text"  id="TZ29" placeholder="可修改" value=' + T.corner_degree + ' />' +
					'<label for="">导线位置：</label><input type="text"  id="TZ30" placeholder="可修改" value=' + T.wire_position + ' />' +
					'<label for="">相位：</label><input type="text"  id="TZ31" placeholder="可修改" value=' + T.phase + ' />' +
					'<label for="">固定方式：</label><input type="text"  id="TZ32" placeholder="可修改" value=' + T.fixed_form + ' />' +
					'<label for="">是否终端：</label><input type="text"  id="TZ33" placeholder="可修改" value=' + T.end_point + ' />' +
					'<label for="">是否同杆架设：</label><input type="text"  id="TZ34" placeholder="可修改" value=' + T.set_up + ' />' +
					'<label for="">同杆线路位置：</label><input type="text"  id="TZ35" placeholder="可修改" value=' + T.line_position + ' />' +
					'<label for="">杆塔腿长(mm)：</label><input type="text"  id="TZ36" placeholder="可修改" value=' + T.leg_length + ' />' +
					'<label for="">基础埋深(mm)：</label><input type="text"  id="TZ37" placeholder="可修改" value=' + T.cover_depth + ' />' +
					'<label for="">埋地宽度(mm)：</label><input type="text"  id="TZ38" placeholder="可修改" value=' + T.cover_width + ' />' +
					'<label for="">中心桩位移(mm)：</label><input type="text"  id="TZ39" placeholder="可修改" value=' + T.displacement + ' />' +
					'<label for="">根开(mm)：</label><input type="text"  id="TZ40" placeholder="可修改" value=' + T.foot_distance + ' />' +
					'<label for="">是否换相：</label><input type="text"  id="TZ41" placeholder="可修改" value=' + T.change_phase + ' />' +
					'<label for="">经度：</label><input type="text"  id="TZ42" placeholder="可修改" value=' + T.longitude + ' />' +
					'<label for="">维度：</label><input type="text"  id="TZ43" placeholder="可修改" value=' + T.latitude + ' />' +
					'<label for="">高程信息：</label><input type="text"  id="TZ44" placeholder="可修改" value=' + T.elevation_info + ' />' +
					'<label for="">54坐标X：</label><input type="text"  id="TZ45" placeholder="可修改" value=' + T.x + ' />' +
					'<label for="">54坐标Y：</label><input type="text"  id="TZ46" placeholder="可修改" value=' + T.y + ' />' +
					'<label for="">地理位置：</label><input type="text"  id="TZ47" placeholder="可修改" value=' + T.geographic_position + ' />' +
					'<label for="">基础形式：</label><input type="text"  id="TZ48" placeholder="可修改" value=' + T.foundation_form + ' />' +
					'<label for="">混凝土强度：</label><input type="text"  id="TZ49" placeholder="可修改" value=' + T.concrete_strength + ' />' +
					'<label for="">基础型号：</label><input type="text"  id="TZ50" placeholder="可修改" value=' + T.foundation_model + ' />' +
					'<label for="">全称：</label><input type="text"  id="TZ51" placeholder="可修改" value=' + T.ipsg + ' />' +
					'<label for="">ISPG码：</label><input type="text"  id="TZ52" placeholder="可修改" value=' + T.cjsj + ' />' +
					'<label for="">生产日期：</label><input type="text"  id="TZ53" placeholder="可修改" value=' + T.production_data + ' />' +
					'<label for="">投运日期：</label><input type="text"  id="TZ54" placeholder="可修改" value=' + T.running_date + ' />' +
					'<label for="">回路数：</label><input type="text"  id="TZ55" placeholder="可修改" value=' + T.loop_num + ' />' +
					'<label for="">杆塔型号：</label><input type="text"  id="TZ56" placeholder="可修改" value=' + T.tower_model + ' />' +
					'<label for="">生产厂家：</label><input type="text"  id="TZ57" placeholder="可修改" value=' + T.production_company + ' />' +
					'<label for="">ID：</label><input type="text"  id="TZ58" placeholder="可修改" value=' + T.global_id + '>' +
					'<label for="">OLD_OBJ_ID：</label><input type="text"  id="TZ59" placeholder="可修改" value=' + T.old_obj_id + ' />' +
					'<label for="">CJSJ：</label><input type="text"  id="TZ60" placeholder="可修改" value=' + T.cjsj + ' />' +
					'<label for="">物理杆塔id：</label><input type="text"  id="TZ61" placeholder="可修改" value=' + T.PhyID + ' />' +
					'<label for="">运行维护公司：</label><input type="text"  id="TZ63" placeholder="可修改" value=' + T.running_unit + ' />' +
					'<label for="">杆塔id：</label><input type="text"  id="TZ64" placeholder="可修改" value=' + T.tower_id + ' />' +
					'<label for="">备注：</label><input type="text"  id="TZ62" placeholder="可修改" value=' + T.remark + ' />' +

					'</div>' +

					'</div>' +
					'</div>'
			});
			if(data.message == "获取成功") {
				console.log("6666666")
				console.log($("#TZ1").val())

			}
		}
	});

});

$(document.body).on('click', "#EditTZ", function(event) {
	// 阻止表单的默认提交事件
	event.preventDefault();
	var result = confirm('您确定要修改数据么？');

	//						console.log("zheshisha:" + $("#TZ58").val());
	//	发送数据到后端
	if(result) {
		$.ajax({
			//   	parent.location.reload()
			type: "put",
			url: url + 'poleInfomation',
			dataType: 'json',
			data: {
				"tower_sequence": $("#TZ1").val(),
				"nominal_height": $("#TZ2").val(),
				"nominal_height": $("#TZ3").val(),
				"tower_height": $("#TZ4").val(),
				"elevation": $("#TZ5").val(),
				"weight": $("#TZ6").val(),
				"tower_type": $("#TZ7").val(),
				"line_name": $("#TZ8").val(),
				"company": $("#TZ9").val(),
				"maintenance_team": $("#TZ10").val(),
				"ice_of_thirty_years": $("#TZ11").val(),
				"wind_of_thirty_years": $("#TZ12").val(),
				"ice_of_fifty_years": $("#TZ13").val(),
				"wind_of_fifty_years": $("#TZ14").val(),
				"running_status": $("#TZ15").val(),
				"tower_shape": $("#TZ16").val(),
				"tower_material": $("#TZ17").val(),
				"area_pollution": $("#TZ18").val(),
				"pollution_cause": $("#TZ19").val(),
				"tower_terrain": $("#TZ20").val(),
				"equipment_num": $("#TZ21").val(),
				"erp_company": $("#TZ22").val(),
				"asset_property": $("#TZ23").val(),
				"vertical_distance": $("#TZ24").val(),
				"small_distance": $("#TZ25").val(),
				"big_distance": $("#TZ26").val(),
				"horizontal_distance": $("#TZ27").val(),
				"corner_direction+": $("#TZ28").val(),
				"corner_degree": $("#TZ29").val(),
				"wire_position": $("#TZ30").val(),
				"phase": $("#TZ31").val(),
				"fixed_form": $("#TZ32").val(),
				"end_point": $("#TZ33").val(),
				"set_up": $("#TZ34").val(),
				"line_position": $("#TZ35").val(),
				"leg_length": $("#TZ36").val(),
				"cover_depth": $("#TZ37").val(),
				"cover_width": $("#TZ38").val(),
				"displacement": $("#TZ39").val(),
				"foot_distance": $("#TZ40").val(),
				"change_phase": $("#TZ41").val(),
				"longitude": $("#TZ42").val(),
				"latitude": $("#TZ43").val(),
				"elevation_info": $("#TZ44").val(),
				"x": $("#TZ45").val(),
				"y": $("#TZ56").val(),
				"geographic_position": $("#TZ47").val(),
				"foundation_form": $("#TZ48").val(),
				"concrete_strength": $("#TZ49").val(),
				"foundation_model": $("#TZ50").val(),
				"ipsg": $("#TZ51").val(),
				"cjsj": $("#TZ52").val(),
				"production_data": $("#TZ53").val(),
				"running_date": $("#TZ54").val(),
				"loop_num": $("#TZ55").val(),
				"tower_model": $("#TZ56").val(),
				"production_company": $("#TZ57").val(),
				"global_id": $("#TZ58").val(),
				"old_obj_id": $("#TZ59").val(),
				"xgsj": $("#TZ60").val(),
				"phy_id": $("#TZ61").val(),
				"remark": $("#TZ62").val(),
				"running_unit": $("#TZ63").val(),
				"tower_id": $("#TZ64").val()

				//											      
			},
			success: function(data, status) {
				console.log(data)
				console.log(status)

				if(data.message == "修改数据成功") {

					layer.msg("台站信息修改完成");
					//      		setTimeout( function(){
					//					     //add your code
					//					    parent.location.reload()
					//					}, 1500);//延迟1500毫米
				}

			}
		});
	}
}); //台站信息更新 

//$(document.body).on('click',".Selch",function(){
//var Selchindex=$(".Selch").index($(this));
//console.log(Selchindex)
//console.log("888888888")
//console.log(js[Selchindex].lineId )
//console.log(js[Selchindex].PoleID)
//});

//				    				隐藏表格显示图片
$(document.body).on('click', '.Selch', function functionqqq() {
	var PoleID = $(this).attr("id");
	console.log(PoleID)
	$(".dellibtn").remove();
	$(".btn").remove();
	$(".delimg").remove();
	$("#imgShow").show(1000);
	$("#allHide").hide(1000);
	$("#btn").show(1000);
	var Selchindex = $(".Selch").index($(this));
	console.log("进入图片获取")
	$.ajax({
		//url: 'http://192.168.1.41:1337/peopleLineList',
		url: url + 'polePhoto' + '/' + PoleID,
		//data: "127605d5-ee91-4557-a7fe-fb096918b6bc",
		type: 'get',
		dataType: 'json',
		success: function(data) {
			console.log('获取杆塔附近图片成功');
			console.log(data);
			console.log(data.data);
			var js = JSON.parse(data.data);
			console.log(js.length);

			//					console.log(js):
			//					console.log(js[0].poleNearbyImgUrl)
			var trend6 = '';
			for(var i = 0; i < js.length; i++) {
				var poleImgId = js[i].id;
				var jsi = js[i].poleNearbyImgUrl;
				var jstime = js[i].createdAt.replace('.000Z', '');
				//									        	console.log("vvvvvvvvvvv");
				//												console.log(jsi);

				trend6 += '<li class="dellibtn" ><a class="btn" id="' + poleImgId + '" href="#" title="第' + (i + 1) * 1 + '张图">' + jstime + '<img class="delimg" src="' + 'http://117.27.139.39:4322' + jsi + '"></a></li>'
				//													trend6+='<li><a class="btn" href="#" title="第'+(i+1)*1 +'张图"><img src="'+'http://117.27.139.39:4322'+jsi+'"></a></li>'

			}

			$('#delbtn').append(trend6);
			//									        	$("#imgShow").append($("#delbtn"));
		}
	});
});

//													隐藏表格显示视频
$(document.body).on('click', '.SelchVideo', function() {
	var PoleID = $(this).attr("id").replace('_____', '');
	console.log(PoleID)
	$("#my-video").remove();
	$("#VideoShow").show(1000);
	$("#allHide").hide(1000);
	$("#btn").show(1000);
	var SelchVideoindex = $(".SelchVideo").index($(this));
	console.log("进入视频获取")
	$.ajax({
		//url: 'http://192.168.1.41:1337/peopleLineList',
		url: url + 'poleVideo' + '/' + PoleID,
		//data: "127605d5-ee91-4557-a7fe-fb096918b6bc",
		type: 'get',
		dataType: 'json',
		success: function(data) {
			console.log('获取视频成功');
			console.log(data)
			console.log(data.data)
			var js = JSON.parse(data.data);
			console.log(js.length);

			//					console.log(js):
			//					console.log(js[0].poleNearbyImgUrl)
			var trend6 = '';
			for(var i = 0; i < js.length; i++) {
				var poleVideoId = js[i].id;
				var jsurl = js[i].videoUrl;
				var jstime = js[i].createdAt.replace('.000Z', '');;
				//									        	console.log("vvvvvvvvvvv");
				//												console.log(jsi);
				trend6 += '<video id="my-video" class="video-js" controls preload="auto" width="640" height="264"'
				trend6 += '<source src="' + 'http://117.27.139.39:4322' + jsurl + '" type="video/mp4">'
				trend6 += '</video>'
				trend6 += '<button class="videoDel" id="' + poleVideoId + '">删除</button>'
			}
			$('#VideoShow').append(trend6);
			$("#VideoShow").show(1000);
		}
	});
}); //视频点击结束

//			 隐藏图片显示表格
$(document.body).on('click', '#btn', function() {

	$("#my-video").remove();
	$(".dellibtn").remove();
	$(".videoDel").remove();

	$("#allHide").show(1000);
	$("#btn").hide(1000);
	//				   			 $('#imgShow').html("");
});

//-----------------删除路线----------------

$(document.body).on('click', ".Delete", function() {
	var result = confirm('你确定要删除整条路线么？删除后数据将无法恢复！')

	if(result) {
		console.log(this.id.replace('lineid_', ''));
		var TrueID = this.id.replace('lineid_', '')
		console.log(TrueID);
		$.ajax({
			type: "delete",
			url: url + 'poleLine',
			dataType: 'json',
			data: {
				"lineId": TrueID

			},
			success: function(data, status) {
				console.log(data);
				console.log(status);
				console.log($(this));
				if(data.message == "删除成功") {
					layer.msg("路线删除成功");
					setTimeout(function() {
						//add your code
						//parent.location.reload()
					}, 1500); //延迟1500毫米

				}

			}
		})
	}
})
//				 

//-----------------删除图片----------------

$(document.body).on('click', ".btn", function() {
	var result = confirm('是否删除图片？删除后数据将无法恢复！')

	console.log(this.id);
	if(result) {

		$.ajax({
			type: "delete",
			url: url + 'polePhoto',
			dataType: 'json',
			data: {
				"poleImgId": this.id
			},
			success: function(data, status) {
				console.log(data);
				console.log(status);
				console.log($(this));
				if(data.message == "删除成功") {
					layer.msg("图片删除成功");
					setTimeout(function() {
						layer.load(0, { shade: false });
					}, 1500); //延迟1500毫米
					setTimeout(function() {
						parent.location.reload();
					}, 3000); //延迟1500毫米
				}
			}
		})
	}
})

//-----------------删除视频----------------

$(document.body).on('click', ".videoDel", function() {
	var result = confirm('是否删除视频？删除后数据将无法恢复！')

	console.log(this.id);
	if(result) {
		$.ajax({
			type: "delete",
			url: url + 'poleVideo',
			dataType: 'json',
			data: {
				"poleVideoId": this.id
			},
			success: function(data, status) {
				console.log(data);
				console.log(status);
				console.log($(this));
				if(data.message == "删除成功") {
					layer.msg("视频删除成功");
					setTimeout(function() {
						layer.load(0, { shade: false });
					}, 1500); //延迟1500毫米
					setTimeout(function() {
						parent.location.reload();
					}, 3000); //延迟1500毫米

				}

			}
		})
	}
})

//路线表格化
function form_luxian() {
	var luxians = $('#LuXian').dataTable({
		"aaSorting": [], //默认第几个排序
		"bStateSave": false, //状态保存
		"bFilter": true,
		"aoColumnDefs": [
			//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
			{
				"orderable": false,
				"aTargets": [0, 1, 2]
			} // 制定列不参与排序
		]
	});

}
//杆塔信息表格化
function form_ganta() {
	var gantas = $('#GanTa').dataTable({
		"aaSorting": [], //默认第几个排序
		"bStateSave": false, //状态保存
		"bFilter": true,
		"aoColumnDefs": [
			//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
			{
				"orderable": false,
				"aTargets": [0, 1, 2]
			} // 制定列不参与排序
		]
	});

}