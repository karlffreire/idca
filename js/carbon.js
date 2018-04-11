/*=========================================

           CARGA DE LISTADOS

===========================================*/

function cargaLstYac(callback){
  $.ajax({
    url: './datos/cargaYacis.php',
    success: callback
  });
}

function cargaLstReg(callback){
  $.ajax({
    url: './datos/cargaRegiones.php',
    success: callback
  });
}

function cargaLstTipYac(callback){
  $.ajax({
    url: './datos/cargaTiposYac.php',
    success: callback
  });
}

function cargaLstCrono(callback){
  $.ajax({
    url: './datos/cargaCronos.php',
    success: callback
  });
}
/*=========================================

       CONSULTAS BASE DE DATOS

===========================================*/

function selYacCronoTipo(prov,tipo,crono,callback){
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

function selYacDat(tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
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

function selYaci(yaci,callback){
  $.ajax({
    url: "./datos/selecYaci.php",
    data:{
      yaci : yaci
    },
    success: callback
  });
}

function selYacTodo(prov,tipo,crono,tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
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

         ORGANIZACIÓN DE DATOS

============================================*/

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

function organizaOpciones(arrObjt){
  var grupos = [];
  var grup = [];
  var gruposOpciones = [];
  for (var i = 0; i < arrObjt.length; i++) {
    grupos.push(arrObjt[i].grupo);
  }
  grup = unique(grupos);
  for (var i = 0; i < grup.length; i++) {
    var objgrup = {};
    objgrup.text = grup[i];
    var opcionesGrupo = jQuery.grep(arrObjt, function( opcion ) {
      return ( opcion.grupo == grup[i]);
    });
    objgrup.children = opcionesGrupo;
    gruposOpciones.push(objgrup);
  }
  for (var i = 0; i < gruposOpciones.length; i++) {
    var hijos = gruposOpciones[i].children;
    for (var j = 0; j < hijos.length; j++) {
      delete hijos[j].grupo;
    }
  }
  return gruposOpciones;
}

function ponTema(resultado){
  console.log(resultado);
}

/*==========================================

      INICIALIZACION DE FORMULARIOS

============================================*/

function initPaneles(){
  $('#panel-busca-yaci').hide();
  $('#panel-sel-filt').hide();
  $('.filt').hide();
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
  var mostrar = $('#carac-yaci');
  muestraFilt(mostrar,'filt-yac');
}

function initSelect(){
  cargaLstYac(initBuscaYaci);
  cargaLstReg(initRegiones);
  cargaLstTipYac(initSelTipYac);
  cargaLstCrono(initSelCronYac);
  // initSelTipMuest();
  // initSelMat();
  initBarraBP();
  initBarraDesv();
  // initSelMetod();
  // initSelLab();
}

function muestraFilt(este,selec){
  $('.lst-filt-elem').removeClass('activo');
  $(este).addClass('activo');
  $('.filt').hide();
  $('#'+selec).show();
}

function initBuscaYaci(result){
  $('#intro-yaci').select2({
    data:result,
    placeholder: 'Busca un yacimiento',
    allowClear: true,
    theme: "bootstrap",
    width: 'copy'
  });
}

function initRegiones(resultado){
  var data = organizaOpciones(resultado);
  $('#selprov').select2({
    data:data,
    placeholder: 'Selecciona región',
    allowClear: true,
    closeOnSelect: false,
    multiple:true,
    theme: "bootstrap",
    dropdownAutoWidth: false,
    dropdownCss: function(){
      //no sé cómo obtener el width calculado para restarle 30px
      return {"margin-left":"15px"};
    },
    formatResultCssClass: function(o){
      if (!o.id) {//si la opción no tiene id es porque es un grupo
        return 'doscol';
      }
    }
  });
}

function initSelTipYac(resultado){
  var data = organizaOpciones(resultado);
  $('#seltipoyac').select2({
    data:data,
    placeholder: 'Selecciona tipos de yacimiento',
    allowClear: true,
    closeOnSelect: false,
    multiple:true,
    theme: "bootstrap",
    dropdownAutoWidth: false,
    dropdownCss: function(){
      //no sé cómo obtener el width calculado para restarle 30px
      return {"margin-left":"15px"};
    },
    formatResultCssClass: function(o){
      if (!o.id) {//si la opción no tiene id es porque es un grupo
        return 'doscol';
      }
    }
  });
}

function initSelCronYac(resultado){
  var data = resultado;
  $('#selcronoyac').select2({
    data:data,
    placeholder: 'Selecciona cronología de yacimiento',
    allowClear: true,
    closeOnSelect: false,
    multiple:true,
    theme: "bootstrap",
    dropdownAutoWidth: false,
    dropdownCss: function(){
      //no sé cómo obtener el width calculado para restarle 30px
      return {"margin-left":"15px"};
    }
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
