const TYPES = {
    Application: Symbol.for('Application'),
    Server: Symbol.for('Server'),
    WeatherService: Symbol.for('WeatherRepository'),
    WeatherController: Symbol.for('WeatherController'),
    AuthController: Symbol.for('AuthController'),
    AuthService: Symbol.for('AuthService'),
    MongodbService: Symbol.for('MongodbService'),
};

export { TYPES };
