import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Greeting } from "./Greeting";

describe("Greeting component", () => {
  test("render Hello world as a test", () => {
    //Arrange(also known as setup stage)
    render(<Greeting />);

    //Action
    //we are not performing it now.

    //Assert
    const hellWorldElement = screen.getByText("Hello World!", { exact: true }); // true is the default value for exact property
    expect(hellWorldElement).toBeInTheDocument();
  });

  test('render "good to see u" when the button is not clicked', () => {
    //Arrange
    render(<Greeting />);

    //Action

    //Assert
    const outputElement = screen.getByText("good to see u", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });
  test('render "Change!" when the button is  clicked', async () => {
    //Arrange
    render(<Greeting />);

    //Action
    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);

    //Assert
    const outputElement = screen.getByText("Changed!"); // find the element in the dom with the text "Change!"
    expect(outputElement).toBeInTheDocument(); // check if outputElement is part of the DOM
  });
  test("does not render 'good to see u' when the button is clicked", async () => {
    //Arrange
    render(<Greeting />);

    //Action
    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);

    //Assert
    const outputElement = screen.queryByText("good to see u"); // find the element in the dom with the text "Change!"
    expect(outputElement).not.toBeInTheDocument(); // check if outputElement is part of the DOM
  });
});

//a suite is a group of test under one umbrella. we use the describe() function to define a suite
