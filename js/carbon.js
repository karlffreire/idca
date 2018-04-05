/*=========================================

       LLAMADAS A BASE DE datos

===========================================*/

function cargaYacCronoTipo(prov,tipo,crono,callback){
  $.ajax({
    url: "./datos/cargaYacCronoTipo.php",
    data:{
      prov : prov,
      tipo : tipo,
      crono : crono
    },
    success: callback
  });
}

function cargaYacDat(tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
  $.ajax({
    url: "./datos/cargaYacDat.php",
    data:{
      tmuestra : tmuestra,
      tmat : tmat,
      edadmin : edadmin,
      edadmax : edadmax,
      stdevmin : stdevmin,
      stdevmax : stdevmax,
      metod : metod,
      lab : lab
    },
    success: callback
  });
}

function cargaYaci(yaci,callback){
  $.ajax({
    url: "./datos/cargaYaci.php",
    data:{
      yaci : yaci
    },
    success: callback
  });
}

function cargaYacTodo(prov,tipo,crono,tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
  $.ajax({
    url: "./datos/cargaYacTodo.php",
    data:{
      prov : prov,
      tipo : tipo,
      crono : crono,
      tmuestra : tmuestra,
      tmat : tmat,
      edadmin : edadmin,
      edadmax : edadmax,
      stdevmin : stdevmin,
      stdevmax : stdevmax,
      metod : metod,
      lab : lab
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
