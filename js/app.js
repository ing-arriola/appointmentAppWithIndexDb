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
        DB=DBCreator.result
        showData()
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
    let objectStore=transaction.objectStore('appointment')//This allows insert data on DB
    let query=objectStore.add(newAppointment)

    console.log(query)
    //When the appointment successfully insert data, the form will be reset
    query.onsuccess=()=>{
        form.reset()
    }
    //Show message when the query is complete
    transaction.oncomplete=()=>{
        console.log('OK!!')
        showData()
    }
    transaction.onerror=()=>{
        console.log('sorry for you')
    }
}

function showData(){
    //Clean last appointments
    while(appointment.firstChild){
        appointment.removeChild(appointment.firstChild)
    }
    let objectStore=DB.transaction('appointment').objectStore('appointment')

    objectStore.openCursor().onsuccess=function(e){
        //cursor will get the indicated position
        let cursor=e.target.result
        console.log(cursor)
        if(cursor){
            let appointmentHTML=document.createElement('li')
            appointmentHTML.setAttribute('data-cita-id',cursor.value.key)
            appointmentHTML.classList.add('list-group-item')

            appointmentHTML.innerHTML=`
                <p class="font-weigth-bold">
                Pet: <span class="font-weigth-normal">
                ${cursor.value.pet}</span> 
                </p>
                <p class="font-weigth-bold">
                Customer: <span class="font-weigth-normal">
                ${cursor.value.customer}</span> 
                </p>
                <p class="font-weigth-bold">
                Phone: <span class="font-weigth-normal">
                ${cursor.value.phone}</span> 
                </p>
                <p class="font-weigth-bold">
                Date: <span class="font-weigth-normal">
                ${cursor.value.date}</span> 
                </p>
                <p class="font-weigth-bold">
                Hour: <span class="font-weigth-normal">
                ${cursor.value.hour}</span> 
                </p>
                <p class="font-weigth-bold">
                Symptom: <span class="font-weigth-normal">
                ${cursor.value.symptom}</span> 
                </p>
            `
            appointment.appendChild(appointmentHTML)

            cursor.continue()

        }
    }

}

