import { render, screen } from "@testing-library/react";
import Login from "../Login";
import { inputOnChange } from "../../__test_helpers__/jsDomHelpers";
import { act } from "react-dom/test-utils";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// const getFields = ()=>({
//     userName : screen.getByRole("login", {name: /userName/i}),
//     password : screen.getByRole("login", {name: /password/i})
// })

describe("check Login file render or not",()=>{
  test("check render or not component", () => {
    render(<Login/>);
    expect(screen.getByRole("login")).toBeInTheDocument();
  });
  
})
