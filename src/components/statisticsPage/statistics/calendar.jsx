import React from 'react'
import { ResponsiveCalendar } from 'nivo/lib/components/charts/calendar'

const Calendar = ({ data }) => (
    <ResponsiveCalendar
        data={data}
        from="2023-07-01"
        to="2023-10-01"
        emptyColor="#eeeeee"
        colors={['#00296B', '#003F88', '#00509D', '#FFD500']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
)

export default Calendar