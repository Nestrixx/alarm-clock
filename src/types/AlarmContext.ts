export type AlarmContext = {
  alarms: Array<Alarm>;
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
};

export type Alarm = {
  alarm: string;
  name?: string;
  isReoccurring?: boolean;
};
