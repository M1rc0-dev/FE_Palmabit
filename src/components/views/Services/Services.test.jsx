import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Services from "./Services";
import { getServices } from "utils/services";

jest.mock("utils/services", () => ({
  getServices: jest.fn(),
}));

describe("<Services />", () => {
  const mockServices = [
    { id: 1, serviceName: "Synthetic Oil Change", serviceDuration: 3600 },
    { id: 2, serviceName: "Tire Rotation & Inspection", serviceDuration: 1800 },
  ];

  beforeEach(() => {
    getServices.mockResolvedValue(mockServices);
  });

  it("displays the title", () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Select a service");
  });

  it("fetches and displays services from API", async () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Synthetic Oil Change")).toBeInTheDocument();
      expect(
        screen.getByText("Tire Rotation & Inspection")
      ).toBeInTheDocument();
    });
  });
});
