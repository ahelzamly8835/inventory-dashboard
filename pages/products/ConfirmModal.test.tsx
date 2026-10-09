import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmModal from "./ConfirmModal";

const baseProps = {
    open: true,
    title: "Delete product",
    message: "Are you sure?",
    confirmLabel: "Delete",
    onConfirm: () => { },
    onCancel: () => { },
};

describe("ConfirmModal", () => {
    it("renders nothing when closed", () => {
        render(<ConfirmModal {...baseProps} open={false} />);

        expect(screen.queryByText("Delete product")).not.toBeInTheDocument();
    });

    it("shows the title and message when open", () => {
        render(<ConfirmModal {...baseProps} />);

        expect(screen.getByText("Delete product")).toBeInTheDocument();
        expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    });

    it("calls onConfirm when the confirm button is clicked", async () => {
        const onConfirm = vi.fn();
        render(<ConfirmModal {...baseProps} onConfirm={onConfirm} />);

        await userEvent.click(screen.getByRole("button", { name: "Delete" }));

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it("calls onCancel when Cancel is clicked", async () => {
        const onCancel = vi.fn();
        render(<ConfirmModal {...baseProps} onCancel={onCancel} />);

        await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("disables both buttons while loading", () => {
        render(<ConfirmModal {...baseProps} loading />);

        expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Deleting..." })).toBeDisabled();
    });
});