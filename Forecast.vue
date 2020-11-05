<template>
  <v-container
    id="forecast"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <base-material-card
          icon="mdi-apple-icloud"
          color="primary"
          title="Demo Forecast Meteorológico"
        >
          <v-form @submit.prevent="ranchoSeleccionado(rancho)">
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="3">
                <v-select
                  :items="ranchos"
                  label="Rancho"
                  placeholder="Andromeda"
                  v-model="rancho"
                ></v-select>
              </v-col>
              <v-col cols="5">
              </v-col>
              <v-col cols="3">
                  <v-btn
                    color="accent"
                    type="submit"
                  >FORECAST</v-btn>
              </v-col>
            </v-row>
          </v-form>

          <v-row v-if="!(currentWeather === null)">
            <v-col cols="1"></v-col>
            <v-col cols="2">
              <p>{{currentWeather}}</p>
              <img
              :src="weatherIcon"
              align="top"
              >
            </v-col>
            <v-col
              cols="3"
            >
              <p class="display-4">
                {{currentTemp}}°C
              </p>
              <p class="small">
                Sensación: {{feelsLike}}°C
              </p>
            </v-col>
            <v-col>
              <p>
                Humedad: {{currentHumidity}}%
                <br>
                Indice UV: {{currentUvi}}
                <br>
                Presión: {{currentPressure}}hPa
              </p>
            </v-col>
          </v-row>
          <v-row v-if="!(currentWeather === null)">
            <v-col cols="1"></v-col>
            <p class="headline">Pronóstico 7 días</p>
          </v-row>
          <v-row v-if="!(currentWeather === null)">
            <v-spacer></v-spacer>
            <v-col>
              <p>{{weatherArray[0]}}</p>
              <img
              :src="weatherIconArray[0]"
              align="center"
              >
              <p align="start">
                {{date[0]}}
                <br>
                Tmáx: {{tmax[0]}}
                <br>
                Tmin: {{tmin[0]}}
                <br>
                Humedad: {{humidityArray[0]}}
              </p>
            </v-col>
            <v-col>
              <p>{{weatherArray[1]}}</p>
              <img
              :src="weatherIconArray[1]"
              align="center"
              >
              <p align="start">
                {{date[1]}}
                <br>
                Tmáx: {{tmax[1]}}
                <br>
                Tmin: {{tmin[1]}}
                <br>
                Humedad: {{humidityArray[1]}}
              </p>
            </v-col>
            <v-col>
              <p>{{weatherArray[2]}}</p>
              <img
              :src="weatherIconArray[2]"
              align="center"
              >
              <p align="start">
                {{date[2]}}
                <br>
                Tmáx: {{tmax[2]}}
                <br>
                Tmin: {{tmin[2]}}
                <br>
                Humedad: {{humidityArray[2]}}
              </p>
            </v-col>
            <v-col>
              <p>{{weatherArray[3]}}</p>
              <img
              :src="weatherIconArray[3]"
              align="center"
              >
              <p align="start">
                {{date[3]}}
                <br>
                Tmáx: {{tmax[3]}}
                <br>
                Tmin: {{tmin[3]}}
                <br>
                Humedad: {{humidityArray[3]}}
              </p>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row v-if="!(currentWeather === null)">
            <v-spacer></v-spacer>
            <v-col>
              <p>{{weatherArray[4]}}</p>
              <img
              :src="weatherIconArray[4]"
              align="center"
              >
              <p align="start">
                {{date[4]}}
                <br>
                Tmáx: {{tmax[4]}}
                <br>
                Tmin: {{tmin[4]}}
                <br>
                Humedad: {{humidityArray[4]}}
              </p>
            </v-col>
            <v-col>
              <p>{{weatherArray[5]}}</p>
              <img
              :src="weatherIconArray[5]"
              align="center"
              >
              <p align="start">
                {{date[5]}}
                <br>
                Tmáx: {{tmax[5]}}
                <br>
                Tmin: {{tmin[5]}}
                <br>
                Humedad: {{humidityArray[5]}}
              </p>
            </v-col>
            <v-col>
              <p>{{weatherArray[6]}}</p>
              <img
              :src="weatherIconArray[6]"
              align="center"
              >
              <p align="start">
                {{date[6]}}
                <br>
                Tmáx: {{tmax[6]}}
                <br>
                Tmin: {{tmin[6]}}
                <br>
                Humedad: {{humidityArray[6]}}
              </p>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card v-if="showTable === true">
            <v-data-table
              :headers="headers"
              :items="forecastHora"
            ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'
  export default {
    name: 'forecast',
    data: () => ({
      ranchos: [
        'Andromeda',
        'Aquila',
        'Argus',
        'Aries',
      ],
      rancho: '',
      headers: [
        {
          text: 'Hora',
          align: 'start',
          value: 'dt',
          sortable: true,
        },
        {
          text: 'Descripcion',
          align: 'start',
          value: 'weather',
          sortable: true,
        },
        {
          text: 'Temperatura [°C]',
          align: 'start',
          value: 'temp',
          sortable: true,
        },
        {
          text: 'Humedad [%]',
          align: 'start',
          value: 'humidity',
          sortable: true,
        },
      ],
    }),
    methods: {
      ...mapActions(['ranchoSeleccionado', 'getForecastHora']),
      ...mapMutations(['setForecastHora']),
    },
    computed: {
      ...mapState([
        'forecast',
        'forecastHora',
        'showTable',
        'weatherIcon',
        'currentTemp',
        'feelsLike',
        'currentWeather',
        'currentHumidity',
        'currentUvi',
        'currentPressure',
        'date',
        'weatherArray',
        'weatherIconArray',
        'humidityArray',
        'tmax',
        'tmin',
      ]),
    },
    created () {
      this.setForecastHora()
    },
  }
</script>
