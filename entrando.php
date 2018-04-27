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
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
       <link rel="stylesheet" href="./css/ppal.css">
</head>
<body>

  <div class="container-fluid">
      <div id="cabecera" class="row">
        <h1 id="titulo" class="">IDEArq</h1>
      </div>
      <div class="row">
        <div id="signupbox" style="margin-top:50px" class="mainbox col-md-3 col-md-offset-2 ">
          <div class="panel-body" style="margin-top: 100px;">
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
        <div style="margin-top:50px" class="mainbox col-md-4 col-md-offset-1">
          <div class="panel panel-danger" style="margin-top: 100px;">
            <div class="panel-heading">Web en desarrollo</div>
            <div class="panel-body">
              Este es un portal que aún se encuentra en fase de desarrollo.<br><br>Regístrate para poder acceder y cierra sesión cuando termines, por favor.<br>
            </div>
          </div>
        </div>
      </div>
  </div>
</body>
</html>
