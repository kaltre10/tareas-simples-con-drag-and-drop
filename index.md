<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tareas Simples con Drag & Drop</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Tareas Simples</h1>
        <div class="control">
            <form id="form">
                <label for="tareas">Tarea por hacer:</label>
                <input type="text" id="tarea">
                <button class="btn-guardar">Guardar</button>
            </form>
        </div>
    </header>
    <div class="container">
        <div class="tareas-pendientes">
            <h2>Pendientes</h2>
            <div id="lista-tareas" class="tareas">
                
            </div>
        </div>
        <div class="tareas-completadas">
            <h2>Completadas</h2>
            <div id="tareas-completadas" class="completadas tareas">
                
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
