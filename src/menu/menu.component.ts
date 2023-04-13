import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminProductsService } from 'src/app/admin/adminProducts.service';
import { AuthUserGuard } from 'src/app/auth-user.guard';
import { CartService } from 'src/cart.service';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  admins: any = "";
  adminLoggedin: boolean = false;
  users: any = "";
  loggedin: boolean = false;
  loggedinUser: any = "";
  loggedinUserMail:string="";

  cartDataCount: number = 0;

  constructor(private dataService: ProductsDataService, private cartService: CartService, private loginFormBuilder: FormBuilder, private admin: AdminProductsService, private auth: AuthUserGuard, private router: Router, private http: HttpClient) {
    this.dataService.registeredUser().subscribe((user) => {
      this.users = user;
    });
    this.dataService.admin().subscribe((user) => {
      this.admins = user;
    });
    this.loggedin = this.dataService.userLogin;
    this.loggedinUser = this.dataService.activeUser;
    this.adminLoggedin = this.admin.admin;
  }

  ngOnInit() {
    if (sessionStorage.getItem('userLoggedIn')) {
      this.loggedin = true;
      this.dataService.userLogin = this.loggedin;
      this.loggedinUser = sessionStorage.getItem('userName');
      this.cartService.getUsersCartList(sessionStorage.getItem('userId'));
    }
    this.cartService.getProducts().subscribe(product => this.cartDataCount = product.length);
  }

  registerForm = this.loginFormBuilder.group(
    {
      username: [, [Validators['required'], Validators['pattern']]],
      mail: [, [Validators['required'], Validators['pattern']]],
      mobile: [, [Validators['required'], Validators['pattern']]],
      password: [, [Validators['required'], Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$")]]
    }
  )

  loginModal() {
    const LoginPanel: any = document.querySelector(".Loginmodal");
    const RegisterPanel: any = document.querySelector(".Registermodal");
    const SuccessfulRegistered: any = document.querySelector('.registerSuccessModal');

    RegisterPanel.close();
    SuccessfulRegistered.close();
    LoginPanel.showModal();
  }

  closePanel() {
    const loginDiv: any = document.querySelector(".Loginmodal");
    const RegisterPanel: any = document.querySelector(".Registermodal");
    loginDiv.close();
    RegisterPanel.close();
  }

  registerModal() {
    const RegisterPanel: any = document.querySelector(".Registermodal");
    const LoginPanel: any = document.querySelector(".Loginmodal");
    LoginPanel.close();
    RegisterPanel.showModal();
  }

  registerUser() {
    let newUser: boolean = true;

    let SuccessfulRegistered: any = document.querySelector('.registerSuccessModal');
    const RegisterPanel: any = document.querySelector(".Registermodal");
    RegisterPanel.close();

    this.http.get<any>("http://localhost:3000/registeredUser").subscribe((user) => {
      user.find((userData: any) => {
        if (userData.mail == this.registerForm.get('mail')?.value || userData.mobile == this.registerForm.get('mobile')?.value) {
          newUser = false;
        }
      });
      if (newUser) {
        this.dataService.registerUser(this.registerForm.value).subscribe(data => {});
        SuccessfulRegistered.showModal();
      } else {
        alert("Already Registered");
        RegisterPanel.showModal();
      }
    });
  }

  login(usermail: any, userpassword: any) {
    var invalidLogin: any = document.querySelector('#loginError');
    this.loggedin = false;
    for (let user of this.users) {
      if (usermail.value === user.mail && userpassword.value === user.password) {
        invalidLogin.innerHTML = "";
        this.loggedinUser = user;
        this.dataService.activeUser = this.loggedinUser;
        this.loggedin = true;
        this.dataService.userLogin = this.loggedin;
        sessionStorage.setItem('userLoggedIn', 'true')
        sessionStorage.setItem('userName', user.username);
        sessionStorage.setItem('userMail', user.mail);
        sessionStorage.setItem('userId', user.id);
        this.cartService.getUsersCartList(sessionStorage.getItem('userId'));
        this.closePanel();
        alert("Login Successful");
        break;
      }
    }

    if (!this.loggedin) {
      for (let user of this.admins) {
        if (usermail.value == user.mail && userpassword.value == user.password) {
          this.loggedin = true;
          this.admin.admin = true;
          sessionStorage.setItem('adminLoggedIn', 'true')
          sessionStorage.setItem('userName', user.name);
          this.router.navigate(['/', 'admin', 'dashboard'])
        }
      }
    }

    if (!this.loggedin) {
      var invalidLogin: any = document.querySelector('#loginError');
      invalidLogin.innerHTML = "Invalid Credentials";
    }
  }

  logout() {
    this.loggedin = false;
    this.dataService.userLogin = this.loggedin;
    this.loggedinUser = "";
    this.dataService.activeUser = this.loggedinUser;
    sessionStorage.clear();
  }

}

