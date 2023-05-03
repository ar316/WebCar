
//creando las variables necesarias 
const carrito = document.querySelector('#carrito');
const contenedorCarrio = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarrtoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

CargarEventListener();
function CargarEventListener(){
    //cuando agregas un cursop cuando precionas "agregar al carrito "
    listaCursos.addEventListener('click',agregarCurso);

    carrito.addEventListener('click',dateleCurso);

    vaciarCarrtoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHtml();
    });


}

//funicones 

function agregarCurso(e){
    
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const DatosCurso =  e.target.parentElement.parentElement;
        leerDatodCurso(DatosCurso);
    }
}

function leerDatodCurso(curso){
    //crear objeto con  la informacion del curso

    const InfoCurso = {
       imagen: curso.querySelector('img').src,
       titulo: curso.querySelector('h4').textContent,
       precio: curso.querySelector('.precio span').textContent ,
       id: curso.querySelector('a').getAttribute('data-id'),
       cantidadCurso: 1

    }

    //revisa si ya existe un elemento 
    const existe = articulosCarrito.some(curso => curso.id == InfoCurso.id);
    if(existe){
        //actualizamos la cantidad del curso
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === InfoCurso.id){
                curso.cantidadCurso++;
                return curso;
            }else{
                return curso;
            }
        })
        
        articulosCarrito = [...cursos];
       
    }else {
        //agregamos el curso al carrito 
        
        articulosCarrito = [...articulosCarrito, InfoCurso]
   
    }

    //agrega objetos al arreglo de carrio 
    console.log (articulosCarrito);
    carritoHtml();
}

//muestar en carrito de compras en el html

function carritoHtml(curso) {
    limpiarHtml();

    

    //limpiar html 
    

    articulosCarrito.forEach(  curso  =>{
        const {imagen,titulo,precio,cantidadCurso, id} = curso;
        const row  = document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${imagen}" width = "100px">
            </td>
            <td> 
                ${titulo}
            </td>
            <td> 
                ${precio}
            </td>
            <td> 
                ${cantidadCurso}
            </td>
            <td> 
                 <a href="#" class = "borrar-curso" data-id = "${id}"> X </a>
            </td>`;

            contenedorCarrio.appendChild(row);
    })
}

function  limpiarHtml() {
    //forma lenta 
    // contenedorCarrio.innerHTML = '';

    //forma rapida 
    while(contenedorCarrio.firstChild){
        contenedorCarrio.removeChild(contenedorCarrio.firstChild);
    }

}


// eliminar elemento con la x 

function dateleCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const idDelete = e.target.getAttribute('data-id')
        //elimina del arreglo por el data id 
        //while(e.target.classList.contains('cantidad-curso')){
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== idDelete);
        carritoHtml()
    }
    console.log(articulosCarrito);

}

