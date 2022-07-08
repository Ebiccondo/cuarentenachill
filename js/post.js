
$( document ).ready(function() {
    var a = '<script src="https://www.google.com/recaptcha/api.js?onload=PostCaptchaMain&render=explicit" async defer></script>'
    $("body").append(a)
})

var PostCaptchaMain = function() {
    grecaptcha.render('recaptcha3', {
        'sitekey' : '6Lcwr9IgAAAAADUNZBa-FlffUuCkI2Onkx4PH418',
        'callback' : onSubmitCaptcha,
        'theme' : 'dark'
    });

}

var CaptchaToken = ""

function onSubmitCaptcha(token) {
    CaptchaToken = token
    $(".captchaError").css('display', 'none');
};


function ELoading(isText, isP) {
    if (isText != null) {
      var p = ""
      var tittle = "<h5 onselectstart='false' style='font-size: 115%;color:rgb(255, 255, 255);'>"+isText+'</h5>'
      if (isP != null) {
        var p = '<h7 id="swp" style="font-size: 100%;color:#718dff; padding-bottom: 15px;" >'+isP+'</h7>'
      }
      var loadingSec = '<div class="loadingio-spinner-eclipse-6vdmz54cds"><div class="ldio-ermugomyfb"><div></div></div></div>'
      Swal.fire({
        title: tittle,
        html: p,
        footer: loadingSec,
        showCancelButton: false,
        showConfirmButton: false,
        focusCancel: false,
        focusConfirm:false,
        background: '#1c223c',
      })
    } else {
    var loadingSec = '<div class="loadingio-spinner-eclipse-6vdmz54cds"><div class="ldio-ermugomyfb"><div></div></div></div>'
    Swal.fire({
      title: loadingSec,
      showCancelButton: false,
      showConfirmButton: false,
      customClass: 'swal-wide',
      focusCancel: false,
      focusConfirm:false,
      background: '#27266a',
    })
  }
}


function NotAllow () {
    var btnC = '<div class="heading_container heading_center"> <a id="closePopup" onclick="swal.close(); location.reload()">Cerrar</a></div>'
    Swal.fire({
        title: "<h5 onselectstart='false' style='font-size: 115%;color:rgb(255, 255, 255);'>Denegado</h5>",
        html: `<h7 id="swp" style="font-size: 100%;color:#718dff; padding-bottom: 15px;" >El juego no cumple con los requisitos, posiblemente debido a las siguientes razones: <div id="ErrorUI">El juego no es un juego condo</div> <div id="ErrorUI">El juego es considerado como un juego popular falso</div><div id="ErrorUI">El juego esta baneado</div><div id="ErrorUI">El juego ya esta publicado</div> </h7>`,
        footer: btnC,
        showCancelButton: false,
        showConfirmButton: false,
        focusCancel: false,
        focusConfirm:false,
        background: '#27266a',
    })
}

function Allow () {
    var btnC = '<div class="heading_container heading_center"> <a id="closePopup" onclick="swal.close(); window.open(`/es`, `_Self`);">Cerrar</a></div>'
    Swal.fire({
        title: "<h5 onselectstart='false' style='font-size: 115%;color:rgb(255, 255, 255);'>Juego Publicado!</h5>",
        html: `<h7 id="swp" style="font-size: 100%;color:#718dff; padding-bottom: 15px;" >El juego ha sido publicado en nuestra página con éxito.</h7>`,
        footer: btnC,
        showCancelButton: false,
        showConfirmButton: false,
        focusCancel: false,
        focusConfirm:false,
        background: '#27266a',
    })
}


var Others = false

function CheckLinkData(inputdata, data) {
    Others = false
    var login = inputdata.val()
    data.css('display', 'none');

    var format = /[[]´{}ñ`‹›‘×`÷Ωμπ√~€¬·'"\\|<>\?]+/;
    if(format.test(login)){
        data.css('display', 'block');
        Others = true
        return true
    }
    var str1 = inputdata.val();
    if (str1.toLocaleLowerCase().indexOf(" ")!=-1)
        {
            var repl = inputdata.val().replace(/\s/g, "")
            inputdata.val(repl)
            data.css('display', 'none');
            return CheckLinkData(inputdata, data)
        }

      if(login.length <= 9){
        data.css('display', 'block');
        Others = true
    }
    if(login.match("roblox.com/games/")) {
        var Lk = login.split("roblox.com/games/")
        var gameID = Lk[1].split("/")[0]
        if(gameID.length > 11){
            data.css('display', 'block');
            Others = true
            return true
        } else {
            return gameID
        }
    } else {
        if(login.match("ro.blox.com")) {
            var Lk = login.split("games%2F")
            var gameID = Lk[1]
            if(gameID.length > 11){
                data.css('display', 'block');
                Others = true
                return true
            } else {
                return gameID
            }
        }
        
        var Ver = /[^0-9.]/g
        if(Ver.test(login)){
            data.css('display', 'block');
            Others = true
            return true
        }
        if(login.length > 11){
            data.css('display', 'block');
            Others = true
            return login
        }
    }
    

   return login
}

$( "#GameLink" ).on('input', function(property) {
    $(".LinkError").css('display', 'none');
   });

function VerifyFields() {
    var GameLink = $("#GameLink")
    OnlyID = CheckLinkData(GameLink, $(".LinkError"))
    if (Others == false) {
        if (CaptchaToken != "") {
            var GetUniverseID = "https://script.google.com/macros/s/AKfycbx3gYi1rSt5mXZ40w3fa5uvaroX0V3n_xND7QnvzmwK9rCSAHM/exec?sheet=Global&key="+ "GetGameName" + OnlyID
            ELoading("VERIFICANDO...", "El servidor esta comprobando si el juego cumple con los requisitos")
            fetch(GetUniverseID)
            .then(function(response) {
                 return response.json();
             })
             .then(function(data) {
                var PlaceName = data.response[0].name
                var PlaceDesc = data.response[0].description
                var Playing = data.response[0].playing
                var visits = data.response[0].visits
                var creatorID = data.response[0].creator.id
                if (creatorID < 3300680713) {
                    return NotAllow()
                }
                if (PlaceName == "[ Content Deleted ]") {
                    return NotAllow()
                }
                if (PlaceDesc == "[ Content Deleted ]") {
                    return NotAllow()
                }
                if (Playing <= 3 && visits >= 490 ) {
                    return NotAllow()
                }
                if (Playing >= 450 ) {
                    return NotAllow()
                }
                if (visits > 90000) {
                    return NotAllow()
                }

                const value_data = [CaptchaToken, OnlyID, OnlyID, OnlyID]
                $.ajax({
                    type: 'POST',
                    url: "https://cuarentenachill.onrender.com/PostCondo/",
                    headers: {  'Access-Control-Allow-Origin': 'https://cuarentenachill.onrender.com/' },
                    data: JSON.stringify(value_data),
                    contentType: 'application/json',
                    error: function (Guser) {
                        NotAllow()
                        console.clear()
                    },
                    success: function (Guser) {
                        Allow()
                        console.clear()
                        Postsuccess(Guser)
                        console.clear()
                    }
                });


            });
        }
    }
    if (CaptchaToken == "") {
        $(".captchaError").css('display', 'block');
    }
}
