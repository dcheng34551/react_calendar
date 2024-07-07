import React, { useState, useEffect, useCallback } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [dateListObject, setDateListObject] = useState({});
  const [range, setRange] = useState({ clickCount: 0, start: null, end: null });

  const handleDateClick = (index) => {
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

  const generateDateList = useCallback(() => {
    const currentDate = new Date();
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
        disabled: true,
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
        disabled: false,
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
        disabled: true,
      });
      date.setDate(date.getDate() + 1);
    }
    return {
      title: `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`,
      list: list,
    };
  }, [range]);

  useEffect(() => {
    setDateListObject(generateDateList());
  }, [generateDateList]);

  return (
    <div className="root">
      <div className="title">
        <div>{'<'}</div>
        {dateListObject.title}
        <div>{'>'}</div>
      </div>
      <div className="calendar-wrapper">
        {dateListObject?.list?.map((date) => (
          <button
            key={date.index}
            className={`${date.selected ? 'day selected-day' : 'day'}`}
            disabled={date.disabled}
            onClick={() => handleDateClick(date.index)}
          >
            {`${date.day}日`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
