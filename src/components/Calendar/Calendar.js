import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const currentDate = new Date();
  const [dateList, setDateList] = useState([]);
  const [range, setRange] = useState({ clickCount: 0, start: null, end: null });

  const handleClick = (index) => {
    if (range.clickCount === 2) return;
    if (range.clickCount === 0) {
      setRange({ ...range, clickCount: 1, start: index });
      return;
    }
    if (range.clickCount === 1 && index >= range.start) {
      setRange({ ...range, clickCount: 2, end: index });
      return;
    }
    setRange({ clickCount: 0, start: null, end: null });
  };

  useEffect(() => {
    let list = [];
    let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    date.setDate(date.getDate() - date.getDay());
    while (date.getMonth() < currentDate.getMonth()) {
      list.push({
        index: list.length,
        day: date.getDate(),
        month: date.getMonth(),
        id: date,
        selected: false,
        today: false,
      });
      date.setDate(date.getDate() + 1);
    }
    while (date.getMonth() === currentDate.getMonth()) {
      list.push({
        index: list.length,
        day: date.getDate(),
        month: date.getMonth(),
        id: date,
        selected:
          typeof range.start === 'number' &&
          typeof range.end === 'number' &&
          list.length >= range.start &&
          list.length <= range.end,
        today: date.getDate() === currentDate.getDate(),
      });
      date.setDate(date.getDate() + 1);
    }
    while (date.getDay() > 0) {
      list.push({
        index: list.length,
        day: date.getDate(),
        month: date.getMonth(),
        id: date,
        selected: false,
        today: false,
      });
      date.setDate(date.getDate() + 1);
    }
    setDateList(list);
  }, [range]);

  return (
    <div className="root">
      <div className="title">
        <div>{'<'}</div>
        {`${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`}
        <div>{'>'}</div>
      </div>
      <div className="calendar-wrapper">
        {dateList.map((date) => (
          <button
            key={date.index}
            className={`${date.selected ? 'day selected-day' : 'day'}`}
            disabled={date.month !== currentDate.getMonth()}
            onClick={() => handleClick(date.index)}
          >{`${date.day}日`}</button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
