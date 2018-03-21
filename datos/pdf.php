<?php
require('../fpdf/fpdf.php');

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
$pdf->Cell(40,10,'Hello World!');
$pdf->Output();
?>
<!-- Generar PDF desde PHP usando: http://www.fpdf.org/ -->
