function makeDroppable(element, callback) {

    var input = document.getElementById('input_musique');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', false);
    input.style.display = 'none';

    element.appendChild(input);

    element.addEventListener('change', function(e) {
        e.preventDefault();
        e.stopPropagation();
        triggerCallback(e);
    });

    element.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.add('dragover');
    });

    element.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
    });

    element.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
        triggerCallback(e);
    });
    element.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
        triggerCallback(e);
    });

    element.addEventListener('click', function() {
        input.value = null;
        input.click();
    });

    function triggerCallback(e) {
        var files;
        if(e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if(e.target) {
            files = e.target.files;
        }
        callback.call(null, files);
    }
}

var element = document.querySelector('#upload');
function callback(files) {
    $("#dropfile").text("Envoi de la musique en cours");
    $("#dropfile_img").attr("src","assets/images/icon_upload.png");
    // Here, we simply log the Array of files to the console.
    console.log(files[0]);
    var formData = new FormData();
    formData.append("files", files);

// Choix de l'utilisateur à partir d'un input HTML de type file...
    formData.append("musique", files[0]);
/*

    var request = new XMLHttpRequest();
    request.open("POST", "../");
    request.send(formData);
*/
    $.ajax({
        url: '/',
        method: 'POST',
        contentType: false,
        data: formData,
        processData: false,
        success:  function (response){envoiOk(response);},
        fail: function (response){envoiFail(response);}
    });
}
makeDroppable(element, callback);

$("#fleche_droite").click(function () {
    $('.owl-carousel').trigger('next.owl.carousel');
});

$("#fleche_gauche").click(function () {
    $('.owl-carousel').trigger('prev.owl.carousel');

});


$('.owl-carousel').owlCarousel({
    loop: false,
    margin:10,
    dots: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});

$(".item").each(function (index, value) {
    $(value).mouseenter(function () {
       $(value).find(".info").stop().fadeIn(200);
        $(value).find(".info").click(function () {
            $("#frame_player").attr("src",$(value).attr("name"));
            $("#frame_player").fadeIn();
        });
    });
    $(value).mouseleave(function () {
        $(value).find(".info").stop().fadeOut(200);
    });
});

function envoiOk(reponse) {
    $("#dropfile_img").attr("src","assets/images/icon_upload_vert.png");
    $("#dropfile").text("La musique a bien été envoyé");
    setTimeout(function(){
        $("#dropfile").text("Glissez une musique depuis votre ordinateur");
        $("#dropfile_img").attr("src","assets/images/icon_upload_blanc.png");
    }, 3000);
}

function envoiFail(reponse) {
    $("#dropfile_img").attr("src","assets/images/icon_upload_rouge.png");
    $("#dropfile").text("L'envoi a échoué");
    setTimeout(function(){
        $("#dropfile").text("Glissez une musique depuis votre ordinateur");
        $("#dropfile_img").attr("src","assets/images/icon_upload_blanc.png");
    }, 3000);

}

function readfiles(files) {
    for (var i = 0; i < files.length; i++) {

        reader = new FileReader();
        reader.onload = function(event) { document.getElementById('input_musique').value = event.target.result;}
        reader.readAsDataURL(files[i]);
    }
}
var holder = document.getElementById('upload');
holder.ondrop = function (e) {
    e.preventDefault();
    readfiles(e.dataTransfer.files);
};

$("#plus_info_users").mouseenter(function () {
   $("#liste_users").slideDown();
});

$("#plus_info_users").mouseleave(function () {
    $("#liste_users").slideUp();
});

