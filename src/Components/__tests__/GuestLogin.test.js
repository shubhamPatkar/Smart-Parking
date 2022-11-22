import { render, screen } from '@testing-library/react';
import GuestLogin from '../GuestLogin';
import { inputOnChange } from '../../__test_helpers__/jsDomHelpers';
import { act } from 'react-dom/test-utils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));



describe("check geustLogin file render or not",()=>{
  test('check render or not component', () => {
    render(<GuestLogin/>);
    expect(screen.getByRole("guestLogin")).toBeInTheDocument();
  });
 
})
