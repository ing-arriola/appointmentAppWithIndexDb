let DB

const form=document.querySelector('form'),
      petName=document.querySelector('#mascota'),
      customerName=document.querySelector('#cliente'),
      phone=document.querySelector('#telefono'),
      date=document.querySelector('#fecha'),
      hour=document.querySelector('#hora'),
      symptom=document.querySelector('#sintomas'),
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
        objectStore.createIndex('customer','customer',{unique:false})
        objectStore.createIndex('phone','phone',{unique:false})
        objectStore.createIndex('date','date',{unique:false})
        objectStore.createIndex('hour','hour',{unique:false})
        objectStore.createIndex('symptom','symptom',{unique:false})
        
    }
    
})

form.addEventListener('submit',addData)

function addData(e){
    e.preventDefault()
    let newAppointment={
        pet:petName.value ,
        customer:customerName.value,
        phone:phone.value,
        date:date.value,
        hour:hour.value,
        symptom:symptom.value
    }
    //console.log(newAppointment)
    let transaction=DB.transaction(['appointment'],'readwrite')
    let objectStore=transaction.objectStore('appointment')
    let query=objectStore.add(newAppointment)

    console.log(query)

    query.onsuccess=()=>{
        form.reset()
    }
    transaction.oncomplete=()=>{
        console.log('OK!!')
    }
    transaction.onerror=()=>{
        console.log('sorry for you')
    }
}

