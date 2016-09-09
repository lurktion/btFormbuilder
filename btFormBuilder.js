(function($) {
  $.fn.btFormBuilder = function(methods){
		var myvalid={};
		var sizecol = $(this).attr('sizecol');
		if(sizecol == "lg"){
			sizecol = 'input-lg';
		}else if(sizecol == 'sm'){
			sizecol = 'input-sm';
		}else{
			sizecol = '';
		}

		var labcol = parseInt($(this).attr('labcol'));
		if(labcol >= 1 && labcol <= 12){
			var labcolNum = labcol;
		}else{
			var labcolNum = 2;
		}
		
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
		
		if($(this).attr('rank') === "true"){
			var rank="control-label";
		}else{
			var rank="col-sm-"+labcolNum+" control-label";
		}

		var a = methods.columns
		for(var i = 0;i < a.length; i++) {
			
			
			var choseid = 'div_'+a[i].name;
			if(typeof(a[i].id) == "string"){
					var dom_id = a[i].id;
			}else{
					var dom_id = a[i].name;
			}
			
			var dom_name = a[i].name;
			var labeltext = a[i].label;
			var placeholder = a[i].placeholder;
			var type=a[i].type;
			if(typeof(a[i].value) == "string"){
				var dom_value = a[i].value;
			}else{
				var dom_value = '';
			}
			
			$(this).append("<div class='form-group' id='"+choseid+"'>");
			
			if (typeof(labeltext) === "string"){
					$('#'+choseid).append("<label class='"+rank+"' for="+dom_id+">"+labeltext+"</label>");
				}else{
					$('#'+choseid).append("<label class='"+rank+"' for="+dom_id+"></label>");
			}
			
			if($(this).attr('rank') === "false"){
				var rankinput = 'input_'+choseid;
				$('#'+choseid).append("<div class='col-sm-"+feildNum+"' id='"+rankinput+"'>");
			}else{
				var rankinput = choseid;
			}

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
			if(type == "input"){
				$('#'+rankinput).append("<input type='text' value='"+dom_value+"' id='"+dom_id+"' class='form-control "+sizecol+"' name='"+dom_name+"' placeholder='"+placeholder+"' />");
				var myempty={};
				validatorsjson=$.extend(myempty,notEmpty,stringLength,regexp,identical,different,emailAddress,threshold,remote);
				validators={validators:validatorsjson};
				
				if(jQuery.isEmptyObject(validatorsjson)){
					validators=validatorsjson;
				}else{
					
					validators=JSON.stringify(validators);
					feild='{"'+dom_name+'":'+validators+'}';
					feildjson=JSON.parse(feild);
					myvalid=$.extend(myvalid,feildjson);
				}
				
				
			}else if(type == "password"){
				$('#'+rankinput).append("<input type='password' value='"+dom_value+"' id='"+dom_id+"' class='form-control "+sizecol+"' name='"+dom_name+"'/>");
				var myempty={};
				if(a[i].repwd==true){
					notEmpty={notEmpty:{message: '用户名不能为空'}};
				}
				
				validatorsjson=$.extend(myempty,notEmpty,stringLength,regexp,identical,different,emailAddress,threshold,remote);
				validators={validators:validatorsjson};
				
				if(jQuery.isEmptyObject(validatorsjson)){
					validators=validatorsjson;
				}else{
					
					validators=JSON.stringify(validators);
					feild='{"'+dom_name+'":'+validators+'}';
					feildjson=JSON.parse(feild);
					myvalid=$.extend(myvalid,feildjson);
				}
				if(a[i].repwd==true){
					var choseid = 'repwd_'+a[i].name;
					var repwd_dom_id='repwd_'+dom_id;
					var repwd_dom_name='repwd_'+dom_name;
					
					$(this).append("<div class='form-group' id='"+choseid+"'>");
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
					
					validators={validators:{notEmpty:{message: '密码不能为空'},identical:{field:dom_name,message:'两次密码不一致'}}};
					validators=JSON.stringify(validators);
					feild='{"'+repwd_dom_name+'":'+validators+'}';
					feildjson=JSON.parse(feild);
					myvalid=$.extend(myvalid,feildjson);
					//alert(JSON.stringify(myvalid));
					
				}
			}else if(type == "checkbox"){
				var checkboxid = "chb"+rankinput;
				if(a[i].inline == "true"){
					inline = "checkbox-inline";
				}else{
					inline = "checkbox";
				}
				$('#'+rankinput).append("<div id='"+checkboxid+"' class='checkbox' ></div>");
				for(var n in a[i].option) {
					if(a[i].checked[n] == a[i].option[n]){
						var checked = 'checked';
					}else{
						var checked = '';
					}
					$('#'+checkboxid).append("<label class='"+inline+"'><input type='checkbox' value='"+n+"' name='"+dom_name+"' "+checked+" />"+a[i].option[n]+"</label>");
				}
				
			}else if(type == "radio"){
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
			}else if(type == "select"){
				if(a[i].multiple=="true"){
					var multiple="multiple";
				}else{
					var multiple="";
				}

				$('#'+rankinput).append("<select id='"+dom_id+"' "+multiple+" class='form-control "+sizecol+"' name='"+dom_name+"'></select>");
				for(var m in a[i].option) {
					if(a[i].checked == m){
						
						var checked = 'selected';
					}else{
						
						var checked = '';
					}
					$('#'+dom_name).append("<option value="+m+" "+checked+">"+a[i].option[m]+"</option>");
				}

			}else if(type == "submit"){
				$('#'+rankinput).append("<button type='submit' class='form-control btn btn-primary' id='"+dom_id+"' >"+a[i].show+"</button>");
			}else if(type == "button"){
				$('#'+rankinput).append("<button type='button' class='form-control btn btn-primary' id='"+dom_id+"' name='"+dom_name+"'>"+a[i].name+"</button>");
			}else if(type == "textarea"){
				$('#'+rankinput).append("<textarea class='form-control' id='"+dom_id+"' name='"+dom_name+"' rows='3'></textarea>");
			}else if(type == "verify"){
				var verifyDiv = 'verifyDiv_'+dom_id;
				$('#'+rankinput).append("<div class='input-group' ><div class='input-group-addon' style='padding:0;'><img width='100px' height='32px' src='"+a[i].imgsrc+"' /></div><input type='text' class='form-control' /></div>");
			}else if(type == "fileinput"){
				$('#'+rankinput).append("<input type='file' name='"+dom_name+"' id='"+dom_id+"' multiple class='file-loading' />");
				$("#"+dom_name).fileinput({'language':'zh','showUpload':false, 'previewFileType':'any'});
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
			});	
		}
	}
})(jQuery);
