import { render, screen } from "@testing-library/react";
import App from "./App";

describe("check App file render or not",()=>{
  test("renders learn react link", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Log in" })).toBeEnabled();
    expect(screen.getByRole("login")).toBeInTheDocument();
  });
  
})
