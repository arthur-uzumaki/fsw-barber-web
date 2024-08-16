import { Calendar as RWCalendar, CalendarProps } from '@/components/ui/calendar'
export function Calendar({ ...rest }: CalendarProps) {
  return (
    <RWCalendar
      fromDate={new Date()}
      styles={{
        head_cell: {
          width: '100%',
          textTransform: 'capitalize',
        },
        cell: {
          width: '100%',
        },
        button: {
          width: '100%',
        },
        nav_button_previous: {
          width: '32px',
          height: '32px',
        },
        nav_button_next: {
          width: '32px',
          height: '32px',
        },
        caption: {
          textTransform: 'capitalize',
        },
      }}
      {...rest}
    />
  )
}
