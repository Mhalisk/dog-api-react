import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app and home component", () => {
  render(<App />);
  const pageTitle = screen.getByText(/Dog API/i);
  const subTitle = screen.getByText(/Implementation by Michael Halisky/i);
  expect(pageTitle).toBeInTheDocument();
  expect(subTitle).toBeInTheDocument();
});
