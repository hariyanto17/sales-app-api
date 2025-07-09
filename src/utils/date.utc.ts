interface DateUtc {
  date: string | Date;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export const dateUtc = ({
  date,
  hours,
  minutes,
  seconds,
  milliseconds,
}: DateUtc): Date => {
  const localDate = new Date(date);

  const year = localDate.getUTCFullYear();
  const month = localDate.getUTCMonth();
  const day = localDate.getUTCDate();

  return new Date(
    Date.UTC(
      year,
      month,
      day,
      hours || 0,
      minutes || 0,
      seconds || 0,
      milliseconds || 0
    )
  );
};
