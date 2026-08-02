import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { MagicTab, type MagicTabItem } from "./magic-tab";

const items: MagicTabItem[] = [
  { value: "recruiter", label: "recruiter" },
  { value: "developer", label: "developer" },
  { value: "chaos", label: "chaos" },
];

function ControlledTabs() {
  const [value, setValue] = useState("recruiter");
  return <MagicTab items={items} value={value} onValueChange={setValue} rainbow />;
}

describe("MagicTab", () => {
  it("updates a controlled selection and exposes the bundled rainbow contract", async () => {
    const user = userEvent.setup();
    render(<ControlledTabs />);

    const tablist = screen.getByRole("tablist");
    const recruiter = screen.getByRole("tab", { name: "recruiter" });
    const chaos = screen.getByRole("tab", { name: "chaos" });

    expect(tablist).toHaveAttribute("data-rainbow", "true");
    expect(recruiter).toHaveAttribute("aria-selected", "true");

    await user.click(chaos);

    expect(chaos).toHaveAttribute("aria-selected", "true");
    expect(chaos).toHaveAttribute("data-selected", "true");
    expect(recruiter).toHaveAttribute("aria-selected", "false");
  });

  it("moves focus manually and waits for Enter before selecting", () => {
    const onValueChange = vi.fn();
    render(<MagicTab items={items} value="recruiter" onValueChange={onValueChange} />);

    const tablist = screen.getByRole("tablist");
    const recruiter = screen.getByRole("tab", { name: "recruiter" });
    const developer = screen.getByRole("tab", { name: "developer" });
    recruiter.focus();

    fireEvent.keyDown(tablist, { key: "ArrowRight" });
    expect(developer).toHaveFocus();
    expect(onValueChange).not.toHaveBeenCalled();

    fireEvent.keyDown(tablist, { key: "Enter" });
    expect(onValueChange).toHaveBeenCalledWith("developer");
  });

  it("connects tabs to a controlled panel when a panel id is supplied", () => {
    render(<MagicTab items={items} panelId="mode-panel" defaultValue="recruiter" />);

    expect(screen.getByRole("tab", { name: "recruiter" })).toHaveAttribute(
      "aria-controls",
      "mode-panel",
    );
  });

  it("skips disabled tabs during roving focus", () => {
    render(
      <MagicTab
        items={items.map((item) => ({ ...item, disabled: item.value === "developer" }))}
        defaultValue="recruiter"
      />,
    );

    const tablist = screen.getByRole("tablist");
    const recruiter = screen.getByRole("tab", { name: "recruiter" });
    const chaos = screen.getByRole("tab", { name: "chaos" });
    recruiter.focus();

    fireEvent.keyDown(tablist, { key: "ArrowRight" });
    expect(chaos).toHaveFocus();
  });
});
