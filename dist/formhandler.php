<?php
// Подключаем автозагрузку Composer
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$name = $_POST['name'] ;
$telephone = $_POST['phone'] ;
$comments = $_POST['message'] ;


$mail = new PHPMailer(true); // Создаём объект PHPMailer
$mail->CharSet = "UTF-8";
try {
    // Настройки SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.bk.ru'; // SMTP сервер
    $mail->SMTPAuth   = true;
    $mail->Username   = 'edo.jan.94@bk.ru'; // Ваш email
    $mail->Password   = 'HMPWxjQwQGQUUY03ZmgD'; // Пароль от почты
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // От кого письмо
    $mail->setFrom('edo.jan.94@bk.ru', 'Your Name');
    // Кому письмо
    $mail->addAddress('dd7q2@e-record.com', 'Recipient Name');

    // Содержание письма
    $mail->isHTML(true);
    $mail->Subject = 'Тема письма';
    $mail->Body=      "Name: $name phone: $telephone message: $comments";
    $mail->AltBody = 'Альтернативный текст письма';

    $mail->send(); // Отправка письма
    echo 'Сообщение отправлено';
} catch (Exception $e) {
    echo "Ошибка при отправке письма: {$mail->ErrorInfo}";
}