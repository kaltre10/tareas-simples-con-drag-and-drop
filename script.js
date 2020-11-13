class Tarea { 

    constructor(tarea, estado){
        this.tarea = tarea;
        this.estado = estado || false;
    }

    crearTarea(){
        if(this.tarea != ''){
            let id = arrayTareas.length + 1;
            const $item = document.createElement('div');
            $item.setAttribute('class', 'item');
            $item.setAttribute('draggable', 'true');
            $item.setAttribute('id', `tarea-${id}`);
            $item.innerHTML = `<p>${this.tarea}</p>`;
            const $btn = document.createElement('button');
            $btn.textContent = 'x';
            $item.appendChild($btn);
            arrayTareas.push({tarea: this.tarea, estado: this.estado});
            localStorage.setItem('listaTareas', JSON.stringify(arrayTareas));
            const $fragmento = document.createDocumentFragment();
            arrayTareas.forEach(element => { 
                $fragmento.appendChild($item);
            });
            if(this.estado){
                $tareasCompletadas.appendChild($fragmento);
            }else{
                $listaTareas.appendChild($fragmento);
            }
            
        }
    }

    static mostrarTareas(tareasMostrar){
        if(tareasMostrar){
            tareasMostrar.forEach(element => {
                // console.log(tareasMostrar)
                let tarea = new Tarea(element.tarea, element.estado);
                tarea.crearTarea();
            })
        }
    }

    eliminarTarea(tarea){ 
        tarea.parentElement.remove();
        arrayTareas.forEach((element, i) => {
           if(tarea.parentElement.textContent == element.tarea + 'x'){
               arrayTareas.splice(i, 1);
           }
        })
        localStorage.setItem('listaTareas', JSON.stringify(arrayTareas));
    }

}

const arrayTareas = [];
const tareasMostrar = JSON.parse(localStorage.getItem('listaTareas')) || [];
const $listaTareas = document.getElementById('lista-tareas');
const $tareasCompletadas = document.getElementById('tareas-completadas');
Tarea.mostrarTareas(tareasMostrar);

document.addEventListener('submit', (event) => {
    event.preventDefault();
    let tarea = document.getElementById('tarea').value;
    const $form = document.getElementById('form').reset();
    let tareas = new Tarea(tarea);
    tareas.crearTarea();
})
document.addEventListener('click', (event) => {
    if(event.target.textContent == 'x'){
        const tarea = new Tarea();
        tarea.eliminarTarea(event.target);
    }
})

//DRAG AND DROP
let $completadas = document.getElementById('tareas-completadas');

$listaTareas.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
})

$completadas.addEventListener('dragover', (e) => {
    e.preventDefault();
})

$completadas.addEventListener('drop', (e) => {
    const element = document.getElementById(e.dataTransfer.getData('text'));
    $completadas.appendChild($listaTareas.removeChild(element));
    let elementoSeleccionado = element.querySelector('p').textContent;
    arrayTareas.forEach((element, i) => {
        if(element.tarea == elementoSeleccionado){
            arrayTareas[i].estado = true;
        }
    })
    // console.log(arrayTareas)
    localStorage.setItem('listaTareas', JSON.stringify(arrayTareas));
    e.preventDefault();
})

//DRAG AND DROP

$completadas.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
})

$listaTareas.addEventListener('dragover', (e) => {
    e.preventDefault();
})

$listaTareas.addEventListener('drop', (e) => {
    const element = document.getElementById(e.dataTransfer.getData('text'));
    $listaTareas.appendChild($completadas.removeChild(element));
    let elementoSeleccionado = element.querySelector('p').textContent;
    arrayTareas.forEach((element, i) => {
        if(element.tarea == elementoSeleccionado){
            arrayTareas[i].estado = false;
        }
    })
    // console.log(arrayTareas)
    localStorage.setItem('listaTareas', JSON.stringify(arrayTareas));
    e.preventDefault();
})