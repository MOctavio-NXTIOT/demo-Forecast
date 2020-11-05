import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
    feelsLike: null,
    forecast: null,
    forecastHora: [],
    showTable: false,
    currentHumidity: null,
    currentPressure: null,
    currentTemp: null,
    currentUvi: null,
    currentWeather: null,
    date: [],
    humidityArray: [],
    tmax: [],
    tmin: [],
    weatherArray: [],
    weatherIcon: null,
    weatherIconArray: [],

  },
  getters: {
    getForecastHora (state) {
      return state.forecastHora
    },
  },
  mutations: {
    setForecastHora (state) {
      for (let i = 0; i < 48; i++) {
        state.forecastHora[i] = { dt: '', weather: '', temp: '', humidity: '' }
      }
      state.showTable = false
      console.log(state.forecastHora)
    },
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SCRIM (state, payload) {
      state.barColor = payload
    },
    getForecastRancho (state, payload) {
      console.log(state.date)
      let openWeatherURL
      switch (payload) {
        case 'Andromeda':
          console.log('Andromeda')
          openWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=19.314909&lon=-99.0964162&units=metric&lang=es&appid=ab5d66088e31a1c47b20b04fbf191a92'
          break
        case 'Aquila':
          console.log('Aquila')
          openWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=29.5774478&lon=-98.5315889&units=metric&lang=es&appid=ab5d66088e31a1c47b20b04fbf191a92'
          break
        case 'Argus':
          console.log('Argus')
          openWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.5553237&lon=21.6207794&units=metric&lang=es&appid=ab5d66088e31a1c47b20b04fbf191a92'
          break
        case 'Aries':
          console.log('Aries')
          openWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=19.314909&lon=-99.0964162&units=metric&lang=es&appid=ab5d66088e31a1c47b20b04fbf191a92'
          break
        default:
          console.log('default')
          openWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=19.314909&lon=-99.0964162&units=metric&lang=es&appid=ab5d66088e31a1c47b20b04fbf191a92'
          break
      }
      fetch(openWeatherURL)
      .then(res => res.json()
      .then(res => {
        state.forecast = res
        state.weatherIcon = 'http://openweathermap.org/img/wn/' + state.forecast.current.weather['0'].icon + '@2x.png'
        state.currentHumidity = state.forecast.current.humidity
        state.currentPressure = state.forecast.current.pressure
        state.currentTemp = state.forecast.current.temp
        state.currentUvi = state.forecast.current.uvi
        state.currentWeather = state.forecast.current.weather['0'].description
        moment.locale('es')
        for (let i = 1; i < 8; i++) {
          state.weatherArray[i - 1] = state.forecast.daily[i].weather['0'].description
          state.date[i - 1] = moment().add(i, 'days').format('MMM Do')
          state.humidityArray[i - 1] = state.forecast.daily[i].humidity
          state.tmax[i - 1] = state.forecast.daily[i].temp.max
          state.tmin[i - 1] = state.forecast.daily[i].temp.min
          state.weatherIconArray[i - 1] = 'http://openweathermap.org/img/wn/' + state.forecast.daily[i].weather['0'].icon + '@2x.png'
        }
        state.feelsLike = state.forecast.current.feels_like
        console.log(state.forecast)
        for (let i = 0; i < 48; i++) {
          state.forecastHora[i].dt = moment().add(i, 'hours').format('MMM Do, h:mm')
          state.forecastHora[i].weather = state.forecast.hourly[i].weather[0].description
          state.forecastHora[i].temp = state.forecast.hourly[i].temp
          state.forecastHora[i].humidity = state.forecast.hourly[i].humidity
        }
        state.showTable = true
        console.log(state.forecastHora)
      }))
    },
    getForecast (state, location) {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=19.314909&lon=-99.0964162&appid=ab5d66088e31a1c47b20b04fbf191a92')
      .then(res => {
        res.json()
        .then(res => {
          console.log(res)
        })
      })
    },
  },
  actions: {
    ranchoSeleccionado ({ commit }, rancho) {
      commit('getForecastRancho', rancho)
    },
    getForecastHora () {
      console.log(this.state.forecastHora)
      return this.state.forecastHora
    },
    btnForecast ({ commit }) {
      commit('getForecast')
    },
  },
})
