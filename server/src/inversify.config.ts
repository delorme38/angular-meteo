import { Container } from 'inversify';
import { TYPES } from './types';
import { WeatherController } from './controllers/weather.controller';
import { Application } from './app';
import { Server } from './server';
import { wttrWeatherService as weatherProvider } from './services/wttrWeather.service';
import { AuthController } from './controllers/auth.controller';
import { MongodbService } from './services/mongodb.service';
import { AuthService } from './services/auth.service';


const container: Container = new Container();

//App
container.bind(TYPES.Server).to(Server);
container.bind(TYPES.Application).to(Application);

//Services
container.bind(TYPES.WeatherService).to(weatherProvider); 
container.bind(TYPES.MongodbService).to(MongodbService); 
container.bind(TYPES.AuthService).to(AuthService); 

//Controllers
container.bind(TYPES.WeatherController).to(WeatherController);
container.bind(TYPES.AuthController).to(AuthController);

export { container };