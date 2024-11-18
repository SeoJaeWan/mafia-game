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
  $gap?: string;

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
  ${(props) => props.$position && `position: ${props.$position};`}
  ${(props) => props.$top && `top: ${props.$top};`}
${(props) => props.$bottom && `bottom: ${props.$bottom};`}
${(props) => props.$left && `left: ${props.$left};`}

${(props) => props.$display && `display: ${props.$display};`}
${(props) => props.$flexDirection && `flex-direction: ${props.$flexDirection};`}
${(props) =>
    props.$justifyContent && `justify-content: ${props.$justifyContent};`}
${(props) => props.$alignItems && `align-items: ${props.$alignItems};`}
${(props) => props.$flexWrap && `flex-wrap: ${props.$flexWrap};`} 
${(props) => props.$gap && `gap: ${props.$gap};`}

${(props) => props.$width && `width: ${props.$width};`}
${(props) => props.$height && `height: ${props.$height};`}
${(props) => props.$maxWidth && `max-width: ${props.$maxWidth};`}
${(props) => props.$maxHeight && `max-height: ${props.$maxHeight};`}
${(props) => props.$minWidth && `min-width: ${props.$minWidth};`}
${(props) => props.$minHeight && `min-height: ${props.$minHeight};`}

${(props) => props.$margin && `margin: ${props.$margin};`}
${(props) => props.$marginTop && `margin-top: ${props.$marginTop};`}
${(props) => props.$marginBottom && `margin-bottom: ${props.$marginBottom};`}
${(props) => props.$marginLeft && `margin-left: ${props.$marginLeft};`}
${(props) => props.$marginRight && `margin-right: ${props.$marginRight};`}

${(props) => props.$padding && `padding: ${props.$padding};`}
${(props) => props.$paddingTop && `padding-top: ${props.$paddingTop};`}
${(props) => props.$paddingBottom && `padding-bottom: ${props.$paddingBottom};`}
${(props) => props.$paddingLeft && `padding-left: ${props.$paddingLeft};`}
${(props) => props.$paddingRight && `padding-right: ${props.$paddingRight};`}

${(props) => props.$border && `border: ${props.$border};`}
${(props) => props.$borderTop && `border-top: ${props.$borderTop};`}
${(props) => props.$borderBottom && `border-bottom: ${props.$borderBottom};`}
${(props) => props.$borderLeft && `border-left: ${props.$borderLeft};`}
${(props) => props.$borderRight && `border-right: ${props.$borderRight};`}

${(props) => props.$borderRadius && `border-radius: ${props.$borderRadius};`}
${(props) => props.$boxShadow && `box-shadow: ${props.$boxShadow};`}
${(props) => props.$background && `background: ${props.$background};`}

${(props) => props.$overflow && `overflow: ${props.$overflow};`}
${(props) => props.$transform && `transform: ${props.$transform};`}
${(props) => props.$transition && `transition: ${props.$transition};`}
`;

export default LayoutStyle;
