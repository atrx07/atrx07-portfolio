import { fireEvent, render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("exposes copy feedback supplied by the parent state", () => {
    const onCopyEmail = vi.fn();
    const { rerender } = render(<Contact copied={false} onCopyEmail={onCopyEmail} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
    expect(onCopyEmail).toHaveBeenCalledOnce();

    rerender(<Contact copied onCopyEmail={onCopyEmail} />);
    expect(screen.getByRole("button", { name: "Email copied" })).toBeInTheDocument();
  });
});
