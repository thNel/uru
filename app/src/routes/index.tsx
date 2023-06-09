import {createBrowserRouter} from "react-router-dom";
import Root from "../pages/root";
import Error from "../wigets/error";
import RegisterForm from "../wigets/registerForm";
import AdminItemList from "../wigets/adminItems";
import AdminSkins from "../wigets/adminSkins";
import MainPage from "@/pages/main";
import AdminWinGroups from "@/wigets/adminWinGroups";
import Help from "@/wigets/help";
import OneWidgetPage from "@/pages/oneWidgetPage";
import LoginForm from "@/wigets/loginForm";
import Profile from "@/wigets/profile";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Root><OneWidgetPage><Error/></OneWidgetPage></Root>,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: "register/:login?/:password?",
        element: <OneWidgetPage><RegisterForm /></OneWidgetPage>
      },
      {
        path: "login/:username?",
        element: <OneWidgetPage><LoginForm /></OneWidgetPage>
      },
      {
        path: 'user',
        element: <OneWidgetPage><Profile /></OneWidgetPage>
      },
      {
        path: 'help',
        element: <OneWidgetPage><Help /></OneWidgetPage>
      },
      {
        path: 'admin/items',
        element: <OneWidgetPage><AdminItemList /></OneWidgetPage>
      },
      {
        path: 'admin/skins',
        element: <OneWidgetPage><AdminSkins /></OneWidgetPage>
      },
      {
        path: 'admin/win-groups',
        element: <OneWidgetPage><AdminWinGroups /></OneWidgetPage>
      },
    ]
  },
]);