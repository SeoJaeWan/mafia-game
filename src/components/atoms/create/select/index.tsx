import StripDollar from "@/styles/utils/stripDollar";
import SelectStyle, { SelectStyleProps } from "./select.style";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Layout from "@/styles/layout";

interface ISelectContext<T> {
  rootValue: T;
  onChange: (value: T) => void;
}

const SelectContext = createContext<ISelectContext<any>>({
  rootValue: "",
  onChange: () => {},
});

interface IOptionProps<T> {
  value: T;
  children: React.ReactNode;
}

const Option = <T,>(props: IOptionProps<T>) => {
  const { value, children } = props;
  const { onChange } = useContext(SelectContext);

  const handleClick = () => {
    onChange(value);
  };

  return (
    <SelectStyle.Option type={"button"} onClick={handleClick}>
      {children}
    </SelectStyle.Option>
  );
};

interface ISelectProps<T> extends StripDollar<SelectStyleProps> {
  value: T;
  children: React.ReactNode;
  onChange: (value: T) => void;
}

const Select = <T,>(props: ISelectProps<T>) => {
  const { width, height, value, children, onChange } = props;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeValue = (value: T) => {
    onChange(value);
    handleClose();
  };

  useEffect(() => {
    const handleExternalClick = (e: MouseEvent) => {
      if (buttonRef.current?.contains(e.target as Node)) return;
      handleClose();
    };

    document.addEventListener("click", handleExternalClick);
    return () => {
      document.removeEventListener("click", handleExternalClick);
    };
  }, []);

  return (
    <SelectContext.Provider
      value={{ rootValue: value, onChange: handleChangeValue }}
    >
      <Layout position={"relative"} width={width} ref={buttonRef}>
        <SelectStyle.Button
          type={"button"}
          $width={width}
          $height={height}
          onClick={handleToggle}
        >
          <SelectStyle.Value>{String(value)}</SelectStyle.Value>
          <SelectStyle.Arrow $isShow={open}>
            <FaCaretUp size={16} />
          </SelectStyle.Arrow>
          <SelectStyle.Arrow $isShow={!open}>
            <FaCaretDown size={16} />
          </SelectStyle.Arrow>
        </SelectStyle.Button>

        <SelectStyle.OptionContainer $isShow={open}>
          {children}
        </SelectStyle.OptionContainer>
      </Layout>
    </SelectContext.Provider>
  );
};

Select.Option = Option;

export default Select;
