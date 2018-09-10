import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@react-md/link";
import { LinkSVGIcon } from "@react-md/material-icons";

import { ISassDoc, SassDocType } from "types/sassdoc";
import SassDocTitle from "./SassDocTitle";
import ExpandableSource from "./ExpandableSource";
import Description from "./Description";
import Type from "./Type";
import Parameters from "./Parameters";
import ReferenceList from "./ReferenceList";
import Links from "./Links";
import Throws from "./Throws";
import Examples from "./Examples";

export interface ISectionProps {
  sassdoc: ISassDoc;
  type: SassDocType;
}

export type SectionType = "variable" | "function" | "mixin";

const Section: React.SFC<ISectionProps> = ({ sassdoc, type }) => {
  let { code = "" } = sassdoc;
  const { type: sassdocType, name, description, parameters, requires, usedBy, links, see, throws, examples } = sassdoc;
  if (code) {
    code = `\`\`\`scss
${code}
\`\`\``;
  }

  const id = `${type}-${name}`;
  return (
    <React.Fragment>
      <SassDocTitle id={id} type="headline-3" className="sassdoc__name">
        {name}
        <Type>{sassdocType}</Type>
        <Link to={`#${id}`} component={RouterLink} className="sassdoc__quick-link">
          <LinkSVGIcon title={`Quick Link to ${name}`} />
        </Link>
      </SassDocTitle>
      <ExpandableSource linkId={id} code={code} />
      <Description>{description}</Description>
      <Parameters parameters={parameters} />
      <Throws throws={throws} />
      <Examples examples={examples} />
      <ReferenceList list={see}>Other References</ReferenceList>
      <Links links={links} />
      <ReferenceList list={requires}>Requires</ReferenceList>
      <ReferenceList list={usedBy}>Used By</ReferenceList>
    </React.Fragment>
  );
};

export default Section;
