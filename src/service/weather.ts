
 const getGeoLocation = async (city:string) => {
    const baseURL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(baseURL+
        `data/2.5/weather?unit=metric&q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}`
      );
      const data = await response.json();

      if(data.cod === "404"){
        throw Error(data.message);
      }
      return {success:true,data:data,error:null}
     
    } catch (error: any) {
      return {success:false,data:null,error:error}
    }
  };



  export const weatherService = {
    getGeoLocation,
  }