import React, { forwardRef, Fragment, FunctionComponent } from "react";
import { WithForwardedRef } from "@react-md/utils";

import GoogleFont from "components/GoogleFont";
import CodeBlock, { CodeBlockProps } from "./CodeBlock";

type WithRef = WithForwardedRef<HTMLPreElement>;

const InternalCodeBlock: FunctionComponent<CodeBlockProps & WithRef> = ({
  forwardedRef,
  ...props
}) => {
  return (
    <Fragment>
      <GoogleFont font="Source Code Pro" />
      <CodeBlock ref={forwardedRef} {...props} />
    </Fragment>
  );
};

export default forwardRef<HTMLPreElement, CodeBlockProps>((props, ref) => (
  <InternalCodeBlock {...props} forwardedRef={ref} />
));
