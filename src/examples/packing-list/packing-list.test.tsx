import { render, screen, waitFor } from 'test/utilities';
import PackingList from '.';
import userEvent from '@testing-library/user-event';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');
  const button = screen.getByRole('button', { name: 'Add New Item' });

  expect(input).toHaveTextContent('');
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const user = userEvent.setup();
  render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');
  const button = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(input, 'Phone');
  expect(button).toBeEnabled();
});

it.todo(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
    const user = userEvent.setup();
    render(<PackingList />);

    const input = screen.getByLabelText('New Item Name');
    const button = screen.getByRole('button', { name: 'Add New Item' });

    await user.type(input, 'Phone');
    await user.click(button);

    expect(screen.getByLabelText('Phone')).not.toBeChecked();
  },
);

it.todo('remove an item', async () => {
  const user = userEvent.setup();
  render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');
  const button = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(input, 'Phone');
  await user.click(button);

  const removeItem = screen.getByLabelText(/remove/i);

  await user.click(removeItem);

  await waitFor(() => expect(removeItem).not.toBeInTheDocument());
});
