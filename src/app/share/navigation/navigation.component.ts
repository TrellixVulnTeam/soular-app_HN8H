import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare let $:any;


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currentUser;
  dropDownMenu: boolean = false;
  flash;
  flashCounter:number = 0;
  constructor(private _router: Router, private authService: AuthService) { }
  goToDashboard(){
    this._router.navigate(["/admin/dashboard/?", {display: "dashboard"}]);
  }
  signOut(){
    this.authService.userLogout().then((ref)=> {
      this.flash = {
        counter: this.flashCounter,
        timeout: "3000",
        text: `You have logged out successfully`,
        textColor: "#ffffff",
        background: "rgba(177,43,4, 0.7)"
      }
      setTimeout(()=>{
        this._router.navigate(["/login"]);
      }, 1000);

    },(err) => {
      console.log(err);
    });
  }
  goToLoginForm(){
    this._router.navigate(["/login"]);
  }
  routeNavigation(route: string){
    let nav = route.toUpperCase();
    switch(nav){
      case 'CAREER':
        this._router.navigate(["/career"]);
        break;
      case 'SERVICES':
        this._router.navigate(["/services"]);
        break;
      case 'ABOUT':
        this._router.navigate(["/about"]);
        break;
      case 'CONTACT':
        this._router.navigate(["/contact"]);
        break;
      case 'NEWS':
        this._router.navigate(["/news"]);
        break;
      case 'ACCOUNT':
        this._router.navigate(["/my_account"]);
        break;
      default: 
        this._router.navigate(["/"]);
    }

  }
  dropMenu(){
    // this.dropDownMenu = true;
    let dropItem = document.getElementById('drop-items');
    dropItem.style.marginTop = "0px";
    dropItem.style.transition = ".4s";
  }
  closeMenu(){
    let dropItem = document.getElementById('drop-items');
    dropItem.style.marginTop = "-200px";
    dropItem.style.transition = ".4s";
  }
  
  ngOnInit() {
    this.authService.authUserState()
    .subscribe(user => {
      this.currentUser = user;
      console.log(user);
      setTimeout(()=> {
        if(localStorage.getItem("flash")){
          this.flash = {
            counter: this.flashCounter,
            timeout: "5000",
            text: `You have been logged in successfully as ${user.displayName}`,
            textColor: "#ffffff",
            background: "rgba(3,97,22, 0.8)"
          }
         
          localStorage.removeItem("flash");
        }
        this.flashCounter++;
      }, 1000);
      
    });
    $('.chips').material_chip();
    window.addEventListener('click', (e:any)=>{
      console.log(e);
      if(e.target.classList[0] !== "items-menu"){
        this.closeMenu();
      }
    });
  }
}

