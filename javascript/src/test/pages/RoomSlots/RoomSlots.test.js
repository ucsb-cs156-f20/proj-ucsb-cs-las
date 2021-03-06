import React from "react";
import { render, waitFor } from "@testing-library/react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import RoomSlots from "main/pages/RoomSlots/RoomSlots";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";

jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/utils/fetch");

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}) );

describe("RoomSlots page test", () => {
  const roomSlotList = [
    {
      id: 1,
      location: "Library",
      quarter: "S21",
      dayOfWeek: "Monday",
      startTime: "08:00:00",
      endTime: "08:50:00",
    },
    {
      id: 2,
      location: "Phelps 1440",
      quarter: "S21",
      dayOfWeek: "Tuesday",
      startTime: "15:00:00",
      endTime: "15:50:00",
    },
  ];

  const user = {
    name: "test user",
  };

  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });

    useSWR.mockImplementation((key, _getter) => {
      if (key[0] === "/api/public/roomslot") {
        return {
          data: roomSlotList,
          error: undefined,
          mutate: mutateSpy,
        };
      } else {
        return {
          data: {
            user: "test user",
            role: "admin"
          }
        }
      }
    });
  });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("renders without crashing", () => {
      render(<RoomSlots />);
    });

    test("renders loading while room slots list is undefined", () => {
      useSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        mutate: mutateSpy,
      });
      const { getByAltText } = render(<RoomSlots />);
      const loading = getByAltText("Loading");
      expect(loading).toBeInTheDocument();
    });

    test("renders an error message when there is an error", () => {
      useSWR.mockReturnValue({
        data: undefined,
        error: new Error("this is an error"),
        mutate: mutateSpy,
      });
      const { getByText } = render(<RoomSlots />);
      const error = getByText(/error/);
      expect(error).toBeInTheDocument();
    });

    test("renders new room slot button when admin", async () => {
      const pushSpy = jest.fn();
      useHistory.mockReturnValue({
        push: pushSpy
      });

      const { getByText } = render(<RoomSlots />);
      const newRoomSlotButton = getByText("New Room Slot");
      expect(newRoomSlotButton).toBeInTheDocument();
      userEvent.click(newRoomSlotButton);

      await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    });
});