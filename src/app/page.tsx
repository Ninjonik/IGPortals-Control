import Image from "next/image";
import {ResponsiveLine} from "@nivo/line";
import { headers } from 'next/headers'
import {CurrentTime} from "@/app/components/CurrentTime";
import {TemperatureGraph} from "@/app/components/TemperatureGraph";

interface Params {
    [key: string]: string;
}

interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    };
    current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
    };
    forecast: {
        forecastday: forecastDay[]
    }
}

interface forecastDay {
    date: string,
    date_epoch: number,
    day: {
        condition: {
            text: string,
            icon: string,
            code: number,
        }
        "maxtemp_c": number,
        "maxtemp_f": number,
        "mintemp_c": number,
        "mintemp_f": number,
        "avgtemp_c": number,
        "avgtemp_f": number,
        "maxwind_mph": number,
        "maxwind_kph": number,
        "totalprecip_mm": number,
        "totalprecip_in": number,
        "totalsnow_cm": number,
        "avgvis_km": number,
        "avgvis_miles": number,
        "avghumidity": number,
        "daily_will_it_rain": number,
        "daily_chance_of_rain": number,
        "daily_will_it_snow": number,
        "daily_chance_of_snow": number,
        uv: number,
    },
    astro: {
        sunrise: string,
        sunset: string,
        moonrise: string,
        moonset: string,
        moon_phase: string,
        moon_illumination: number,
        is_moon_up: boolean,
        is_sun_up: boolean
    }
    hour: forecastDayHour[]
}

interface forecastDayHour {
    time_epoch: number,
    time: Date,
    temp_c: number,
    temp_f: number,
    is_day: boolean,
    condition: {
        text: string,
        icon: string,
        code: number,
    }
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    will_it_rain: number;
    chance_of_snow: number;
}

export default async function Home() {
    const geoRequest = await fetch('https://ipapi.co/json/');
    const geoData = await geoRequest.json();
    const { country, city } = geoData;
    const cityNormalized = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let weather: WeatherData | null = null;
    const weatherRequest = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${cityNormalized}&aqi=no&days=7`);
    const weatherData = await weatherRequest.json();
    if (!weatherData) return "";
    weather = weatherData;

    const todayForecastData = weather?.forecast.forecastday[0]?.hour.map(hourData => ({
        x: new Date(hourData.time).getHours(),
        y: Math.round(hourData.temp_c)
    })) || [];

    const forecastData = [
        { id: "Today's Temperature", color: "hsl(194, 70%, 50%)", data: todayForecastData }
    ];

    const url = new URL("https://nameday.abalin.net/api/V1/today");
    url.searchParams.append("country", country.toLowerCase());

    const fetchHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    const requestOptions: RequestInit = {
        method: "GET",
        headers: fetchHeaders,
    };

    let nameDay = "";
    const nameDayRequest = await fetch(url, requestOptions);
    const nameDayData = await nameDayRequest.json();
    if (nameDayData) {
        nameDay = nameDayData.nameday[country.toLowerCase()] || "";
    }

    return (
        <main className="flex h-screen w-screen p-24 flex-col items-center justify-between bg-cover bg-no-repeat bg-opacity-75 bg-[url('https://static.vecteezy.com/system/resources/previews/021/739/427/original/simple-and-cool-3d-abstract-background-design-suitable-for-pc-backgrounds-and-others-vector.jpg')]">
            <div className="grid grid-rows-3 grid-cols-5 w-full h-full gap-4">
                <div className="row-span-1 col-span-1 bg-base-100 p-8 rounded-lg">
                    <h1>Welcome to the IGPortals Dashboard.</h1>
                </div>

                <div className="row-span-1 col-span-1 grid gap-4 grid-cols-3 grid-rows-2">
                    {weather && (
                        weather.forecast.forecastday.map((day: forecastDay, index: number) => {
                            if (index === 0) {
                                return ""
                            }
                            // Calculate the day of the week for each forecast day
                            const today = new Date();
                            const forecastDate = new Date();
                            forecastDate.setDate(today.getDate() + index);
                            const dayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][forecastDate.getDay()];

                            return (
                                <div className="row-span-1 col-span-1 bg-base-100 rounded-lg flex flex-col justify-center items-center text-center p-2">
                                    <span>{dayOfWeek}</span>
                                    <Image alt={day.day.condition.text}
                                           src={"https:" + day.day.condition.icon}
                                           height={40}
                                           width={40}/>
                                    <span>{day.day.avgtemp_c} °C</span>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="row-span-1 col-span-1 grid gap-4 grid-cols-2 grid-rows-2">
                    <div
                        className='row-span-1 col-span-2 bg-base-100 rounded-lg flex flex-col justify-center items-center text-center p-4'>
                        <span>{city}</span>
                        <span>{nameDay}</span>
                        <CurrentTime />
                    </div>
                    <div
                        className='row-span-1 col-span-1 bg-base-100 rounded-lg flex justify-center items-center text-center p-2'>
                        {weather && (
                            <div className="flex flex-col justify-between h-full items-center">
                                <Image alt={weather.current.condition.text}
                                       src={"https:" + weather.current.condition.icon} height={70} width={70}/>
                                <span>{weather.current.condition.text} {weather.current.temp_c} °C</span>
                            </div>
                        )}
                    </div>
                    <div
                        className='row-span-1 col-span-1 bg-base-100 rounded-lg flex justify-center items-center text-center p-2'>
                        {weather && (
                            <div className="flex flex-col justify-between h-full items-center">
                                <svg fill="#000000" height="70px" width="70px" version="1.1" id="wind-arrow" style={{ transform: `rotate(${weather.current.wind_degree}deg)` }}
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.492 476.492">
                                    <polygon
                                        points="374.785,136.54 238.246,0 101.707,136.54 223.246,136.54 223.246,476.492 253.246,476.492 253.246,136.54 "/>
                                </svg>
                                <span>{weather.current.wind_kph} km/h</span>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className='row-span-1 col-span-2 bg-base-100 rounded-lg flex flex-col gap-2 justify-center items-center text-center p-4'>
                    <h2>Temperature Today</h2>
                    <TemperatureGraph forecastData={forecastData} />

                </div>
            </div>
        </main>
    );
}
