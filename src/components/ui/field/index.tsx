import { PropsWithChildren } from "react";

import { Grid, Stack, StackProps, Typography } from "@mui/material";

interface Props
  extends Omit<StackProps, "component" | "direction">,
    PropsWithChildren {
  label: string;
  component?: "grid" | "stack";
  direction?: "vertical" | "horizontal";
  showColon?: true;
}

export const Field = ({
  label,
  children,
  component = "stack",
  direction = "vertical",
  showColon,
  ...otherProps
}: Props) => {
  if (component == "grid") {
    return (
      <Grid item xs={1} {...otherProps}>
        <FieldContent label={label} direction={direction} showColon={showColon}>
          {children}
        </FieldContent>
      </Grid>
    );
  }

  return (
    <Stack {...otherProps}>
      <FieldContent label={label} direction={direction} showColon={showColon}>
        {children}
      </FieldContent>
    </Stack>
  );
};

const FieldContent = ({
  label,
  children,
  direction,
  showColon
}: Omit<Props, "component">) => {
  return (
    <Stack
      {...(direction == "horizontal" && {
        direction: "row",
        alignItems: "center",
        gap: 1
      })}
    >
      <Typography variant="h4">
        {label}
        {showColon && ":"}
      </Typography>
      {children}
    </Stack>
  );
};
