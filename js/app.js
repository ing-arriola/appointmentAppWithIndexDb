let DB

const form=document.querySelector('form'),
      petName=document.querySelector('#mascota'),
      customerName=document.querySelector('#ciente'),
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
    DBCreator.onsuccess=()=>{
        console.log('Success')
        DB=DBCreator
        console.log(DB)
    }
    
})