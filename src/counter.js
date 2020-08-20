
window.onload = function() {
			 // オブジェクトと変数の準備
			 var count_disp_ok = document.getElementById("disp_count_ok");
			 var count_disp_ng = document.getElementById("disp_count_ng");
			 var count_disp_q = document.getElementById("disp_count_q");
			 var count_ok_btn = document.getElementById("btn_count_ok");
			 var count_ng_btn = document.getElementById("btn_count_ng");
			 var count_q_btn = document.getElementById("btn_count_q");
			 var finish_btn = document.getElementById("btn_finish");
			 var ok_value = 0;
			 var ng_value = 0;
			 var q_value = 0;
			 var num;
			var start = performance.now();//開始
			var end;//終了
			var arr = ['time','reaction','id'];
			//var fs = require('fs');
			var formatCSV = '';
			//csv出力
			function exportCSV(content){
			  for (var i = 0; i < content.length; i++) {
				  var valuearr = content[i];

				  for (var j = 0; j < valuearr.length; j++) { var innerValue = valuearr[j]===null?'':valuearr[j].toString(); var result = innerValue.replace(/"/g, '""'); if (result.search(/("|,|\n)/g) >= 0)
				  result = '"' + result + '"';
				  if (j > 0)
				  formatCSV += ',';
				  formatCSV += result;
				}
				formatCSV += '\n';
			  }
			  fs.writeFile('formList.csv', formatCSV, 'utf8', function (err) {
				if (err) {
				  console.log('保存できませんでした');
				} else {
				  console.log('保存できました');
				}
			  });
			}
			
			
			//chat機能
			$(document).ready(function(){
					$("#send").click(function(){
						if ($.trim($("#text").val()) != "") {
							var html = '<input align="right" type="image" src="../img/iine.png"><div align="right" id="disp_count_ok">0</div>';
							
							$("#log").append( $("#text").val() + html +"<br />" );
							$("#log").scrollTop( $("#log")[0].scrollHeight );
							$('textarea').val(""); 
						}
					});
			});
			
			 // カウントボタンクリック処理
			 count_ok_btn.onclick = function (){
				  ok_value += 1;
				  count_disp_ok.innerHTML = ok_value;
				  end = performance.now();
				  var arr_ok = [end-start,0,Math.random() * 50]
				  arr.push(arr_ok);
				  
			 };
			 count_ng_btn.onclick = function (){
				  ng_value += 1;
				  end = performance.now();
				  count_disp_ng.innerHTML = ng_value;
				  var arr_ng = [end-start,1,Math.random() * 50]
				  arr.push(arr_ng);
				  
				  
			 };
			 count_q_btn.onclick = function (){
				  q_value += 1;
				  count_disp_q.innerHTML = q_value;
				  end = performance.now();
				  var arr_q = [end-start,1,Math.random() * 50]
				  arr.push(arr_q);
				  
			 };
			 
			finish_btn.onclick = function (){
				  exportCSV(arr);
			}; 
		
			 
};