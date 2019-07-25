const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('DB/data.json', data, (err) => {

        if (err) throw new Error('No se pudo grabar', err);
    });


}



const cargarDB = () => {

    try {

        listadoPorHacer = require('../DB/data.json');

    } catch (error) {

        listadoPorHacer = [];

    }


}



const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    return porHacer;

}

const getListado = () => {

    cargarDB();
    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const getListadoCompleto = (completado) => {

    cargarDB();
    let listadoCompletado = listadoPorHacer.filter(tarea => {
        return tarea.completado === completado
    });



    return listadoCompletado;


}

const borrar = (descripcion) => {

    cargarDB();

    let tareaParaBorrar = listadoPorHacer.filter(borrar => {
        return borrar.descripcion != descripcion
    });

    if (listadoPorHacer.length === tareaParaBorrar.length) {
        return false;
    } else {
        listadoPorHacer = tareaParaBorrar
        guardarDB();
        return true;

    }


}

module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar,
    getListadoCompleto
}