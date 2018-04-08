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
  initSelCronYac();
  initSelTipMuest();
  initSelMat();
  initBarraBP();
  initBarraDesv();
  initSelMetod();
  initSelLab();

  $('.filt').hide();
  var mostrar = $('#carac-yaci');
  muestraFilt(mostrar,'filt-yac');

  $('#panel-filt').on('click',function(){
    $('#intro-yaci').prop('disabled',true);
    $('.selfilt').prop('disabled', false);
    var rango_fechas = $('#selfecha').data("ionRangeSlider");
  	rango_fechas.update({
      	disable: false
      });
    var rango_dev = $('#seldev').data("ionRangeSlider");
  	rango_dev.update({
      	disable: false
      });
  })
}

function muestraFilt(este,selec){
  $('.lst-filt-elem').removeClass('activo');
  $(este).addClass('activo');
  $('.filt').hide();
  $('#'+selec).show();
}

function initBuscaYaci(){
  $('#intro-yaci').select2({
    placeholder: 'Busca un yacimiento',
    allowClear: true,
    theme: "bootstrap"
  });
  $('#panel-yaci').on('click',function(){
    $('#intro-yaci').prop('disabled', false);
    $('.selfilt').prop('disabled', true);
    var rango_fechas = $('#selfecha').data("ionRangeSlider");
  	rango_fechas.update({
      	disable: true
      });
    var rango_dev = $('#seldev').data("ionRangeSlider");
  	rango_dev.update({
      	disable: true
      });
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
