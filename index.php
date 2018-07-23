<?php
session_start();

if ((!isset($_SESSION['usidca']) ||  !isset($_SESSION['pssidca']) || $_SESSION['proyecto'] != 'idearq_carbon')) {
  header('location:./entrando.php');
}

 ?>

 <!DOCTYPE html>
 <html lang="es">
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <title>IDEArq C14</title>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
     <link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap4.min.css">
     <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
     <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js"></script>
     <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
     <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.16/b-1.5.1/b-html5-1.5.1/b-print-1.5.1/datatables.min.css"/>

     <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script>
     <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script>
     <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.16/b-1.5.1/b-html5-1.5.1/b-print-1.5.1/datatables.min.js"></script>

     <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
     <link href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.10/select2-bootstrap.css" rel="stylesheet" />
     <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.full.min.js"></script>
     <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>
     <link rel="stylesheet" href="./css/ion.rangeSlider.css">
     <link rel="stylesheet" href="./css/ion.rangeSlider.skinFlat.css">
     <script src="./js/ion.rangeSlider.min.js"></script>
     <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
     <!--  Polyfill es necesario para que OL funcione con IE: -->
     <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList"></script>
     <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
     <script src="https://d3js.org/d3.v4.min.js"></script>
     <script src="./js/d3-tip.js"></script>

     <link rel="stylesheet" href="./css/ppal.css">
     <script type="text/javascript" src="./js/carbon.js"></script>
     <script type="text/javascript" src="./js/ln.js"></script>
   </head>
   <body onload="javascript:ponIdioma('es');initMapa();cargaYacis(ponCapa);initPaneles();initTabla();">
       <nav class="navbar cabecera">
         <div class="">
           <span class="navbar-brand" href="#">
             <img src="./img/hombres_blancos.png" height="40" alt="">
           </span>
           <span id="titulo" class=""></span>
         </div>
         <div class="">
           <span class="navbar-text">
             Web en desarrollo
           </span>
           <button type="button" onclick="window.location.href='./datos/desconecta.php'" class="btn btn-warning" style="margin-left:10px;">Salir <i class="fas fa-sign-out-alt"></i></button>
         </div>
      </nav>
      <div class="container-fluid">
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" style="text-align:right">
          <span class="p-idearq"><a href="javascript:ponIdioma('es')">Español</a> | <a href="javascript:ponIdioma('en')">English</a></span>
        </div>
      </div>
      <div class="row justify-content-md-center div-intro">
        <span id="intro" class="col-md-8"></span>
      </div>
      <div id="panel-yaci" class="row justify-content-md-center panel-consultas">
        <div class="cabecera-consultas">
          <button class="btn btn-lg boton-flujo">
            <i class="fas fa-search"></i>
            <span id="tit-buscayaci" style="margin-left:1em;"></button>
          </button>
        </div>
        <div id="panel-busca-yaci" class="col-md-10">
          <div class="row justify-content-md-center" style="margin-top:1.5em;">
            <div class="col-md-4">
              <select id="intro-yaci" name="buscayaci" style="width:400px;">
                <option></option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div id="panel-filt" class="row justify-content-md-center panel-consultas">
        <div class="cabecera-consultas">
          <button class="btn btn-lg boton-flujo">
            <i class="fas fa-filter"></i>
            <span id="tit-filtrar" style="margin-left:1em;"></span>
          </button>
        </div>
        <section id="panel-sel-filt" class="col-md-10">
        	<div class="container">
        		<div class="row">
        			<div class="col-md-12 ">
        				<nav>
        					<div class="nav nav-tabs nav-fill lst-filt" id="filt-list" role="tablist">
        						<a class="nav-item nav-link active" id="carac-yaci" data-toggle="tab" href="#nav-yac" role="tab" aria-controls="nav-yac" aria-selected="true"></a>
        						<a class="nav-item nav-link" id="carac-mat" data-toggle="tab" href="#nav-mat" role="tab" aria-controls="nav-mat" aria-selected="false"></a>
        						<a class="nav-item nav-link" id="carac-data" data-toggle="tab" href="#nav-dat" role="tab" aria-controls="nav-dat" aria-selected="false"></a>
        					</div>
        				</nav>
        				<div class="col-md-10 offset-1 tab-content" id="nav-tabContent">
        					<div class="w-100 tab-pane fade show active" id="nav-yac" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                      <div class="form-group">
                        <label for="selprov" id="tag-selprov"></label>
                        <select class="form-control w-100 selfilt-yac" name="prov[]" multiple="multiple" id="selprov" ></select>
                      </div>
                      <div class="form-group">
                        <label for="seltipoyac" id="tag-seltipoyac"></label>
                        <select class="w-100 selfilt-yac" name="tipoyac[]" multiple="multiple" id="seltipoyac"></select>
                      </div>
                      <div class="form-group">
                        <label for="selcronoyac" id="tag-selcronoyac"></label>
                        <select class="w-100 selfilt-yac" name="cronoyac[]" multiple="multiple" id="selcronoyac"></select>
                      </div>
                    </form>
        					</div>
        					<div class="w-100 tab-pane fade " id="nav-mat" role="tabpanel" aria-labelledby="nav-mat-tab">
                    <form>
                      <div class="form-group">
                        <label for="seltipomuest" id="tag-seltipomuest"></label>
                        <select class="w-100 selfilt-mat filt" name="tipomuest[]" multiple="multiple" id="seltipomuest"></select>
                      </div>
                      <div class="form-group">
                        <label for="seltipomat" id="tag-seltipomat"></label>
                        <select class="w-100 selfilt-mat filt" name="tipomat[]" multiple="multiple" id="seltipomat"></select>
                      </div>
                    </form>
        					</div>
        					<div class="w-100 tab-pane fade" id="nav-dat" role="tabpanel" aria-labelledby="nav-dat-tab">
                    <form>
                      <div id="selec-temp" class="form-row">
                        <div class="w-100 form-group">
                          <label for="selfecha" id="tag-fecha"></label>
                          <input id="selfecha" class="form-control rango-dat" type="text"/>
                        </div>
                      </div>
                      <div class="form-row">
                        <div id="selec-stdev" class="col-md-6">
                          <div id="tag-dev"></div>
                          <input id="seldev" class="rango-dat" type="text"/>
                        </div>
                        <div class="col-md-5 offset-1">
                          <div class="form-group">
                            <label for="selmetodo" id="tag-selmetodo"></label>
                            <select class="col-md-12 selfilt-dat filt" name="metodo[]" multiple="multiple" id="selmetodo"></select>
                          </div>
                          <div class="form-group">
                            <label for="sellab" id="tag-sellab"></label>
                            <select class="col-md-12 selfilt-dat filt" name="lab[]" multiple="multiple" id="sellab"></select>
                          </div>
                        </div>
                      </div>
                    </form>
        					</div>
        				</div>
                <div class="row justify-content-md-center">
                  <button class="btn btn-lg boton-flujo" onclick="javascript:recogePeticion();">
                    <i id="piensa" class="fas fa-cog"></i>
                    <span id="filtra-ya" style="margin-left:1em;"></span>
                  </button>
                  <button id="limp-filt" onclick="javascript:limpiaSelec();" class="btn btn-lg boton-flujo" title = "" style="margin-left:1em;" disabled = "disabled">
                    <i class="fas fa-eraser"></i>
                    <span id="tit-limpiar"></span>
                  </button>
                </div>
        			</div>
        		</div>
        	</div>
        </section>
      </div>
      <div id="resultados" class="panel-resultados collapse">

        <div id="fila-tabla" class="row justify-content-md-center" style="margin-top:5em;">
          <div id="ficha-selec" class="col-md-6">
          </div>
          <div class="panel-tabla col-md-12 ">
            <table id="tab-data" class="table table-hover tabla-dataciones w-100" cellspacing="0">
              <thead>
                <tr>
                  <th id="th-ext"><i class="fas fa-cog"></i></th>
                  <th id="th-edad"></th>
                  <th id="th-lab"></th>
                  <th id="th-tmuest"></th>
                  <th id="th-tmat"></th>
                  <th id="th-med"></th>
                  <th id="th-yac"></th>
                  <th id="th-ubi"></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div id="fila-mapa" class="row" >
          <div id="map" class="map col-md-8" data-yacids="">
            <div id="popup"></div>
            <div style="display: none;">
              <p class="overlay etiqueta-mapa" id="txt_yaci"></p>
            </div>
            <div id="creditos-base" class="attribution-container"></div>
          </div>
          <div class="col-md-4">
            <svg id="hst" width="500" height="600"></svg>

          </div>
        </div>
        <div class="row" style="margin-top:1em;">
          <div id="flechas" class="col-md-3 collapse">
            <button id="btn-nueva" type="button" class="boton-flujo" style="padding:5px;font-size:1.2em;" onclick="javascript:nuevaBsq();"></button>
            <button id="btn-modif" type="button" class="boton-flujo" style="padding:5px;font-size:1.2em;" onclick="javascript:modifBsq();"></button>
          </div>
          <button id="muestra-mapa" class="offset-5 btn btn-lg boton-flujo" data-toggle="collapse" href="#fila-mapa">
            <span id="tira-mapa"></span>
          </button>
        </div>
      </div>
    </div>

  <!-- Footer -->
  	<footer>
  		<div class="container">
  			<div class="row">
          <div class="col-md-5">
            <img src="./img/logo_idearq.png" alt="Logo idearq">
            <p>contacto: idearq@cchs.csic.es</p>
          </div>
          <div class="col-md-7">
            <ul>
              <li><a href="#">Documentación</a></li>
              <li><a href="#">Créditos</a></li>
              <li><a id="cita" role="button" tabindex="0" data-container="body" data-toggle="popover" data-placement="top" data-content="" title="" style="cursor:pointer;"></a></li>
            </ul>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Visualizador</a></li>
              <li><a href="#">Manual</a></li>
            </ul>
          </div>
        </div>
        <div class="row" style="margin-top:3em;">
          <div class="col-md-7">
            <p>C/Albasanz, 26-28. Madrid 28037 (España). Tlf: +34 91 602 23 00 Fax: +34 91 602 29 71</p>
            <p>2018 &copy; Consejo Superior de Investigaciones Cient&iacute;ficas</p>
          </div>
          <div class="col-md-5">
            <a target="_blank" href="http://www.csic.es/"><img src="./img/csic_bn.png" alt="csic" class="d-inline logo"></a>
            <a target="_blank" href="http://unidadsig.cchs.csic.es/sig/"><img src="./img/usig_go.png" alt="usig" class="d-inline logo"></a>
            <a target="_blank" href="http://ih.csic.es/"><img src="./img/logo_ih.png" alt="ih" class="d-inline logo"></a>
          </div>
        </div>
  		</div>
  	</footer>
  	<!-- ./Footer -->
   </body>
 </html>


 <!-- Generar PDF desde PHP usando: http://www.fpdf.org/ -->
 <!-- Generar PDF desde JS usando: https://github.com/MrRio/jsPDF -->
