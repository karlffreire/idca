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
  initSelMetod();
  initSelLab();

  $('#filt-mat').removeClass('active');//Se inicializan todas las tabs con la clase active para que no se cambie el tamaño de los select2. Luego se quita de las ocultas
  $('#filt-dat').removeClass('active');
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
	var slidfecha = $("#selfecha").slider({
		id: "slider-fecha",
		min: 100,
		max: 8000,
		tooltip: 'always',
		tooltip_split: true,
		range: true,
		formatter: function(value) {
			return value+' BP';
		}
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
