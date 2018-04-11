

function cargaLstYac(callback){
  $.ajax({
    url: "./datos/cargaYacis.php",
    success: callback
  });
}

/*=========================================

       LLAMADAS A BASE DE datos

===========================================*/

function cargaYacCronoTipo(prov,tipo,crono,callback){
  $.ajax({
    url: "./datos/selecYacCronoTipo.php",
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
    url: "./datos/selecYacDat.php",
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
    url: "./datos/selecYaci.php",
    data:{
      yaci : yaci
    },
    success: callback
  });
}

function cargaYacTodo(prov,tipo,crono,tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
  $.ajax({
    url: "./datos/selecYacTodo.php",
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
  cargaLstYac(initBuscaYaci);
  initSelUbic();
  initSelTipYac();
  initSelCronYac();
  initSelTipMuest();
  initSelMat();
  initBarraBP();
  initBarraDesv();
  initSelMetod();
  initSelLab();

  $('#panel-busca-yaci').hide();
  $('#panel-sel-filt').hide();
  $('.filt').hide();
  var mostrar = $('#carac-yaci');
  muestraFilt(mostrar,'filt-yac');
  $('#panel-yaci').on('click',function(){
    $('#panel-busca-yaci').show();
    $('#panel-sel-filt').hide();
    $('#tit-buscayaci').hide();
    $('#tit-filtrar').show();
    });
  $('#panel-filt').on('click',function(){
    $('#panel-busca-yaci').hide();
    $('#panel-sel-filt').show();
    $('#tit-buscayaci').show();
    $('#tit-filtrar').hide();
  })
}

function muestraFilt(este,selec){
  $('.lst-filt-elem').removeClass('activo');
  $(este).addClass('activo');
  $('.filt').hide();
  $('#'+selec).show();
}

function initBuscaYaci(resultado){
  var data = resultado;
  $('#intro-yaci').select2({
    data : data,
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

function initSelCronYac(){
  $('#selcronoyac').select2({
    placeholder: 'Selecciona cronología de yacimiento',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelTipMuest(){
  $('#seltipomuest').select2({
    placeholder: 'Selecciona tipos de muestra',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelMat(){
  $('#seltipomat').select2({
    placeholder: 'Selecciona materiales',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initBarraBP(){
	$("#selfecha").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 8000,
    from: 1000,
    to: 7000,
    step: 50,
    postfix: " BP"
  });
}

function initBarraDesv(){
	$("#seldev").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 1000,
    from: 100,
    to: 900,
    step: 10,
    postfix: ""
  });
}

function initSelMetod(){
  $('#selmetodo').select2({
    placeholder: 'Selecciona métodos',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelLab(){
  $('#sellab').select2({
    placeholder: 'Selecciona laboratorios',
    allowClear: true,
    theme: "bootstrap"
  });
}
