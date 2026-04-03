<?php
/*
 * Arquivo de bootstrap para hospedagens compartilhadas com suporte a PHP.
 * Encaminha todas as requisicoes para o HTML estático final da landing page.
 * Mantém compatibilidade quando o servidor não aplica corretamente o DirectoryIndex.
 */
header('Content-Type: text/html; charset=UTF-8');
readfile(__DIR__ . '/ads.html');
