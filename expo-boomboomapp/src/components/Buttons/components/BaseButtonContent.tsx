import { ReactNode } from "react";
import { Text, TextStyle } from "react-native";

import useEStyles from "../../../hooks/useEStyles";
import { styleSheetCompose } from "../../../utils/styleUtils";
import { BaseButtonTheme } from "../BaseButton";

type BaseButtonContentProps = {
  textStyle?: TextStyle;
  content: ReactNode;
  color: string;
  theme: BaseButtonTheme;
};

export const BaseButtonContent = ({
  textStyle,
  content,
  color,
  theme,
}: Readonly<BaseButtonContentProps>): JSX.Element => {
  const styles = useEStyles({
    title: {
      fontSize: "$buttonFontSize",
    },
    titleContained: {
      color: "$backgroundColor",
    },
    titleOutlined: {
      color,
    },
    titleInline: {
      color,
    },
  });
  const textStyles = styleSheetCompose(
    styles.title,
    styles[`title${theme}`],
    textStyle,
  );

  const isContentStringOrNumber =
    typeof content === "string" || typeof content === "number";

  return isContentStringOrNumber ? (
    <Text style={textStyles}>{content}</Text>
  ) : (
    <>{content}</>
  );
};
