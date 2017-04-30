<!doctype html>
<html>
<base href="/">
    <head>
        <meta charset="utf-8">
        <title>Angular-Laravel Authentication</title>
        <link rel="stylesheet" href="{{ mix('css/all.css') }}">
    </head>
    <body ng-app="authApp">

        <div ng-include="'views/header.html'"></div>
        <div class="container">
            <div ui-view></div>
        </div>

    </body>

    <!-- Application Dependencies -->
    <script src="js/all.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers/login_controller.js"></script>
    <script src="js/controllers/home_controller.js"></script>
    <script src="js/controllers/register_controller.js"></script>
    <script src="js/controllers/success_controller.js"></script>
</html>
