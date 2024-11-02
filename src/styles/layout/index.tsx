import StripDollar from "../utils/StripDollar";
import LayoutStyle, { ILayoutStyleProps } from "./layout.style";

interface ILayoutProps extends StripDollar<ILayoutStyleProps> {
  children: React.ReactNode;
  as?: string;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const {
    children,
    as,

    position,
    top,
    bottom,
    left,
    right,

    display,
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,

    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,

    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,

    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,

    border,
    borderTop,
    borderBottom,
    borderLeft,
    borderRight,

    borderRadius,
    boxShadow,
    background,

    overflow,
    transform,
    transition,
  } = props;

  return (
    <LayoutStyle
      as={as}
      //
      $position={position}
      $top={top}
      $bottom={bottom}
      $left={left}
      $right={right}
      //
      $display={display}
      $flexDirection={flexDirection}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
      $flexWrap={flexWrap}
      //
      $width={width}
      $height={height}
      $maxWidth={maxWidth}
      $maxHeight={maxHeight}
      $minWidth={minWidth}
      $minHeight={minHeight}
      //
      $margin={margin}
      $marginTop={marginTop}
      $marginBottom={marginBottom}
      $marginLeft={marginLeft}
      $marginRight={marginRight}
      //
      $padding={padding}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
      $paddingLeft={paddingLeft}
      $paddingRight={paddingRight}
      //
      $border={border}
      $borderTop={borderTop}
      $borderBottom={borderBottom}
      $borderLeft={borderLeft}
      $borderRight={borderRight}
      //
      $borderRadius={borderRadius}
      $boxShadow={boxShadow}
      $background={background}
      //
      $overflow={overflow}
      $transform={transform}
      $transition={transition}
    >
      {children}
    </LayoutStyle>
  );
};

export default Layout;
