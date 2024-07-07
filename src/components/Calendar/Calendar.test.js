import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar component', () => {
  test('highlights the selected date after click the same date for start date and end date', () => {
    render(<Calendar />);
    const startDate = screen.getByText('15日');
    const endDate = screen.getByText('15日');

    fireEvent.click(startDate);
    fireEvent.click(endDate);

    expect(startDate).toHaveClass('day selected-day');
  });

  test('highlights the selected date range', () => {
    render(<Calendar />);
    const startDate = screen.getByText('14日');
    const middleDate = screen.getByText('15日');
    const endDate = screen.getByText('16日');

    fireEvent.click(startDate);
    fireEvent.click(endDate);

    expect(startDate).toHaveClass('day selected-day');
    expect(middleDate).toHaveClass('day selected-day');
    expect(endDate).toHaveClass('day selected-day');
  });

  test('resets start date if a date earlier than the start date is clicked', () => {
    render(<Calendar />);
    const startDate = screen.getByText('14日');
    const earlierDate = screen.getByText('13日');

    fireEvent.click(startDate);
    fireEvent.click(earlierDate);

    expect(startDate).not.toHaveClass('day selected-day');
    expect(earlierDate).not.toHaveClass('day selected-day');
  });
});
