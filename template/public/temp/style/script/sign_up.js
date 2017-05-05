var user = {}

<<<<<<< HEAD
<<<<<<< HEAD
$(document).ready(function() {

=======





=======
>>>>>>> dffb72280e97c44249ff1b04e723e30ca767bdda
$(document).ready(function() {

	

>>>>>>> signup
	$('#tel').focusin(function() {
		
		$(this).mask("+38 (999) 999-99-99",
			{
				"clearIncomplete":true,
				completed: function(){
					var temp = $(this).val();
<<<<<<< HEAD
					var tel = "";
=======
					var phone = "";
>>>>>>> signup

					var leng = temp.length;

					for (var i = 0; i < leng; ++i) {
						if($.isNumeric(temp[i])){
<<<<<<< HEAD
							tel += temp[i];
						}
					}

					if (tel.length < 12) {
						user.tel = '';
						return false;
					}else{
						user.tel = tel;
=======
							phone += temp[i];
						}
					}

					if (phone.length < 12) {
						user.phone = '';
						return false;
					}else{
						user.phone = phone;
>>>>>>> signup
					}
				}
			});
		});

		$('#email').blur(function() {
			var temp = $(this).val();
			var reg = /(\w{1,15})@([a-z]{1,8}).([a-z]{1,4})/;

			if (reg.test(temp)) {
				user.email = temp;
			}else{
				user.email = '';
			}
		});

		$('#login').blur(function() {
			var reg = /(\w{4,12})/
<<<<<<< HEAD
			var login = $(this).val();

			if (reg.test(login)) {
				user.login = login;
			}else{
				user.login = '';
=======
			var user_name = $(this).val();
			if (user_name) {
				// $.ajax({
				// 	url: 'http://194.247.12.239:38001/api/mobile/1/native_login',
				// 	type: 'GET',
				// 	data: {user_name: user.login}
				// })
				// .done(function() {
				// 	$('label[for='+$(this).attr('id')+']').text('Пользователь с таким логином уже есть');
				// 	return false;
				// })
				// .fail(function() {
				// 	$('label[for='+$(this).attr('id')+']').text('Имя свободно');

					if (reg.test(user_name)) {
						user.user_name = user_name;
					}else{
						user.user_name = '';
						return false;
					}
				// })
				// 
				
>>>>>>> signup
			}
		});

		//setInterval($('#confirm_password').blur(), 1000)

		$(':input[type=password]').keyup(function() {
			
			var password = $('#password').val();
			var confirm_password = $(this).val();
			var lab = $('label[for='+$(this).attr('id')+']');
			var con = confirm_password.localeCompare(password);
			if (con) {
				lab.text('Пароли не совпадают').css('color', 'red');
				user.pass = '';
			}else{
				lab.text('');
				user.pass = password;
			}

		});

		$('button[type=submit').click(function() {
			$('#tel').focusin().blur();
			$('#login').blur();
			$(':input[type=password]').keyup();

<<<<<<< HEAD
			var login = user.login;
			var tel = user.tel;
=======
			var login = user.user_name;
			var tel = user.phone;
>>>>>>> signup
			var email = user.email;
			var pass = user.pass;

			$('#sign_up').attr('disabled', 'disabled');


			if (!login||!tel||!email||!pass) {
				$('#sign_up').attr('disabled', false);
			}
		});

<<<<<<< HEAD

		$('form').submit(function(event) {
			event.preventDefault();

			$.ajax({
				url: 'http://194.247.12.239:38001/api/mobile/1/native_register',
				type: 'POST',
				dataType: 'JSON',
				data: {
					user_name: user.login,
					pass: user.pass,
					phone: user.tel,
					mail: user.email
				},
			})
			.done(function() {
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			});
			
			
			// var request = new XMLHttpRequest();
			// var params = 'name=' + encodeURIComponent(user.login)+
			// '&phone='+encodeURIComponent(user.tel) +
			// '&mail='+encodeURIComponent(user.email) +
			// '&pass='+encodeURIComponent(user.pass);
=======
		$('form').submit(function(event) {
			event.preventDefault();
			
			var params = $.param(user);


			$.ajax({
				async: true,
				url: 'http://194.247.12.239:38001/api/mobile/1/native_register?callback=?',
				type: 'POST',
				dataType: 'JSONP',
				data: params,
				crossDomain: true,
				cache: false,
				scriptCharset: 'UTF-8',
				// jsonpCallback: function(){
				// 	alert('String');
				// },
				success: function (status) {
					alert('Succss: ' + status.status);
					$('#sign_up').attr('disabled', false);
				},
				error: function (status) {
					alert('Error: '+status.status);
					$('#sign_up').attr('disabled', false);
				}


			});
			
// 			function cback(data, textStatus, xhr) {
// 	alert(data + ' ' + textStatus + ' ' + xhr)
// }
			// .done(function() {
			// 	alert('success');
			// })
			// .fail(function() {
			// 	alert("error");
			// })
			
			
<<<<<<< HEAD
			// var request = new XMLHttpRequest();
			// var login = encodeURIComponent(user.login);
			// var pass = encodeURIComponent(user.pass);
			// var mail = encodeURIComponent(user.email);
			// var phone = encodeURIComponent(user.tel);
			// var params = '?user_name=' + login +
			// '&phone='+ phone +
			// '&mail='+ mail +
			// '&pass='+ pass;
>>>>>>> signup
  	// 	request.open('POST','http://194.247.12.239:38001/api/mobile/1/native_register',true);
  	// 	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  	// 	request.send(params);

		 //  if (request.status==200) {
		 //    console.log('success');
		 //  }	

=======
// $.post('http://194.247.12.239:38001/api/mobile/1/native_register?callback=?', {
// 	user_name: user.user_name, 
// 	pass: user.pass,
// 	phone: user.phone,
// 	mail: user.email
// }, cback);
// 
// 
// 
// 
			
>>>>>>> dffb72280e97c44249ff1b04e723e30ca767bdda
			

		});

});
<<<<<<< HEAD
<<<<<<< HEAD

function label(id, complete = true){
	var label = $('label[for='+id+']');

	if (complete) {
		label.text('Подходит').css('color', 'green');
	}else{
		label.text('Поле неправильно заполнено').css('color', 'red');
	}
}
=======
>>>>>>> signup
=======

function getJsonp(/*string*/url,/*string*/callback, /*bool*/nocache)
{
    var scriptTag = document.createElement("SCRIPT");
    scriptTag.src = url + "?callback=" + callback;
     
    if(typeof nocache !== undefined ) {
        scriptTag.src += "&nocache=" + (new Date()).getTime();
    }                                                
                                                  
  document.body.appendChild(scriptTag);
     
  // Netscape, Opera
    if(navigator.appName !== "Microsoft Internet Explorer") {  
           
        scriptTag.onload = function() {
            scriptTag.parentNode.removeChild(scriptTag);
        }
         
    } else {
        // Microsoft Internet Explorer
        scriptTag.onreadystatechange = function() {
             
            if(scriptTag.readyState === 'loaded'){
                scriptTag.parentNode.removeChild(scriptTag);
            }
             
        }   
    }
}
>>>>>>> dffb72280e97c44249ff1b04e723e30ca767bdda
