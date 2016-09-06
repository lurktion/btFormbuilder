
(function($) {
	method = {
		name:undefined,
		type:undefined
	};

  $.fn.btFormBuilder = function(methods){
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
			var dom_id = a[i].name;
			var dom_name = a[i].name;
			var labeltext = a[i].label;
			var placeholder = a[i].placeholder;

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
			
			if(a[i].type == "input"){
				$('#'+rankinput).append("<input type='text' id='"+dom_id+"' class='form-control "+sizecol+"' name='"+dom_name+"' placeholder='"+placeholder+"' />");
			}else if(a[i].type == "password"){
				$('#'+rankinput).append("<input type='password' id='"+dom_id+"' class='form-control "+sizecol+"' name='"+dom_name+"'/>");
			}else if(a[i].type == "checkbox"){
				var checkboxid = "chb"+rankinput;
				if(a[i].inline == "true"){
					inline = "checkbox-inline";
				}else{
					inline = "checkbox";
				}
				$('#'+rankinput).append("<div id='"+checkboxid+"' class='checkbox' ></div>");
				for(var n in a[i].option) {
					$('#'+checkboxid).append("<label class='"+inline+"'><input type='checkbox' value='"+n+"' name='"+a[i].name+"' />"+a[i].option[n]+"</label>");
				}
				
			}else if(a[i].type == "radio"){
				var radioid = "chb"+rankinput;
				if(a[i].inline == "true"){
					inline = "radio-inline";
				}else{
					inline = "radio";
				}
				$('#'+rankinput).append("<div id='"+radioid+"' class='radio' ></div>");
				for(var n in a[i].option) {
					$('#'+radioid).append("<label class='"+inline+"'><input type='radio' value='"+n+"' name='"+a[i].name+"' />"+a[i].option[n]+"</label>");
				}
			}else if(a[i].type == "select"){
				if(a[i].multiple=="true"){
					var multiple="multiple";
				}else{
					var multiple="";
				}
			
				$('#'+rankinput).append("<select id='"+a[i].name+"' "+multiple+" class='form-control "+sizecol+"' name='"+a[i].name+"'></select>");
				for(var m in a[i].option) {
					$('#'+a[i].name).append("<option value="+m+">"+a[i].option[m]+"</option>");
				}
			}else if(a[i].type == "button"){
				
				$('#'+rankinput).append("<button type='submit' class='form-control btn btn-primary' id='"+a[i].name+"' name='"+a[i].name+"'>Sign in</button>");
			}else if(a[i].type == "textarea"){
				$('#'+rankinput).append("<textarea class='form-control' id='"+a[i].name+"' name='"+a[i].name+"' rows='3'></textarea>");
			}else if(a[i].type == "verify"){
				var verifyDiv = 'verifyDiv_'+dom_id;
				$('#'+rankinput).append("<div class='input-group' ><div class='input-group-addon' style='padding:0;'><img width='100px' height='32px' src='"+a[i].imgsrc+"' /></div><input type='text' class='form-control' /></div>");
			}else{
				alert(a[i].type);
			}
		}
		
	}
})(jQuery);
