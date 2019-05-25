import React, { Fragment, FC, ReactElement, ReactNode } from "react";
import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { Dialog, DialogContent } from "@react-md/dialog";
import { TextIconSpacing } from "@react-md/icon";
import { CloseSVGIcon, LaunchSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";

import AppBarAction from "components/AppBarAction";

export interface FullPageDemoProps {
  id: string;
  title?: ReactNode;
  children: ReactElement;
  disabled?: boolean;
  disableAppBar?: boolean;
  disableContent?: boolean;
}

const FullPageDemo: FC<FullPageDemoProps> = ({
  id,
  title,
  children,
  disabled,
  disableAppBar,
  disableContent,
}) => {
  const { toggled, enable, disable } = useToggle();
  if (disabled) {
    return children;
  }

  return (
    <Fragment>
      <Text type="headline-6">
        This example requires a more screen real estate than what is available
        so you will need to open it in a full page dialog.
      </Text>
      <Button id={`${id}-toggle`} themeType="contained" onClick={enable}>
        <TextIconSpacing icon={<LaunchSVGIcon />}>Launch</TextIconSpacing>
      </Button>
      <Dialog
        id={`${id}-dialog`}
        aria-labelledby={`${id}-dialog-title`}
        visible={toggled}
        onRequestClose={disable}
        type="full-page"
      >
        {!disableAppBar && (
          <AppBar>
            <AppBarTitle keyline id={`${id}-dialog-title`}>
              {title}
            </AppBarTitle>
            <AppBarAction
              id={`${id}-dialog-close`}
              first
              aria-label="Close"
              onClick={disable}
            >
              <CloseSVGIcon />
            </AppBarAction>
          </AppBar>
        )}
        {disableContent ? (
          children
        ) : (
          <DialogContent disablePadding>{children}</DialogContent>
        )}
      </Dialog>
    </Fragment>
  );
};

FullPageDemo.defaultProps = {
  title: "Demo",
};

export default FullPageDemo;
