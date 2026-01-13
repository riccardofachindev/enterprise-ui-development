// @vitest-environment happy-dom

import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { renderComponent } from './test/utilities';

test('it should render the component', () => {
  renderComponent(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  // const user = userEvent.setup();

  const { user } = renderComponent(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');

  const button = screen.getByRole('button', { name: 'Increment' });
  // fireEvent.click(button);
  await user.click(button);

  expect(currentCount).toHaveTextContent('1');
});

test('it should increment when the initial value is more than zero', async () => {
  let initialValue = 1;
  const { user } = renderComponent(<Counter initialCount={initialValue} />);

  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent(initialValue.toString());

  initialValue++;

  const button = screen.getByRole('button', { name: 'Increment' });
  await user.click(button);

  expect(currentCount).toHaveTextContent(initialValue.toString());
});

test('it should reset to 0 when the reset button is pressed', async () => {
  let initialValue = 1;
  const { user } = renderComponent(<Counter initialCount={initialValue} />);

  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent(initialValue.toString());

  const resetButton = screen.getByRole('button', { name: 'Reset' });
  await user.click(resetButton);

  expect(currentCount).toHaveTextContent('0');
});
