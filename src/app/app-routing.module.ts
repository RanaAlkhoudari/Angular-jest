import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path:"", redirectTo: "/register", pathMatch: "full"},
  {path:"register", component: RegisterComponent},
  {path:"home", component: HomeComponent},
  {path:"myAccount", component: MyAccountComponent},
  {path:"edit", component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
