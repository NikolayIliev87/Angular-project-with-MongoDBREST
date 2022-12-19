import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'login',
        component:LoginComponent,
        data: {
            title: "LogIn"
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: "Register"
        }
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        data: {
            title: "Profile"
        }
    },
    {
        path: 'logout',
        component: LogoutComponent,
        data: {
            title: "LogOut"
        }
    }
];

export const AuthRoutingModule = RouterModule.forChild(routes);