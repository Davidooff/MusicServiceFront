import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { MainWrapperComponent } from './pages/main-wrapper/main-wrapper.component';
import { LibraryComponent } from './pages/library/library.component';
import { SearchComponent } from './pages/search/search.component';
import { UserAlbumComponent } from './pages/user-album/user-album.component';

export const routes: Routes = [
  {
    path: '',
    component: MainWrapperComponent,
    children: [
      { path: 'library', component: LibraryComponent },
      { path: 'playlist/:playlistId', component: UserAlbumComponent },
    ],
  },
  {
    path: 'platform/:id',
    component: MainWrapperComponent,
    children: [{ path: 'search/:query', component: SearchComponent }],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyCodeComponent },
];
