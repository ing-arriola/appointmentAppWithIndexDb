let DB

const form=document.querySelector('form'),
      petName=document.querySelector('#mascota'),
      customerName=document.querySelector('#cliente'),
      phone=document.querySelector('#telefono'),
      date=document.querySelector('#fecha'),
      hour=document.querySelector('#hora'),
      symphtoms=document.querySelector('#sintomas'),
      appointment=document.querySelector('#citas'),
      headManage=document.querySelector('#administra')

document.addEventListener('DOMContentLoaded',()=>{
    let DBCreator=window.indexedDB.open('appointment',1)
    DBCreator.onerror=()=>{
        console.log('There was an error')
    }
    DBCreator.onsuccess=function(){
        console.log('Success')
        DB=DBCreator.result
        console.log(DB)
    }

    DBCreator.onupgradeneeded=function (e) {
        let db=e.target.result
        let objectStore=db.createObjectStore('appointment',{keyPath:'key',autoIncrement:true})
        objectStore.createIndex('pet','pet',{unique:false})
        objectStore.createIndex('cliente','cliente',{unique:false})
        objectStore.createIndex('telefono','telefono',{unique:false})
        objectStore.createIndex('fecha','fecha',{unique:false})
        objectStore.createIndex('hora','hora',{unique:false})
        objectStore.createIndex('sintomas','sintomas',{unique:false})
        
    }
    
})

