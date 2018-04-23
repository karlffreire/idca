



/*=========================================

           CARGA DE LISTADOS

===========================================*/

function cargaYacis(callback){
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

function cargaLstTipMuest(callback){
  $.ajax({
    url: './datos/cargaTiposMuestra.php',
    success: callback
  });
}

function cargaLstTipMat(callback){
  $.ajax({
    url: './datos/cargaTiposMaterial.php',
    success: callback
  });
}

function cargaLstRang(callback){
  $.ajax({
    url: './datos/cargaRangos.php',
    success: callback
  });
}

function cargaLstMetodos(callback){
  $.ajax({
    url: './datos/cargaMetodos.php',
    success: callback
  });
}

function cargaLstLabos(callback){
  $.ajax({
    url: './datos/cargaLabos.php',
    success: callback
  });
}

/*==========================================

        ORGANIZACIÓN DE DESPLEGABLES

============================================*/

function compare(a,b) {
  if (a.text < b.text)
    return -1;
  if (a.text > b.text)
    return 1;
  return 0;
}

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

function colPorGrupo (data) {
 if (!data.id) {
    return $('<span style="color:#8A0808;font-size:1rem;">'+data.text+'</span>');
  }
  return $(
      '<span>'+data.text+'</span>'
  );
};

function detalles (data) {
  if (data.detalle){
    return $(
      '<span>'+data.text+'</span><br><span class="labo-completo">'+data.detalle+'</span>'
    );
  }
  return $(
      '<span>'+data.text+'</span>'
  );
};

/*==========================================

      INICIALIZACION DE ELEMENTOS

============================================*/

var tipoFilSelec = {"filtyac":false,"filtmat":false,"filtdat":false};

function initSelFiltYac(){
  cargaLstReg(initSelReg);
  cargaLstTipYac(initSelTipYac);
  cargaLstCrono(initSelCronYac);
  $('.selfilt-yac').on('select2:select',function(){//si se selecciona alguna tipo de yacimiento
    tipoFilSelec.filtyac = true;
  });
  $('.selfilt-yac').on('select2:unselect',function(e){//si se borran las selecciones
    var selecyac = $('.selfilt-yac').find(':selected');
    if (selecyac.length == 0) {
      tipoFilSelec.filtyac = false;
    }
  });
}

function initSelFiltMat(){
  cargaLstTipMuest(initSelTipMuest);
  cargaLstTipMat(initSelMat);
  $('.selfilt-mat').on('select2:select',function(){
    tipoFilSelec.filtmat = true;
  });
  $('.selfilt-mat').on('select2:unselect',function(e){//si se borran las selecciones
    var selecmat = $('.selfilt-mat').find(':selected');
    if (selecmat.length == 0) {
      tipoFilSelec.filtmat = false;
    }
  });
}

function initSelFiltDat(){
  cargaLstRang(initBarras);
  cargaLstMetodos(initSelMetod);
  cargaLstLabos(initSelLab);
  $('.selfilt-dat').on('select2:select',function(){
    tipoFilSelec.filtdat = true;
  });
  $('.selfilt-dat').on('select2:unselect',function(e){//si se borran las selecciones
    var selecdat = $('.selfilt-dat').find(':selected');
    if (selecdat.length == 0) {
      tipoFilSelec.filtdat = false;
    }
  });
}

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
  $('#panel-yaci').one('click',function(){
    initBuscaYaci();
  });

  $('#panel-filt').on('click',function(){
    $('#panel-busca-yaci').hide();
    $('#panel-sel-filt').show();
    $('#tit-buscayaci').show();
    $('#tit-filtrar').hide();
  });
  $('#panel-filt').one('click',function(){
     initSelFiltYac();
  });

  $('#carac-mat').on('shown.bs.tab', function (e) {//el evento shown.bs.tab se dispara después de activar la tab. Si se inicializan los select antes de mostrarlos no cogen bien el tamaño
    var init = $('#seltipomuest').hasClass("select2-hidden-accessible");
    if (!init) {
      initSelFiltMat();
    }
  });
  $('#carac-data').on('shown.bs.tab', function(){
    var init = $('#selmetodo').hasClass("select2-hidden-accessible");
    if (!init) {
      initSelFiltDat();
    }
  });
}

function initBuscaYaci(){
  var data = [];
  var capas = mapa.getLayers().getArray();
  var capayac;
  for (var i = 0; i < capas.length; i++) {
    var nomcapa = capas[i].get('name');
    if (nomcapa == 'yacis') {capayac = capas[i];}
  }
  var featcluster = capayac.getSource().features;
  for (var i = 0; i < featcluster.length; i++) {
    var features = featcluster[i].getProperties().features;
    for (var j = 0; j < features.length; j++) {
      var obj = {};
      obj.id = features[j].get('id');
      obj.text = features[j].get('text');
      data.push(obj);
    }
  }
  data.sort(compare);
  $('#intro-yaci').select2({
    data : data,
    placeholder: 'Busca un yacimiento',
    allowClear: true,
    theme: "bootstrap",
    width: 'copy'
  });
  $('#intro-yaci').on('select2:select',function(e){
    buscaDatYaci(e.params.data.id);
  })
}

function initSelReg(resultado){
  var data = organizaOpciones(resultado);
  $('#selprov').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    templateResult: colPorGrupo
  });
}

function initSelTipYac(resultado){
  var data = organizaOpciones(resultado);
  $('#seltipoyac').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    templateResult: colPorGrupo
  });
}

function initSelCronYac(resultado){
  var data = resultado;
  $('#selcronoyac').select2({
    data:data,
    placeholder: '*',
    theme: "bootstrap",
    allowClear: true
  });
}

function initSelTipMuest(resultado){
  var data = resultado;
  $('#seltipomuest').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelMat(resultado){
  var data = organizaOpciones(resultado);
  $('#seltipomat').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    templateResult: colPorGrupo
  });
}

function initBarras(resultado){
  var initfechmin = Math.floor(resultado.fechamininit/100)*100;
  var initfechmax = Math.ceil(resultado.fechamaxinit/100)*100;
  var initdesvmin = Math.floor(resultado.desvmininit/100)*100;
  var initdesvmax = Math.ceil(resultado.desvmaxinit/100)*100;
	$("#selfecha").ionRangeSlider({
    type: "double",
    grid: true,
    min: initfechmin,
    max: initfechmax,
    //max_interval: 5000,
    //drag_interval:true,
    from: 5000,
    to: 10000,
    step: 100,
    postfix: " BP",
    onStart:function(data){
      salvarFecha(data);
    },
    onFinish:function(data){
      tipoFilSelec.filtdat = true;
      salvarFecha(data);
    }
  });
	$("#seldev").ionRangeSlider({
    type: "double",
    grid: true,
    min: initdesvmin,
    max: initdesvmax,
    from: 200,
    to: 4500,
    step: 50,
    postfix: "",
    onStart:function(data){
      salvarDesv(data);
    },
    onFinish:function(data){
      tipoFilSelec.filtdat = true;
      salvarDesv(data);
    }
  });
}

function initSelMetod(resultado){
  var data = resultado;
  $('#selmetodo').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelLab(resultado){
  var data = resultado;
  $('#sellab').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    templateResult:detalles
    //matcher: selecConDetalle
  });
}

function salvarFecha(data){
  fechamin = data.from;
  fechamax = data.to;
}

function salvarDesv(data){
  desvmin = data.from;
  desvmax = data.to;
}

function initTabla(){
    var tabla = $('#tab-data').DataTable({
      dataSrc: 'data',
      order: [[1, 'desc']],
      columns: [
        {
            "className": 'detalles-data',
            "orderable": false,
            "data": null,
            "defaultContent": '<i class="fas fa-plus-circle" aria-hidden="true" style="cursor:pointer;"></i>'
        },
        {data: 'fecha',"render":function(data,type,row){
            if (type === 'display' || type === 'filter') {
              return '<strong>'+row.fecha+' ± '+row.stdev+' BP</strong>';
            }
            return data;
          }
        },
        {data:'tipo_muestra_c14'},
        {data:'mostrar_tipomat',"render":function(data){
            var tipos = data.split('#');
            var txt = '';
            for (var i = 0; i < tipos.length; i++) {
              txt += tipos[i] +'<br>';
            }
            return txt;
          }
        },
        {data:'metodos_medida'},
        {data:'sigla'},
        {data:'nombre_yaci'},
        {data:'ubicacion'}
      ],
      pageLength: 10,
      dom: "<'row'<'col-md-5'i><'col-md-7 pull-right'f>>" +"<'row'<'col-md-12'tr>>" +"<'row'<'col-md-12 lst-dataciones'p>>",
      renderer: "bootstrap",
      language: {
      "search": "_INPUT_",
      "searchPlaceholder": "Search...",
      "info": "Showing _START_ to _END_ out of <strong> _TOTAL_ </strong> datings"
    }
    });
    tabla.on('click', 'td.detalles-data', function () {
        var tr = $(this).closest('tr');
        var row = tabla.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(extiendeData( row.data()) ).show();
            tr.addClass('shown');
        }
    } );
}

function isCluster(feature) {
  if (!feature || !feature.get('features')) {
        return false;
  }
  return feature.get('features').length > 1;
}

function ponEstiloYacis(feature) {
  if (isCluster(feature)) {
    var radio = Math.min(feature.get('features').length, 6) + 5;
  }
  else{
    var radio = 5;
  }
  var circulo = new ol.style.Circle({
    radius: radio,
    stroke: new ol.style.Stroke({
      width: 2,
      color: '#454545'
    }),
    fill: new ol.style.Fill({
      color: '#FF7542',
    }),
    rotateWithView: true
  });
  var estilo_yacis = new ol.style.Style({
    image: circulo
  });
  return [estilo_yacis];
}

function ponCapa(resultado){
  var geojsonArq = resultado;
	featsArqueo = (new ol.format.GeoJSON()).readFeatures(geojsonArq);
  var capayac = new ol.layer.Vector({
    style: ponEstiloYacis
  });
  capayac.set('name', 'yacis');
	if (featsArqueo.length > 0) {
		yacisSource = new ol.source.Vector({
	        features: featsArqueo
	      });
		var agrupaYacis = new ol.source.Cluster({
	        distance: 20,
	        source: yacisSource
	      });
		capayac.setSource(agrupaYacis);
    mapa.addLayer(capayac);//al añadir cuando el mapa aún está oculto hay veces que da problemas
	}
  else{
    alert('Error loading archaeological sites. Map functionality not available.');
  }

}

function initMapa(resultado){
  var osm = new ol.layer.Tile({
            source: new ol.source.OSM()
          });
  mapa = new ol.Map({
      controls: [new ol.control.OverviewMap()],
	    layers: [osm],
	    view: new ol.View({
	      projection: 'EPSG:3857',
	      center: [-288976.121475105, 4868797.98060151],
        maxZoom : 12,//revisar a qué escala corresponde
	      zoom: 5
	    }),
	    target: 'map'
  	});
    $('#fila-mapa').addClass('collapse');
    var popup = new ol.Overlay({
        element: document.getElementById('popup')
    });
    mapa.addOverlay(popup);
    mapa.on('click', function(evt) {
   		var feature = mapa.forEachFeatureAtPixel(evt.pixel,
  	    function(feature, layer) {
  	      if (layer.get('name') == 'yacis') {
    			 	if (feature) {
    			        var coordinate = evt.coordinate;
    			 		muestraPopup(coordinate,feature);
    				}
    	        	return feature;
  	    	}
  	    });
    	});
}

/*==========================================

        PETICIONES DE DATOS

============================================*/

function buscaDatYaci(idyaci){
  selYaci(idyaci,ponDatosTabla);
  $('#ficha-selec').addClass('collapse');
}

function recogePeticion(){
  if (!tipoFilSelec.filtyac&&!tipoFilSelec.filtmat&&!tipoFilSelec.filtdat) {
    alert(noSelec);
  }
  else{
    $('#piensa').addClass('fa-spin');
    var inityac = $('#selprov').hasClass("select2-hidden-accessible");
    var initmat = $('#seltipomuest').hasClass("select2-hidden-accessible");
    var initdat = $('#selmetodo').hasClass("select2-hidden-accessible");
    var pidereg = '';
    var pidetipo = '';
    var pidecrono = '';
    var pidemuest = '';
    var pidemat = '';
    var pidemetodo = '';
    var pidelab = '';
    //Recogemos los datos, y si no hay, false
    if (inityac) {
      var datosreg = ($('#selprov').find(':selected').length > 0) ? $('#selprov').select2('data') : false;
      var datostipo = ($('#seltipoyac').find(':selected').length > 0) ? $('#seltipoyac').select2('data') : false;
      var datoscrono = ($('#selcronoyac').find(':selected').length > 0) ? $('#selcronoyac').select2('data') : false;
    }
    else if (!inityac) {
      var datosreg = false;
      var datostipo = false;
      var datoscrono = false;
    }
    if (initmat) {
      var datosmuest = ($('#seltipomuest').find(':selected').length > 0) ? $('#seltipomuest').select2('data') : false;
      var datosmat = ($('#seltipomat').find(':selected').length > 0) ? $('#seltipomat').select2('data') : false;
    }
    else if (!initmat) {
      var datosmuest = false;
      var datosmat = false;
    }
    if (initdat) {
      var datosmetodo = ($('#selmetodo').find(':selected').length > 0) ? $('#selmetodo').select2('data') : false;
      var datoslab = ($('#sellab').find(':selected').length > 0) ? $('#sellab').select2('data') : false;
    }
    else if (!initdat) {
      fechamin = '';
      fechamax = '';
      desvmin = '';
      desvmax = '';
      var datosmetodo = false;
      var datoslab = false;
    }
    //rellenamos las variables para pasar al controlador:
    if (datosreg) {
      for (var i = 0; i < datosreg.length; i++) {
        pidereg += datosreg[i].id+'-';
      }
      pidereg = pidereg.substring('-',pidereg.length - 1);
    }
    if (datostipo) {
      for (var i = 0; i < datostipo.length; i++) {
        pidetipo += datostipo[i].id+'-';
      }
      pidetipo = pidetipo.substring('-',pidetipo.length - 1);
    }
    if (datoscrono) {
      for (var i = 0; i < datoscrono.length; i++) {
        pidecrono += datoscrono[i].id+'-';
      }
      pidecrono = pidecrono.substring('-',pidecrono.length - 1);
    }
    if (datosmuest) {
      for (var i = 0; i < datosmuest.length; i++) {
        pidemuest += datosmuest[i].id+'-';
      }
      pidemuest = pidemuest.substring('-',pidemuest.length - 1);
    }
    if (datosmat) {
      for (var i = 0; i < datosmat.length; i++) {
        pidemat += datosmat[i].id+'-';
      }
      pidemat = pidemat.substring('-',pidemat.length - 1);
    }
    if (datosmetodo) {
      for (var i = 0; i < datosmetodo.length; i++) {
        pidemetodo += datosmetodo[i].id+'-';
      }
      pidemetodo = pidemetodo.substring('-',pidemetodo.length - 1);
    }
    if (datoslab) {
      for (var i = 0; i < datoslab.length; i++) {
        pidelab += datoslab[i].id+'-';
      }
      pidelab = pidelab.substring('-',pidelab.length - 1);
    }
    fichaSelec(datosreg, datostipo, datoscrono, datosmuest, datosmat, fechamin,fechamax,desvmin,desvmax, datosmetodo, datoslab);
    selecDataciones(pidereg,pidetipo,pidecrono,pidemuest,pidemat,fechamin,fechamax,desvmin,desvmax,pidemetodo,pidelab,ponDatosTabla);
  }
}


/*=========================================

        LLAMADAS PARA CONSULTAS

===========================================*/


function selecDataciones(prov,tipo,crono,tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
  $.ajax({
    url: "./datos/selecDataciones.php",
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

function selYaci(yaci,callback){
  $.ajax({
    url: "./datos/selecYaci.php",
    data:{
      yaci : yaci
    },
    success: callback
  });
}


/*=========================================

           COLOCACIÓN DE DATOS

===========================================*/

function fichaSelec(datosreg, datostipo, datoscrono, datosmuest, datosmat, fechamin,fechamax,desvmin,desvmax,datosmetodo, datoslab){
  $('#ficha-selec').empty();
  var tit = document.createElement('div');
  tit.setAttribute('class','lst-flt-selec');
  tit.innerHTML = '<strong>'+titFichaSel+'</strong>';
  var divficha = document.createElement('div');
    divficha.setAttribute('class','lst-flt-selec');
    $('#ficha-selec').append(tit);
  if (datosreg) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datosreg.length; i++) {
      txt += datosreg[i].text+', ';
    }
    p.innerHTML = '<em>'+etiProv+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datostipo) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datostipo.length; i++) {
      txt += datostipo[i].text+', ';
    }
    p.innerHTML = '<em>'+etiTipoYac+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datoscrono) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datoscrono.length; i++) {
      txt += datoscrono[i].text+', ';
    }
    p.innerHTML = '<em>'+etiCronoYac+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datosmuest) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datosmuest.length; i++) {
      txt += datosmuest[i].text+', ';
    }
    p.innerHTML = '<em>'+etiTipoMuest+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datosmat) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datosmat.length; i++) {
      txt += datosmat[i].text+', ';
    }
    p.innerHTML = '<em>'+etiTipoMat+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if ((fechamin != '') || (fechamax != '')) {
    var p = document.createElement('p');
    p.innerHTML = '<em>'+etiFecha+'</em>:<br>' + fechamin+'-'+fechamax+' BP | σ: '+desvmin+'-'+desvmax;
    divficha.appendChild(p);
  }
  if (datosmetodo) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datosmetodo.length; i++) {
      txt += datosmetodo[i].text+', ';
    }
    p.innerHTML = '<em>'+etiMetodo+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datoslab) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datoslab.length; i++) {
      txt += datoslab[i].text+', ';
    }
    p.innerHTML = '<em>'+etiLab+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  var pandesc = document.createElement('div');
  var titdesc = document.createElement('div');
  titdesc.setAttribute('class','descargas');
  titdesc.setAttribute('style','border-bottom-left-radius:0;border-bottom-right-radius:0;');
  titdesc.innerHTML = '<strong>'+titDesc+'</strong>';
  var divdesc = document.createElement('div');
    divdesc.setAttribute('class','descargas');
    divdesc.setAttribute('style','border-top-left-radius:0;border-top-right-radius:0;');
  var linkcsv = document.createElement('a');
      $(linkcsv).addClass('btn boton-flujo');
      $(linkcsv).html('csv');
      linkcsv.setAttribute('style','padding:0.25em 1em;font-size:1em;')
    divdesc.appendChild(linkcsv);
    pandesc.appendChild(titdesc);
    pandesc.appendChild(divdesc);
  $('#ficha-selec').append(divficha);
  $('#ficha-selec').append(pandesc);
  $('#ficha-selec').removeClass('collapse');
}


function ponDatosTabla(resultado){
  var arrids = [];
  for (var i = 0; i < resultado.data.length; i++) {
    arrids.push(resultado.data[i].id_yaci);
  }
  var tabla = $('#tab-data').DataTable();
  tabla.clear().draw();
  tabla.rows.add(resultado.data );
  tabla.columns.adjust().draw();
  $('#piensa').removeClass('fa-spin');
  $('.panel-resultados').removeClass('collapse');
  $('#panel-busca-yaci').hide();
  $('#panel-sel-filt').hide();
  $('#tit-buscayaci').show();
  $('#tit-filtrar').show();
  muestraPuntos(arrids);
}

function muestraPuntos(ids){
  var capas = mapa.getLayers().getArray();
  var capayac;
  var yacisFltSource = new ol.source.Vector({
  });
  for (var i = 0; i < capas.length; i++) {
    var nomcapa = capas[i].get('name');
    if (nomcapa == 'yacis') {capayac = capas[i];}
  }
  var features = yacisSource.getFeatures();
  for (var i = 0; i < features.length; i++) {
    var idfeat = features[i].get('id');
    if (ids.indexOf(idfeat) != -1) {
      yacisFltSource.addFeature(features[i]);
    }
  }
  var agrupaYacis = new ol.source.Cluster({
        distance: 20,
        source: yacisFltSource
      });
  capayac.setSource(agrupaYacis);
  mapa.getView().fit(yacisFltSource.getExtent());
}

function extiendeData(datacion){
  var tr = document.createElement('tr');
   var td0 = tr.insertCell(0);
   var td1 = tr.insertCell(1);
       td1.colSpan = 7;
   var div0 = document.createElement('div');
       $(div0).addClass( 'w-100' );
     var div1 = document.createElement('div');
       $(div1).addClass('col-md-12');
       div1.setAttribute("style","padding:0");
       $(div1).addClass( 'loading' );
       $(div1).text( 'loading' );

     div0.appendChild(div1);
   $(td1).html(div0);
   $.ajax( {
       url: './datos/selecDataExt.php',
       data: {
           datacion: datacion.id_datacion_c14
       },
       dataType: 'json',
       success: function ( json ) {
         if (!json.data) {
           $(div1).text( '' );
           var divext = document.createElement('div');
               $(divext).addClass('col-md-12');
               divext.innerHTML = 'No more data available';
               div1.appendChild(divext);
         }
         else{
           $(div1).text( '' );
           var divmat = document.createElement('div');
             $(divmat).addClass('col-md-12');
             $(divmat).addClass('data-ext');
           var txtmat = '';
           if (json.data.contexto_estratigrafico) {
             txtmat += 'Contexto estratigráfico: '+json.data.contexto_estratigrafico+' |';
           }
           if (json.data.evaluacion_asociacion) {
             txtmat += ' Evaluación asociación: '+json.data.evaluacion_asociacion+' |';
           }
           if (json.data.observaciones) {
             txtmat += ' Observaciones: '+json.data.observaciones+' |';
           }
           $(divmat).html('<em>Info material</em>: '+txtmat.substring(0, txtmat.length - 1));
           var divdat = document.createElement('div');
             $(divdat).addClass('col-md-12');
             $(divdat).addClass('data-ext');
           var txtdat = '';
           if (json.data.num_datacion) {
             txtdat += ' Datación número: '+json.data.num_datacion+' |';
           }
           if (json.data.fecha_analisis) {
             txtdat += ' Fecha análisis: '+json.data.fecha_analisis+' |';
           }
           if (json.data.d13c) {
             txtdat += ' δ13C: '+json.data.d13c+' |';
           }
           if (json.data.d15n) {
             txtdat += ' δ15N: '+json.data.d15n+' |';
           }
           if (json.data.c_n) {
             txtdat += ' C/N: '+json.data.c_n+' |';
           }
           if (json.data.cor_frac_isotopo) {
             txtdat += ' Corrección por fracción de isótopo: '+json.data.cor_frac_isotopo+' |';
           }
           $(divdat).html('<em>Info datación</em>: '+txtdat.substring(0, txtdat.length - 1));
           div1.appendChild(divmat);
           div1.appendChild(divdat);
           if (json.data.bibliografia) {
             var divbib = document.createElement('div');
               $(divbib).addClass('col-md-12');
               $(divbib).addClass('data-ext');
             var txtrefs = '<ul>';
             var refs = json.data.bibliografia.split('#');
             for (var i = 0; i < refs.length; i++) {
               txtrefs += '<li>'+refs[i]+'</li>'
             }
             txtrefs += '</ul>';
             $(divbib).html('<em>Referencias bibliográficas</em>: '+txtrefs);
             div1.appendChild(divbib);
           }
         }
         $(div1).removeClass( 'loading' );
       }
   } );
   return tr;
}

function cierraPops(){
	var elementos = mapa.getOverlays();
		elementos.forEach(function(element,index,array){
			var elemento = element.getElement();
			$(elemento).popover('dispose');
		})
}

function muestraPopup(coord,feature){
	var element = document.getElementById('popup');
	var popup = mapa.getOverlays().item(0);//esto sólo funciona porque no tengo más overlays en el mapa. HACER BIEN
	var plantilla = '<div class="popover" role="tooltip"><div class="popover-header popover-title" title="Yacimientos"></div><div class="arrow"></div><div class="popover-body"></div></div>';
		var titulo;
		var contenido_popup = document.createElement('DIV');
		var feats = feature.getProperties().features;
		if (feats.length == 1) {
			titulo = feats[0].get('text');
			var txt_yaci = feats[0].get('cronotipo');;
			contenido_popup.innerHTML = txt_yaci;
		}
		else{
			titulo = feats.length + ' '+popYac;
			for (var i = 0; i < feats.length; i++) {
				var txt_yaci = feats[i].get('cronotipo');
				var panel_yaci = document.createElement('div');
					panel_yaci.setAttribute('id','tit_'+feats[i].get('id'));
					panel_yaci.setAttribute('onclick','javascript:muestra_data_ext("tit_'+feats[i].get('id')+'")');
				var tit_yaci = document.createElement('a');
					tit_yaci.setAttribute('class','enlace_yaci');
					tit_yaci.innerHTML = feats[i].get('text');
				var prf_yaci = document.createElement('div');
					prf_yaci.setAttribute('id','inf_'+feats[i].get('id'));
					prf_yaci.setAttribute('class','yaci-ext');
					prf_yaci.style.display ='none';
					prf_yaci.innerHTML = txt_yaci;
				panel_yaci.appendChild(tit_yaci);
				panel_yaci.appendChild(prf_yaci);
				contenido_popup.appendChild(panel_yaci);
			}
		}
  $(element).popover('dispose');
	    popup.setPosition(coord);
	$(element).popover({
	  'placement': 'top',
	  'animation': false,
	  'html': true,
	  'content': contenido_popup,
	  'title':'<img src="./img/paletin.svg" class="icono-pop" title="Yacimiento"></img>'+titulo+'<a href="javascript:cierraPops();" class="cierra-pop"><i class="fa fa-times fa-2x"></i></a>',
	  'template':plantilla
	});
	$(element).popover('show');
}

function muestra_data_ext(id_div){
	var padre = document.getElementById(id_div);
	var hijo = padre.lastChild;
	if(hijo.style.display == 'none'){
		$(hijo).show();
	}
	else {
		$(hijo).hide();
	}
}
