	var code ; //在全局 定义验证码，验证码部分开始
			function createCode(){
				code = new Array();
				var codeLength = 4;//验证码的长度
				var checkCode = document.getElementById("checkCode");
				checkCode.value = "";
				var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');
				for(var i=0;i<codeLength;i++) {
					var charIndex = Math.floor(Math.random()*32);//math.floor();向下取整数。random(). 0-1之间随机数(不包含0和1)
					code +=selectChar[charIndex];
				}
				if(code.length != codeLength){
					createCode();
				}
				checkCode.value = code;
			}
			function validate(){
				var inputCode = document.getElementById("input1").value.toUpperCase();//字母转为大写
				if(inputCode.length!=4){
					return false;
				}else if(inputCode == code ){
						alert("成功！");
						return true;
				}else{
					alert("验证码输入错误！");
					createCode();
					return false;
				}
			}//验证码部分结束
(function($) {
  $.fn.btFormBuilder = function(methods){
	  //为了防止重复执行,把该对象下面的子元素都清空
		$(this).empty();
	  
		var myvalid={};
		var sizecol = $(this).attr('sizecol');
		if(sizecol == "lg"){
			sizecol = 'input-lg';
		}else if(sizecol == 'sm'){
			sizecol = 'input-sm';
		}else{
			sizecol = '';
		}
	  //设置label在12格的栅格系统中的位置默认为2
		var labcol = parseInt($(this).attr('labcol'));
		if(labcol >= 1 && labcol <= 12){
			var labcolNum = labcol;
		}else{
			var labcolNum = 2;
		}
	  //设置div在12格的栅格系统中的位置
		var feild = parseInt($(this).attr('feild'));
		if(feild >= 1 && feild <= 11){
			var allnum = feild + labcolNum;
			if(allnum >= 2 && allnum <= 12){
				var feildNum = feild;
			}else{
				var feildNum = 12 - labcolNum;
			}
		}else{
			var feildNum = 12 - labcolNum;
		}
	  //rank为真添加默认属性，为假根据labcol位置设置
		if($(this).attr('rank') === "true"){
			var rank="control-label";
		}else{
			var rank="col-sm-"+labcolNum+" control-label";
		}

		var a = methods.columns;
	  //打印columns中的数据
		for(var i = 0;i < a.length; i++) {
			//检测type是否是submit是submit添加id否则添加mame
			if(a[i].type=='submit'){
				var choseid = 'div_'+a[i].id;
			}else{
				var choseid = 'div_'+a[i].name;
			}
			
			if(typeof(a[i].id) == "string"){
					var dom_id = a[i].id;
			}else{
					var dom_id = a[i].name;
			}
			
			var disabled = a[i].disabled;
			var dom_name = a[i].name;
			var labeltext = a[i].label;
			var placeholder = a[i].placeholder;
			var type=a[i].type;
			//alert(a[i].values);
			//限制值为字符串或数字否则为空
			if(typeof(a[i].value) == "string" || typeof(a[i].value) == "number" ){
				var dom_value = a[i].value;
			}else{
				var dom_value = '';
			}
			//检测type不为隐藏执行
			if(type != "hidden"){
				$(this).append("<div class='form-group' id='"+choseid+"'>");
				if (typeof(labeltext) === "string"){
						$('#'+choseid).append("<label class='"+rank+"' for="+dom_id+">"+labeltext+"</label>");
				}else{
						$('#'+choseid).append("<label class='"+rank+"' for="+dom_id+"></label>");
				}
			}
			//rank为false设置包住input的div，为真则等于input的id或name
			if($(this).attr('rank') === "false"){
				var rankinput = 'input_'+choseid;
				$('#'+choseid).append("<div class='col-sm-"+feildNum+"' id='"+rankinput+"'>");
			}else{
				var rankinput = choseid;
			}
			//placeholder不等于“undefined”添加该属性，否则让他为空
			if(typeof(placeholder) != "undefined"){
				placeholder=placeholder;
			}else{
				placeholder='';
			}
			//==========validstart==============
			var notEmpty = undefined;
			var stringLength = undefined;
			var regexp = undefined;
			var identical = undefined;
			var different = undefined;
			var emailAddress = undefined;
			var threshold = undefined;
			var remote = undefined;
			
			if(typeof(a[i].notEmpty) == 'object'){
				 var notEmpty={notEmpty:a[i].notEmpty};
			}
			
			if(typeof(a[i].stringLength) == 'object'){
				var stringLength={stringLength:a[i].stringLength};
			}
			
			if(typeof(a[i].regexp) == 'object'){
				var regexp={regexp:a[i].regexp};
			}
			
			if(typeof(a[i].identical) == 'object'){
				var identical={identical:a[i].identical};
			}
			
			if(typeof(a[i].different) == 'object'){
				var different={different:a[i].different};
			}
			
			if(typeof(a[i].emailAddress) == 'object'){
				var emailAddress={emailAddress:a[i].emailAddress};
			}
			
			if(typeof(a[i].threshold) == 'number'){
				var threshold={threshold:a[i].threshold};
			}
			
			if(typeof(a[i].remote) == 'object'){
				var remote={remote:a[i].remote};
			}

			//===========validend=============
			//检测type是否是input
			if(type == "input"){
				if(disabled=="true"){
					var display="disabled";
				}else{
					var display="";
				}
				//if通过可以设置的文本框属性type，value，id，class，name，placeholder
				$('#'+rankinput).append("<input type='text' value='"+dom_value+"' id='"+dom_id+"' class='form-control "+sizecol+"' name='"+dom_name+"' placeholder='"+placeholder+"' "+display+"/>");


				var lall = [notEmpty,stringLength,regexp,identical,different,emailAddress,threshold,remote];
				var myvalid = $.fn.btvoildfunc(myvalid,dom_name,lall);
				
				
			}
			//判断密码
			else if(type == "password"){
				//if通过可以设置的文本框属性type，value，id，class，name
				$('#'+rankinput).append("<input type='password' value='"+dom_value+"' id='"+dom_id+"' class='form-control "+sizecol+"' name='"+dom_name+"'/>");
				//判断repwd为真通过notempty判断是否为空，message显示提示，stringLength判断字符串长度
				if(a[i].repwd==true){
					var validatorsjson=[{notEmpty:{message:'密码不能为空'}},{stringLength:{min:6,max:30,message: '密码长度必须在6到30之间'}}];
				}else{
					var validatorsjson = [notEmpty,stringLength,regexp,identical,different,emailAddress,threshold,remote];
				}
				//identical两次密码不一致对比
				var validatorsjson=[{notEmpty:{message: '密码不能为空'}},{identical:{field:dom_name,message:'两次密码不一致'}}];
				var myvalid = $.fn.btvoildfunc(myvalid,repwd_dom_name,validatorsjson);
				//判断repwd为真
				if(a[i].repwd==true){
					//定义重复输入密码的文本框名字（repwd_dom_name），编号（repwd_dom_id），用于包住文本框的div的编号（choseid）
					var choseid = 'repwd_'+a[i].name;
					var repwd_dom_id='repwd_'+dom_id;
					var repwd_dom_name='repwd_'+dom_name;
					//添加用于包住文本框的div
					$(this).append("<div class='form-group' id='"+choseid+"'>");
					//labeltext文本框功能介绍
					if (typeof(labeltext) === "string"){
							var labeltext = "再次输入密码";
							$('#'+choseid).append("<label class='"+rank+"' for="+repwd_dom_id+">"+labeltext+"</label>");
						}else{
							$('#'+choseid).append("<label class='"+rank+"' for="+repwd_dom_id+"></label>");
					}
					
					if($(this).attr('rank') === "false"){
						var rankinput = "div_"+choseid;
						
						$('#'+choseid).append("<div class='col-sm-"+feildNum+"' id='"+rankinput+"'>");
					}else{
						var rankinput = choseid;
					}
					
					$('#'+rankinput).append("<input type='password' value='"+dom_value+"' id='"+repwd_dom_id+"' class='form-control "+sizecol+"' name='"+repwd_dom_name+"'/>");
					var lall=[{notEmpty:{message: '密码不能为空'}},{identical:{field:dom_name,message:'两次密码不一致'}}];
					var myvalid = $.fn.btvoildfunc(myvalid,repwd_dom_name,lall);
				}
			} else if(type == "checkbox"){
				var checkboxid = "chb"+rankinput;
				//inline为真复选框横向排列，否则纵向
				if(a[i].inline == "true"){
					inline = "checkbox-inline";
				}else{
					inline = "checkbox";
				}
				//复选框外层div
				$('#'+rankinput).append("<div id='"+checkboxid+"' class='checkbox' ></div>");
				//循环出复选框
				for(var n in a[i].option) {
					//假如默认值的索引等于复选框的索引则使这个复选框默认
					if(a[i].checked[n] == a[i].option[n]){
						var checked = 'checked';
					}else{
						var checked = '';
					}
					$('#'+checkboxid).append("<label class='"+inline+"'><input type='checkbox' value='"+n+"' name='"+dom_name+"' "+checked+" />"+a[i].option[n]+"</label>");
				}
				
				var lall = [notEmpty,stringLength,regexp,identical,different,emailAddress,threshold,remote];
				var myvalid = $.fn.btvoildfunc(myvalid,dom_name,lall);
			}
			//单选框与复选框同理
			else if(type == "radio"){
				var radioid = "chb"+rankinput;
				if(a[i].inline == "true"){
					inline = "radio-inline";
				}else{
					inline = "radio";
				}
				$('#'+rankinput).append("<div id='"+radioid+"' class='radio' ></div>");
				for(var n in a[i].option) {
					if(a[i].checked == n){
						var checked = 'checked';
					}else{
						var checked = '';
					}
					$('#'+radioid).append("<label class='"+inline+"'><input type='radio' value='"+n+"' name='"+dom_name+"' "+checked+" />"+a[i].option[n]+"</label>");
				}
				
				var lall = [notEmpty,stringLength,regexp,identical,different,emailAddress,threshold,remote];
				var myvalid = $.fn.btvoildfunc(myvalid,dom_name,lall);
			}
			//下拉框
			else if(type == "select"){
				//multiple为真则赋给下拉框多选属性
				if(a[i].multiple=="true"){
					var multiple="multiple";
				}else{
					var multiple="";
				}

				$('#'+rankinput).append("<select id='"+dom_id+"' "+multiple+" class='form-control "+sizecol+"' name='"+dom_name+"'></select>");
				$('#'+dom_name).append("<option value=''>--请选择--</option>");
				//如果option为undefined执行，typeof判断是否为数组
				if(typeof(a[i].option)=="undefined"){
					if(typeof(a[i].parents)=="undefined"){
						$.fn.firstbtfber(a[i].optiongroup,dom_name);
					}else{
						var selectvalue = $("#"+a[i].parents).val();
						$('#'+a[i].parents).attr("onchange","$.fn.onchangebtfber('"+a[i].parents+"','"+dom_name+"')");
					}
				}else{
						for(var m in a[i].option) {
							if(a[i].checked == m){
								var checked = 'selected';
							}else{
								var checked = '';
							}
							$('#'+dom_name).append("<option value="+m+" "+checked+">"+a[i].option[m]+"</option>");
						}
				}
				
				var lall = [notEmpty,stringLength,regexp,identical,different,emailAddress,threshold,remote];
				var myvalid = $.fn.btvoildfunc(myvalid,dom_name,lall);
				
			}
			//submit按钮 show=按钮的value属性
			else if(type == "submit"){
				$('#'+rankinput).append("<button type='submit' class='form-control btn btn-primary' id='"+dom_id+"' >"+a[i].show+"</button>");
				
			}
			//button按钮
			else if(type == "button"){
				$('#'+rankinput).append("<button type='button' class='form-control btn btn-"+a[i].cls+"' id='"+dom_id+"' name='"+dom_name+"'>"+a[i].show+"</button>");
				
			}
			//文本域 内容为myvalue
			else if(type == "textarea"){
				//限制值为字符串或数字否则为空
				if(typeof(a[i].value)=="string"||typeof(a[i].value)=="number"){
					var myvalue = a[i].value;
				}else{
					var myvalue = '';
				}
				$('#'+rankinput).append("<textarea class='form-control' id='"+dom_id+"' name='"+dom_name+"' rows='3'>"+myvalue+"</textarea>");
				
				var lall = [notEmpty,stringLength,regexp,identical,different,emailAddress,threshold,remote];
				var myvalid = $.fn.btvoildfunc(myvalid,dom_name,lall);

			}
			//验证码
			else if(type == "verify"){
				var verifyDiv = 'verifyDiv_'+dom_id;
				$('#'+rankinput).append("<div class='input-group' ><div class='input-group-addon' style='padding:0;'><input type='button' id='checkCode' width='100px' height='32px' class='code' onclick='createCode()' /></div><input type='text'  id='input1' onblur='validate()' class='form-control' /></div>");
				$('.code').css({"background-image":"url("+a[i].imgsrc+")","font-family":"Arial,宋体","font-style":"italic","color":"green","border":"0","padding":"2px 3px","letter-spacing":"3px","font-weight":'bolder'})
			
			}
			//上传文件
			else if(type == "fileinput"){
				$('#'+rankinput).append("<input type='file' name='"+dom_name+"' id='"+dom_id+"' multiple class='file-loading' />");
				$("#"+dom_name).fileinput({'language':'zh','showUpload':false, 'previewFileType':'any'});
			}
			//水平线
			else if(type == "line"){
				$(this).append("<hr />");
			}
			//隐藏域
			else if(type == "hidden"){
				$(this).append("<input type='hidden' name='"+dom_name+"' id='"+dom_id+"' value='"+dom_value+"'/>");
			}
			//可选日期的文本框
			else if(type == "date"){
				$(this).append("<input type='date' name='"+dom_name+"' id='"+dom_id+"' value='"+dom_value+"'/>")
			}else{
				alert(type);
			}
		}
 		if(!jQuery.isEmptyObject(myvalid)){
			$(this).bootstrapValidator({
				message: 'This value is not valid',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: myvalid
			})
			.on('success.form.bv', function(e) {
				e.preventDefault();
				var suburl=$(this).attr('action');
				var subid=$(this).attr('id');
				if(typeof(suburl)=="string" && typeof(subid)=="string"){
					checkSubmit(suburl,subid);
				}else{
					alert("联系管理员");
				}
			});
		}
	}
	
	$.fn.firstbtfber = function(btfberdefoption,def_name){
			$("#"+def_name).empty();
			$('#'+def_name).append("<option value=''>--请选择--</option>");
			//如果option的值为字符串类型
			if(typeof(btfberdefoption)=="string"){
				var btfberdefoption = JSON.parse(btfberdefoption);
			}
			//如果option的值为undefined则根据option的长度重新打印option
			if(typeof(btfberdefoption)!="undefined"){
				var btfberdefoption_num = btfberdefoption.length;
				for (var q = 0;q < btfberdefoption_num; q++){
					var arr=JSON.stringify(btfberdefoption[q].child);
					
					$("#"+def_name).append("<option value="+btfberdefoption[q].name+" optionid="+btfberdefoption[q].name+" arr="+arr+">"+btfberdefoption[q].name+"</option>");
				};
			}
		}
		
	$.fn.onchangebtfber = function(parentsid,selfid){
			var  parentsobj= $("#"+parentsid).val();
			var jsonobj = $("option[optionid='"+parentsobj+"']").attr("arr");
			$.fn.firstbtfber(jsonobj,selfid);
		}
	
	$.fn.btvoildfunc = function(myvalidold,btvoildname,btvoildstring){
				var myvalid=myvalidold;
				var myempty={};
				for(x = 0 ;x < btvoildstring.length;x++){
					var validatorsjson=$.extend(myempty,btvoildstring[x]);
				}				
				var validators={validators:validatorsjson};
				
				if(jQuery.isEmptyObject(validatorsjson)){
					var validators=validatorsjson;
				}else{
					var validators=JSON.stringify(validators);
					var feild='{"'+btvoildname+'":'+validators+'}';
					var feildjson=JSON.parse(feild);
					var myvalid=$.extend(myvalid,feildjson);
				}
				//alert(JSON.stringify(myvalid));
				return myvalid;
	}

})(jQuery);
