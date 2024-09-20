import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Landing from "./Landing";

describe("<Landing />", () => {
  it("displays title", () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect.assertions(1);
  });
});
