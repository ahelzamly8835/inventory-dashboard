import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { supabase } from "../../src/lib/supabase";
import LogIn from "./LogIn";

const navigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigate,
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("../../src/lib/supabase", () => ({
  supabase: { auth: { signInWithPassword: vi.fn() } },
}));

const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);

async function fillAndSubmit() {
  await userEvent.type(screen.getByPlaceholderText("Omar@example.com"), "a@b.com");
  await userEvent.type(screen.getByPlaceholderText("********"), "secret123");
  await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
}

describe("LogIn page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends the typed email and password to Supabase", async () => {
    mockSignIn.mockResolvedValue({ data: {}, error: null } as never);
    render(<LogIn />);

    await fillAndSubmit();

    expect(mockSignIn).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "secret123",
    });
  });

  it("shows an error and stays on the page when login fails", async () => {
    mockSignIn.mockResolvedValue({
      data: {},
      error: { message: "Invalid login credentials" },
    } as never);
    render(<LogIn />);

    await fillAndSubmit();

    expect(toast.error).toHaveBeenCalledWith("Invalid login credentials");
    expect(navigate).not.toHaveBeenCalled();
  });

  it("navigates to the dashboard when login succeeds", async () => {
    mockSignIn.mockResolvedValue({ data: {}, error: null } as never);
    render(<LogIn />);

    await fillAndSubmit();

    expect(toast.success).toHaveBeenCalledWith("Logged in successfully");
    expect(navigate).toHaveBeenCalledWith("/dashboard");
  });
});