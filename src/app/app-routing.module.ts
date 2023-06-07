import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { GameComponent } from './pages/game/game.component';
import { RestaurantCalculatorComponent } from './pages/restaurant-calculator/restaurant-calculator.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'converter', component: ConverterComponent},
  {path:'game', component: GameComponent},
  {path:'restaurant-calculator', component: RestaurantCalculatorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
