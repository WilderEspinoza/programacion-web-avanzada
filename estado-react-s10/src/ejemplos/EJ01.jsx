function Hijo({nombre}){
    return <h3>Hola {nombre}</h3>
}

function Intermedio({nombre}){
    return <Hijo nombre={nombre}/>
}

export default function Padre(){
    return <Intermedio nombre="Ana"/>
}
