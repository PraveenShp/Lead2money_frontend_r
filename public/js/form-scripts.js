$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
	 var mobile = $("#mobile").val();
    var Dtype = $("#Dtype").val();


    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&message=" + message + "&mobile=" + mobile +"&Dtype=" + Dtype,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm").removeclass().addclass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeclass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgclasses = "h3 text-center tada animated text-success";
    } else {
        var msgclasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeclass().addclass(msgclasses).text(msg);
    	$('#msgSubmit').delay(2000).hide(0);
}