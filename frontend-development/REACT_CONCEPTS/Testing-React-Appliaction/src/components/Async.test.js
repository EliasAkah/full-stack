import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("render if list of items exist", async () => {
    //creating a mock fetch function to avoid making an actual network
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First Post" }],
    });
    //Arrange(also known as setup stage)
    render(<Async />);

    //Action
    //we are not performing it now.

    //Assert
    const listItemElements = await screen.findAllByRole("listitem"); // finds element that contains list of items
    expect(listItemElements).not.toHaveLength(0);
  });
});
