import { useMemo } from "react";
import { getConstants } from "@md/theme";
import defaultStyle from "@md/theme/styles/default";

const useTheme = () => {
  const constants = useMemo(getConstants, []);
  return useMemo(() => ({ constants, styles: defaultStyle }), []);
};

export default useTheme;
