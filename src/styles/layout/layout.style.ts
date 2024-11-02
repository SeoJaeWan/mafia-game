import styled from "styled-components";

export interface ILayoutStyleProps {
  $position?: "relative" | "absolute" | "fixed" | "sticky";
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;

  $display?: "flex" | "block" | "inline-block";
  $flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  $justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
  $alignItems?: "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  $flexWrap?: "nowrap" | "wrap" | "wrap-reverse";

  $width?: string;
  $height?: string;
  $maxWidth?: string;
  $maxHeight?: string;
  $minWidth?: string;
  $minHeight?: string;

  $margin?: string;
  $marginTop?: string;
  $marginBottom?: string;
  $marginLeft?: string;
  $marginRight?: string;

  $padding?: string;
  $paddingTop?: string;
  $paddingBottom?: string;
  $paddingLeft?: string;
  $paddingRight?: string;

  $border?: string;
  $borderTop?: string;
  $borderBottom?: string;
  $borderLeft?: string;
  $borderRight?: string;

  $borderRadius?: string;
  $boxShadow?: string;
  $background?: string;

  $overflow?: "visible" | "hidden" | "scroll" | "auto";
  $transform?: string;
  $transition?: string;
}

const LayoutStyle = styled.div<ILayoutStyleProps>`
  position: ${(props) => props.$position || "static"};
  top: ${(props) => props.$top || "auto"};
  bottom: ${(props) => props.$bottom || "auto"};
  left: ${(props) => props.$left || "auto"};
  right: ${(props) => props.$right || "auto"};

  display: ${(props) => props.$display || "block"};
  flex-direction: ${(props) => props.$flexDirection || "row"};
  justify-content: ${(props) => props.$justifyContent || "flex-start"};
  align-items: ${(props) => props.$alignItems || "stretch"};
  flex-wrap: ${(props) => props.$flexWrap || "nowrap"};

  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
  max-width: ${(props) => props.$maxWidth || "none"};
  max-height: ${(props) => props.$maxHeight || "none"};
  min-width: ${(props) => props.$minWidth || "none"};
  min-height: ${(props) => props.$minHeight || "none"};

  margin: ${(props) => props.$margin || "0"};
  margin-top: ${(props) => props.$marginTop || "0"};
  margin-bottom: ${(props) => props.$marginBottom || "0"};
  margin-left: ${(props) => props.$marginLeft || "0"};
  margin-right: ${(props) => props.$marginRight || "0"};

  padding: ${(props) => props.$padding || "0"};
  padding-top: ${(props) => props.$paddingTop || "0"};
  padding-bottom: ${(props) => props.$paddingBottom || "0"};
  padding-left: ${(props) => props.$paddingLeft || "0"};
  padding-right: ${(props) => props.$paddingRight || "0"};

  border: ${(props) => props.$border || "none"};
  border-top: ${(props) => props.$borderTop || "none"};
  border-bottom: ${(props) => props.$borderBottom || "none"};
  border-left: ${(props) => props.$borderLeft || "none"};
  border-right: ${(props) => props.$borderRight || "none"};

  border-radius: ${(props) => props.$borderRadius || "0"};
  box-shadow: ${(props) => props.$boxShadow || "none"};
  background: ${(props) => props.$background || "transparent"};

  overflow: ${(props) => props.$overflow || "visible"};
  transform: ${(props) => props.$transform || "none"};
  transition: ${(props) => props.$transition || "none"};
`;

export default LayoutStyle;
