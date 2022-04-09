// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function passStep() {
    var form = document.getElementById("form-login");
    form.classList.add('was-validated');
    if (form.checkValidity()) {
        $("#div-step1").animate({ width: "0px" }, {
            duration: 300, complete: function () {
                $("#div-step2").removeClass('d-none');
                $("#div-step2").slideDown();
                form.classList.remove('was-validated');
                $("#input-password").attr('required', true);
                $("#input-password").focus();
            }
        }).animate({ height: "0px" },100);
    }
}

$("#btn-next").click(function () {    
    passStep();
});
$("#btn-back").click(function () {
    $("#div-step2").slideUp({
        complete: function () {
            $("#div-step1").css('width', '');
            $("#div-step1").css('height', '');
            $("#input-password").attr('required', false);
            $("#input-password").val('');
            $("#input-username").focus();
        }
    });
});
$("#form-login").on('keyup',function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (event.keyCode === 13) {
        $("#btn-next").click();
    }
});
$("#btn-login").on('click', function (e) {
    location.href = '/home';
});
$(function () {
    var quill = new Quill('#ta-post', {
        theme: 'snow'
    });
    //"":4,"":"Probando1","":"Probando1","author":"yulissa","":"2020-04-07T00:00:00",
    $.ajax(
        {
            type: 'GET',
            url:'/Home/GetPosts',
            success: function (data) {
                data.data.forEach(function (e) {
                    $('#tb-posts').append(
                        '<tr class="table-success">'+
                        '<td>' + e.status + '</td>' +
                        '<td>' + e.title + '</td>' +
                        '<td>' + (e.content || ' ').substring(0, 10) + '</td>' +
                        '<td>' + e.amountComment + '</td>' +
                        '<td>' + e.datePosts + '</td>' +
                        '</tr>'

                    );
                });
                
            }
        });
});