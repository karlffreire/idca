/*=========================================

       LLAMADAS A BASE DE datos

===========================================*/

function cargaYacCronoTipo(tipo,crono,callback){
  $.ajax({
    url: "./datos/cargaYacCronoTipo.php",
    data:{
      tipo : tipo,
      crono : crono
    },
    success: callback
  });
}

/*==========================================

      COLOCACION DE datos

============================================*/

function ponTema(resultado){
  console.log(resultado);
}
