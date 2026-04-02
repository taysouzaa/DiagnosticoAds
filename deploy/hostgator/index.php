<?php
// Entrada padrão para o HostGator sem depender de .htaccess.
// Carrega o conteúdo do ads.html mantendo assets intactos.
header('Content-Type: text/html; charset=UTF-8');
readfile(__DIR__ . '/ads.html');
