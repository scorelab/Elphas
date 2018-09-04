import LandingPage from "../../src/views/LandingPage/LandingPage.jsx";
import AuthPage from "../views/LoginPage/AuthPage.jsx";
import AccountPage from  "../views/Authentication/Account"
import HomePage from "../views/Home/HomeAuth"
import AccountUpdatePage from "../views/Authentication/AccountUpdate"
import PasswordChange from "../views/Authentication/PasswordChange"

const indexRoutes = [
  { path: "/password_change", name: "PasswordChange", component: PasswordChange },
  { path: "/profile_edit", name: "AccountUpdatePage", component: AccountUpdatePage },
  { path: "/profile", name: "Account", component: AccountPage },
  { path: "/login-page", name: "LoginPage", component: AuthPage },
  { path: "/home", name: "HomePage", component: HomePage },
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes;
