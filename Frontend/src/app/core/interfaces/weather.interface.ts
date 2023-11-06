export interface Weather {
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
  };
}

export interface Forecast {
  DailyForecasts: {
    Temperature: {
      Minimum: {
        Value: number;
        Unit: string;
      };
      Maximum: {
        Value: number;
        Unit: string;
      };
    };
  }[];
}

export interface ForecastHour {
  Temperature: {
    Value: number;
    Unit: string;
  };
}
