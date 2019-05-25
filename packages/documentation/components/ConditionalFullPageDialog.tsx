import React, { Fragment, FC, ReactElement, ReactNode } from "react";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { Dialog, DialogContent } from "@react-md/dialog";
import { TextIconSpacing } from "@react-md/icon";
import { CloseSVGIcon, LaunchSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";

export interface ConditionalFullPageDialogProps {
  id: string;
  title?: ReactNode;
  children: ReactElement;
  enable: () => void;
  disable: () => void;
  visible: boolean;
  disabled?: boolean;
  disableAppBar?: boolean;
  disableContent?: boolean;
}

type DefaultProps = Required<
  Pick<
    ConditionalFullPageDialogProps,
    "title" | "disabled" | "disableAppBar" | "disableContent"
  >
>;
type WithDefaultProps = ConditionalFullPageDialogProps & DefaultProps;

const ConditionalFullPageDialog: FC<
  ConditionalFullPageDialogProps
> = providedProps => {
  const {
    id,
    title,
    children,
    enable,
    disable,
    visible,
    disabled,
    disableAppBar,
    disableContent,
  } = providedProps as WithDefaultProps;
  if (disabled) {
    return children;
  }

  return (
    <Fragment>
      <Text type="headline-6">
        This example requires a more screen real estate than what is available
        so you will need to open it in a full page dialog.
      </Text>
      <Button id={`${id}-dialog-toggle`} themeType="contained" onClick={enable}>
        <TextIconSpacing icon={<LaunchSVGIcon />}>Launch</TextIconSpacing>
      </Button>
      <Dialog
        id={`${id}-dialog`}
        aria-labelledby={`${id}-dialog-title`}
        visible={visible}
        onRequestClose={disable}
        type="full-page"
      >
        {!disableAppBar && (
          <AppBar>
            <AppBarTitle keyline id={`${id}-dialog-title`}>
              {title}
            </AppBarTitle>
            <AppBarAction first aria-label="Close" onClick={disable}>
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

const defaultProps: DefaultProps = {
  title: "Full Page Demo",
  disabled: false,
  disableAppBar: false,
  disableContent: false,
};

ConditionalFullPageDialog.defaultProps = defaultProps;

export default ConditionalFullPageDialog;
