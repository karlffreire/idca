<?php
session_start();
$usefsd = false;
if ((!isset($_SESSION['usidca']) ||  !isset($_SESSION['pssidca']) || $_SESSION['proyecto'] != 'idearq_carbon')) {
  if (isset($_GET['fallo'])) {
    $fallo = $_GET['fallo'];
  }
  else {
    $fallo = null;
  }
}
else {
  header('location:./index.php');
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Entrada</title>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
       <link rel="stylesheet" href="./css/ppal.css">
</head>
<body>
  <nav class="navbar cabecera">
    <div class="">
      <span class="navbar-brand" href="#">
        <img src="./img/hombres_blancos.png" height="40" alt="">
      </span>
      <span id="titulo" class="">IDEArq C<span class="align-top superindice">14</span></span>
    </div>
    <div class="">
      <span class="navbar-text">
        Web en desarrollo
      </span>
    </div>
  </nav>
  <div class="container">
      <div class="row" style="margin-top:10em;">
        <div id="signupbox"  class="col-md-5">
          <div class="panel-body" >
            <?php
            if ($fallo == 'ident') {
              echo "<strong style='color:red'>Usuario no válido</strong>";
            }
            ?>
            <form method="POST" action='./datos/pas_ctr.php'>
              <div class="form-group required">
                <label class="control-label col-md-4">Usuario</label>
                <div class="controls col-md-12 ">
                  <input class="form-control" name="usr" value="" style="margin-bottom: 10px" type="text" />
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label col-md-4">Contraseña</label>
                <div class="controls col-md-12 ">
                  <input type="password" class="form-control" name="ctr" value="" style="margin-bottom: 10px" type="text" />
                </div>
              </div>
              <div class="col-md-8 ">
                <input type="submit" value="Entrar" class="btn btn-success" />
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-5 offset-2">
          <div class="card">
            <div class="card-header">
              Web en desarrollo
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>Este es un portal que aún se encuentra en fase de desarrollo.<br><br>Regístrate para poder acceder y cierra la sesión cuando termines pinchando en el botón de "Salir", por favor.<br></p>
                <footer class="blockquote-footer">Equipo de <cite title="Source Title">IDEArq</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
  </div>
</body>
</html>
