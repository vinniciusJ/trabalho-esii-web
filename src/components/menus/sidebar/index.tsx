import { ToggleButton } from "@mui/material";
import { useAtomValue } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";

import { isSidebarCollapsedAtom } from "@/atoms/sidebar";
import { SidebarContainer, StyledToggleButtonGroup } from "./style";
import { Event, EventNote, Groups, ManageAccounts } from "@mui/icons-material";
import { useAuth } from "@/hooks/use-auth";

export const Sidebar = () => {
  const { user } = useAuth();
  const isCollapsed = useAtomValue(isSidebarCollapsedAtom);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (_e: unknown, value: string) => {
    if (value === null) {
      navigate(`/${pathname.split("/")[1]}`);
    } else {
      navigate(`/${value}`);
    }
  };

  return (
    <SidebarContainer iscollapsed={isCollapsed ? 1 : 0}>
      <StyledToggleButtonGroup
        orientation="vertical"
        exclusive
        fullWidth
        value={pathname.split("/")[1]}
        onChange={handleChange}
      >
        <ToggleButton value="events">
          <Event />
          {!isCollapsed && "Eventos"}
        </ToggleButton>
        {user?.personRole != "ROLE_EVENT_PARTICIPANT" && (
          <ToggleButton value="event-types">
            <EventNote />
            {!isCollapsed && "Tipos de evento"}
          </ToggleButton>
        )}
        {user?.personRole != "ROLE_EVENT_PARTICIPANT" && (
          <ToggleButton value="participants">
            <Groups />
            {!isCollapsed && "Participantes"}
          </ToggleButton>
        )}
        {user?.personRole == "ROLE_ADMIN" && (
          <ToggleButton value="managers">
            <ManageAccounts />
            {!isCollapsed && "Gerentes"}
          </ToggleButton>
        )}
      </StyledToggleButtonGroup>
    </SidebarContainer>
  );
};
