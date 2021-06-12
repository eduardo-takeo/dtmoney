import { render, screen } from "@testing-library/react";

import { Header } from ".";

describe("Header component", () => {
  it("should render correctly", () => {
    render(<Header openModal={() => {}} />);
    const headerImage = screen.getByRole("img", { name: /dt money/i });
    const headerButton = screen.getByRole("button", {
      name: /nova transação/i,
    });

    expect(headerButton).toBeTruthy();
    expect(headerImage).toBeTruthy();
  });
});
