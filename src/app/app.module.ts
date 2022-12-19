import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {RouterModule, Routes} from "@angular/router";
import {ParallaxDirective} from "./parallax.Directive";

const appRoutes: Routes = [
  {path: '', component: PortfolioComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ParallaxDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
