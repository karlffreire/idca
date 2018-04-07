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

/*==========================================

      INICIALIZACION DE FORMULARIOS

============================================*/

function initSelect(){
  initBuscaYaci();
  initSelUbic();
  initSelTipYac();
}

function initBuscaYaci(){
  $('#intro-yaci').select2({
    placeholder: 'Busca un yacimiento',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelUbic(){
  $('#selpais').select2({
    placeholder: 'Selecciona país',
    allowClear: true,
    theme: "bootstrap"
  });
  $('#selprov').select2({
    placeholder: 'Selecciona región',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelTipYac(){
  $('#seltipoyac').select2({
    placeholder: 'Selecciona tipos de yacimiento',
    allowClear: true,
    theme: "bootstrap"
  });
}
