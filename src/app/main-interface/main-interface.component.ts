import { Component, OnInit } from '@angular/core';
import {MainService} from '../service/main.service';
import { IfStmt } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-interface',
  templateUrl: './main-interface.component.html',
  styleUrls: ['./main-interface.component.css']
})
export class MainInterfaceComponent implements OnInit {

  //creando imgs para gh Pages
  imgChat =[environment.img_prefix + "assets/chat1.png"];
  imgPlus = [environment.img_prefix + "assets/plus1.png"];
  imgDots = [environment.img_prefix + "assets/dots.png"];

  dataMsg:object[] = [];

  users =   {"UEBAQ4BR6": ["Jose Hervás",
                           "https://ca.slack-edge.com/T7E7HQJUF-UEBAQ4BR6-64015be7202d-48"],
            "UKUK1PJN5": ["Fernando Perez Caelles", 
                          "https://ca.slack-edge.com/T7E7HQJUF-UKUK1PJN5-gbf5230bc0d1-48"],
            "UL3470NDU": ["Eric Franco Cuenca", 
                          "https://ca.slack-edge.com/T7E7HQJUF-UL3470NDU-g7cc1c8ea118-48"],
            "UL2R04WNT": ["Cristian Mingorance Mulero", 
                          "https://ca.slack-edge.com/T7E7HQJUF-UL2R04WNT-g802ee3d4748-72"],
            "UEC1Z6A4D": ["Gabriel Moser",
                         "https://ca.slack-edge.com/T7E7HQJUF-UEC1Z6A4D-a564859112ec-48"] }

  




  getPersonalMsg(event){

    
   //con esta funcion obtenemos los msg individuales (en este caso mios nomas, la fecha de envio y el texto del valor del input ) luego el if lo que hace es que si presiona enter (tecla 13) se envie el mensaje al array con los datos de la api y guardo el mensaje ene l local storage, luego hago que al iniciar si el local storage es diferente de 0 , carge todo con los mensajes nuevos, sino que busque los mensajes de la api (que en este caso son siempre iguales sinose actualizarian)

   //new date es un objeto fecha y con el tostring devulve la fecha de ahora
 
    if (event["keyCode"] === 13) {  
      let today= new Date()
      let PersonalMsg = {
        "user" : this.getUsersName("UKUK1PJN5"),
        "date" : today.toString().slice(0, 24),
        "img" : this.getImg("UKUK1PJN5"),
        "ts"   : "asd",
        "text"   : (<HTMLInputElement>document.querySelectorAll('#input-msg')[0]).value
        }  

        this._service.post("https://cors-anywhere.herokuapp.com/https://formvalidation.free.beeceptor.com/awesome",PersonalMsg).subscribe((response) => { 
          console.log(response)  })



        this.dataMsg.push(PersonalMsg);

        localStorage.setItem("completeMsg", JSON.stringify(this.dataMsg));
      
        (<HTMLInputElement>document.querySelectorAll('#input-msg')[0]).value = "";
        
        
    }

  }
  


  constructor(public _service : MainService) { 

    //como enviamos al local storage un objeto (que hubo que stringifear previamente y hay que parsearlo por que viene en string del server)

    let dataLocal:object[] = JSON.parse(localStorage.getItem("completeMsg")) 


    if(dataLocal !== null){
      this.dataMsg = dataLocal
      localStorage.clear()
    } else{


     this._service.get('https://cors-anywhere.herokuapp.com/http://demo2243680.mockable.io/slack').subscribe(response => {
     //console.log(response["messages"][0]["user"]) 
     let chatInfo = response["messages"]

     for (let i = 0; i < chatInfo.length; i++) {
        //console.log(chatInfo[i])

        let obj = {
                 "user" : this.getUsersName(chatInfo[i].user),
                 "date" : this.getDateFromTimestamp(chatInfo[i].ts),
                 "img"  : this.getImg(chatInfo[i].user),
                 "ts"   : chatInfo[i].ts,
                 "text" : chatInfo[i].text }

        this.dataMsg.push(obj)

     }//end for

    this.dataMsg.sort(this.orderArray)

    //console.log(this.dataMsg)
    
    })//end arrow & get

    }

  } //end contructor


        getUserInfo(user,info){
          if (this.users[user] != undefined)
            return this.users[user][info];
          else return "NOT_FOUND"
        }

        getUsersName(user){
          return this.getUserInfo(user,0)
        }   

        getImg(user){
          return this.getUserInfo(user,1)

        }

        //convitiendo el timestamp que nos da la api a fecha real
        getDateFromTimestamp(timestamp: number) {
          
          let convert = new Date(timestamp*1000)
          let date = convert.toString().slice(0, 24);
          //console.log(date)

          return date;
        }



        //esto se hizo para ordenar el array por la fecha (timestamp) de msg mas viejos a mas nuevos
        orderArray(a, b) {
        // order by timestamp
        const itemA = a.ts;
        const itemB = b.ts;

        let comparison = 0;
        if (itemA > itemB) {
          comparison = 1;
        } else if (itemA < itemB) {
          comparison = -1;
        }
        return comparison;
        }

        //Side bar 
        openNav() {
        document.getElementById("mySidenav").style.width = "220px";
        document.getElementById("main").style.marginLeft = "220px";
        }
        closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        }


        //scroll msg on init
        ngAfterViewInit() {         
          
          let container = document.getElementById("msgContainer");           
          container.scrollTop = container.scrollHeight;   
     
  }  

  ngOnInit() {

    this.ngAfterViewInit();
    
    //setInterval( this.ngAfterViewInit,1000)

  
  }

}
