import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { inputOnChange } from "../../__test_helpers__/jsDomHelpers";
import { act } from "react-dom/test-utils";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const mockedUsedLocation = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockedUsedLocation,
}));

describe("check dashboard file render or not",()=>{
  test("check render or not component", () => {
    render(<Dashboard/>);
    expect(screen.getByRole("dashboard")).toBeInTheDocument();
  });
 
})
