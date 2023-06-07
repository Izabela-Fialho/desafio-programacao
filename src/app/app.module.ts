import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeardComponent } from './componentes/heard/heard.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { GameComponent } from './pages/game/game.component';
import { RestaurantCalculatorComponent } from './pages/restaurant-calculator/restaurant-calculator.component';
import { NumToArrPipe } from './num-to-arr.pipe';
import { NumToArrrPipe } from './num-to-arrr.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeardComponent,
    FooterComponent,
    ConverterComponent,
    GameComponent,
    RestaurantCalculatorComponent,
    NumToArrPipe,
    NumToArrrPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
